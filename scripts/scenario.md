# Scénario de gestion des accès, lumières et alarmes

## Pendant les heures de travail (entre `start time` et `end time`)

1. **Ouverture** des fenêtres et **ouverture** des portes.
2. **Allumage** des lumières **uniquement** si au moins un capteur de présence est actif.
3. **Désactivation** des alarmes.

## Hors heures de travail (entre `end time` et `start time`)

1. **Fermeture** des fenêtres et **fermeture** des portes.
2. **Extinction** des lumières.
3. **Alarmes désactivées** tant qu’aucun capteur de présence ne passe à actif.

## Capteur de présence

- Un capteur de présence passe à l’état **actif** si au moins un utilisateur se trouve dans la même pièce.
