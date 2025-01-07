import requests
import time
from datetime import datetime, timedelta

# -----------------------------------------------------------------------------
# URLs de chaque microservice
# -----------------------------------------------------------------------------

ROOMS_API_URL    = 'http://localhost:8081/rooms'
DOORS_API_URL    = 'http://localhost:8082/doors'
ALARMS_API_URL   = 'http://localhost:8083/alarms'
LIGHTS_API_URL   = 'http://localhost:8084/lights'
SENSORS_API_URL  = 'http://localhost:8085/sensors'
WINDOWS_API_URL  = 'http://localhost:8086/windows'
WORKING_API_URL  = 'http://localhost:8087/working_hours'
USERS_API_URL    = 'http://localhost:8088/users'

# ID de la plage horaire de travail à gérer (il y en a qu'une seule)
WORKING_HOUR_ID  = 1  # ID arbitraire : on suppose qu'on veut gérer l'ID=1

# (Optionnel) Pour reset si nécessaire
RESET_API_URL    = 'http://localhost:5000/reset'

# -----------------------------------------------------------------------------
# Paramètres de la simulation
# -----------------------------------------------------------------------------

TIME_STEP_MINUTES = 15    # Incrémente le temps par pas de X minutes
SLEEP_SECONDS     = 5     # Pause entre deux itérations (pour la démo)

# -----------------------------------------------------------------------------
# Fonctions utilitaires pour le temps
# -----------------------------------------------------------------------------

def parse_time(t_str):
    """
    Convertit une chaîne 'HH:MM:SS' en objet datetime.time.
    """
    h, m, s = t_str.split(':')
    return datetime(2000, 1, 1, int(h), int(m), int(s)).time()

def time_to_string(t):
    """
    Convertit un objet datetime.time en chaîne 'HH:MM:SS'.
    """
    return t.strftime('%H:%M:%S')

def increment_time(current_time_obj, minutes=15):
    """
    Incrémente l'heure (objet datetime.time) de 'minutes' minutes
    et renvoie un nouvel objet datetime.time.
    """
    dummy_date = datetime(2000, 1, 1, current_time_obj.hour, current_time_obj.minute, current_time_obj.second)
    new_date = dummy_date + timedelta(minutes=minutes)
    return new_date.time()

def is_within_working_hours(current_t, start_t, end_t):
    """
    Détermine si current_t est dans l'intervalle [start_t, end_t].
    Gère le cas "overnight" (ex: start=20:00, end=06:00).
    """
    current_s = current_t.hour*3600 + current_t.minute*60 + current_t.second
    start_s   = start_t.hour*3600   + start_t.minute*60   + start_t.second
    end_s     = end_t.hour*3600     + end_t.minute*60     + end_t.second

    if start_s < end_s:
        # Intervalle "normal" (ex: 08:00 -> 18:00)
        return start_s <= current_s < end_s
    else:
        # Intervalle "overnight" (ex: 20:00 -> 06:00 du lendemain)
        # => On est dans la plage si current >= start OU current < end
        return (current_s >= start_s) or (current_s < end_s)

# -----------------------------------------------------------------------------
# Fonctions d'accès aux services
# -----------------------------------------------------------------------------

def get_rooms():
    r = requests.get(ROOMS_API_URL)
    r.raise_for_status()
    return r.json()

def get_doors():
    r = requests.get(DOORS_API_URL)
    r.raise_for_status()
    return r.json()

def put_door_closed(door_id, closed_value):
    url = f"{DOORS_API_URL}/{door_id}"
    body = {
        "id": door_id,
        "closed": closed_value
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

def get_alarms():
    r = requests.get(ALARMS_API_URL)
    r.raise_for_status()
    return r.json()

def put_alarm_active(alarm_id, active_value):
    url = f"{ALARMS_API_URL}/{alarm_id}"
    body = {
        "id": alarm_id,
        "active": active_value
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

def get_lights():
    r = requests.get(LIGHTS_API_URL)
    r.raise_for_status()
    return r.json()

def put_light_active(light_id, active_value):
    url = f"{LIGHTS_API_URL}/{light_id}"
    body = {
        "id": light_id,
        "active": active_value
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

def get_sensors():
    r = requests.get(SENSORS_API_URL)
    r.raise_for_status()
    return r.json()

def put_sensor_active(sensor_id, active_value):
    url = f"{SENSORS_API_URL}/{sensor_id}"
    body = {
        "id": sensor_id,
        "active": active_value
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

def get_windows():
    r = requests.get(WINDOWS_API_URL)
    r.raise_for_status()
    return r.json()

def put_window_closed(window_id, closed_value):
    url = f"{WINDOWS_API_URL}/{window_id}"
    body = {
        "id": window_id,
        "closed": closed_value
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

def get_users():
    r = requests.get(USERS_API_URL)
    r.raise_for_status()
    return r.json()

# (Si vous avez un service pour WorkingHours)
def get_working_hour(wh_id):
    """
    Récupère les infos d'une plage horaire (start_time, end_time, current_time_value).
    """
    url = f"{WORKING_API_URL}/{wh_id}"
    r = requests.get(url)
    r.raise_for_status()
    return r.json()

def put_working_hour_time(wh_id, field, new_time_str):
    """
    Met à jour un champ temporel (start_time, end_time ou current_time) d'un WorkingHour.
    """
    url = f"{WORKING_API_URL}/{wh_id}/{field}"
    body = {
        "id": wh_id,
        field: new_time_str
    }
    r = requests.put(url, json=body)
    r.raise_for_status()
    return r.json()

# -----------------------------------------------------------------------------
# Logique du scénario
# -----------------------------------------------------------------------------

def update_presence_sensors():
    """
    Met à jour l'état 'active' des capteurs de présence en fonction de la présence d'utilisateurs.
    Hypothèse : un capteur est 'active' si au moins un utilisateur est dans la même room.
    """
    users_list = get_users()      # [ { "id":..., "roomId":..., ...}, ...]
    sensors_list = get_sensors()  # [ { "id":..., "roomId":..., "active":...}, ...]

    # Regrouper les utilisateurs par room
    users_by_room = {}
    for user in users_list:
        rid = user["roomId"]
        if rid not in users_by_room:
            users_by_room[rid] = []
        users_by_room[rid].append(user)

    # Pour chaque capteur, on check s'il y a au moins 1 user dans sa room
    for sensor in sensors_list:
        rid = sensor["roomId"]
        has_user = (rid in users_by_room and len(users_by_room[rid]) > 0)
        current_active = sensor["active"]

        if has_user != current_active:
            print(f"[INFO] Update sensor {sensor['id']} => active={has_user}")
            put_sensor_active(sensor["id"], has_user)

def apply_scenario_logic():
    """
    Applique la logique du scénario décrite :
      - Si pendant les heures de travail :
          * Portes & fenêtres ouvertes
          * Lumières allumées si présence
          * Alarmes désactivées
      - Si hors heures de travail :
          * Portes & fenêtres fermées
          * Lumières éteintes
          * Alarmes désactivées sauf si présence => alarmes actives
    """
    # Récupérer la plage horaire
    wh = get_working_hour(WORKING_HOUR_ID)
    start_t = parse_time(wh["startTime"])
    end_t   = parse_time(wh["endTime"])
    curr_t  = parse_time(wh["currentTime"])
    in_working_hours = is_within_working_hours(curr_t, start_t, end_t)

    # Récupérer l'état de présence par salle
    sensors_list = get_sensors()
    presence_in_room = {}
    for s in sensors_list:
        rid = s["roomId"]
        if rid not in presence_in_room:
            presence_in_room[rid] = False
        if s["active"] == True:
            presence_in_room[rid] = True

    # 1) Gérer portes / fenêtres
    desired_closed_value = not in_working_hours  # True si hors travail, False si en travail

    # --- Portes ---
    doors_list = get_doors()
    for door in doors_list:
        if door["closed"] != desired_closed_value:
            print(f"[INFO] Update door {door['id']} => closed={desired_closed_value}")
            put_door_closed(door["id"], desired_closed_value)

    # --- Fenêtres ---
    windows_list = get_windows()
    for w in windows_list:
        if w["closed"] != desired_closed_value:
            print(f"[INFO] Update window {w['id']} => closed={desired_closed_value}")
            put_window_closed(w["id"], desired_closed_value)

    # 2) Gérer lumières
    #    En heures de travail => ON si presence_in_room=True, sinon OFF
    #    Hors heures de travail => OFF
    lights_list = get_lights()
    for light in lights_list:
        rid = light["roomId"]
        if in_working_hours:
            desired_light_value = presence_in_room.get(rid, False)
        else:
            desired_light_value = False
        if light["active"] != desired_light_value:
            print(f"[INFO] Update light {light['id']} => active={desired_light_value}")
            put_light_active(light["id"], desired_light_value)

    # 3) Gérer alarmes
    #    En heures de travail => off
    #    Hors heures de travail => on seulement s'il y a présence
    alarms_list = get_alarms()
    for alarm in alarms_list:
        rid = alarm["roomId"]
        if in_working_hours:
            desired_alarm_value = False
        else:
            # hors travail => active si présence
            desired_alarm_value = presence_in_room.get(rid, False)

        if alarm["active"] != desired_alarm_value:
            print(f"[INFO] Update alarm {alarm['id']} => active={desired_alarm_value}")
            put_alarm_active(alarm["id"], desired_alarm_value)

def increment_current_time():
    """
    Incrémente le current_time du working hour pour simuler le temps qui passe.
    """
    wh = get_working_hour(WORKING_HOUR_ID)
    curr_t_obj = parse_time(wh["currentTime"])
    new_t_obj  = increment_time(curr_t_obj, TIME_STEP_MINUTES)
    new_t_str  = time_to_string(new_t_obj)

    print(f"[INFO] CurrentTime increment => {wh['currentTime']} -> {new_t_str}")
    put_working_hour_time(WORKING_HOUR_ID, "current_time", new_t_str)

# -----------------------------------------------------------------------------
# Boucle principale de simulation
# -----------------------------------------------------------------------------

def main():
    print("=== DÉBUT DE LA SIMULATION DU SCÉNARIO ===")

    # (Optionnel) Reset ?
    # requests.post(RESET_API_URL)

    while True:
        try:
            # 1) Mettre à jour la présence (capteurs) en fonction des users
            update_presence_sensors()

            # 2) Appliquer la logique de scénario (portes, fenêtres, lumières, alarmes)
            apply_scenario_logic()

            # 3) Incrémenter le current_time (simule l'écoulement du temps)
            increment_current_time()

            # 4) Attendre quelques secondes avant la prochaine itération
            time.sleep(SLEEP_SECONDS)

        except Exception as e:
            print(f"[ERREUR] {e}")
            break

if __name__ == "__main__":
    main()
