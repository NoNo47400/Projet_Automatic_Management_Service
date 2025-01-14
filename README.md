# Automatic Management Service

## Structure du projet
```
frontend/           # Interface utilisateur
scripts/            # Scripts utilitaires
├── reset_db.py     # Service de réinitialisation DB
database/           # Scripts SQL
├── init.sql        # Initialisation de la base de données
services/           # Services Spring Boot
├── Rooms/          # Gestion des salles (port 8081)
├── Doors/          # Gestion des portes (port 8082)
├── Alarms/         # Gestion des alarmes (port 8083)
├── Lights/         # Gestion des lumières (port 8084)
├── Sensors/        # Gestion des capteurs de présence (port 8085)
├── Windows/        # Gestion des fenêtres (port 8086)
├── WorkingHours/   # Gestion du temps de travail (port 8087)
└── Users/          # Gestion des utilisateurs dans les différentes pièces (port 8088)
```

## Prérequis
- Java 17+
- Maven
- Python 3.8+
- MySQL

## Démarrage des services

### 1. Service Python (Reset DB)
```bash
# Créer l'environnemment virtuel
python -m venv venv

# Activer l'environnement virtuel si ce n'est pas déjà fait
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Installez les dépendances nécessaires pour démarrer le fichier python
pip install mariadb flask flask-cors requests

# Lancer le service
python scripts/reset_db.py
```
Le service tourne sur le port 5000.

Une fois le Service Python fonctionnel, vous pouvez passez à l'étape 2 (Services Spring Boot), ou si vous êtes sous Windows, vous pouvez tout simplement fermer le Service Python, et d'executer le fichier **run.bat**, qui se chargera de lancer correctement tous les services.

### 2. Services Spring Boot
Chaque service doit être démarré séparément dans un terminal différent :

```bash
# Service Rooms (port 8081)
cd Rooms
mvn spring-boot:run   

# Service Doors (port 8082)
cd Doors
mvn spring-boot:run   

# Service Alarms (port 8083)
cd Alarms
mvn spring-boot:run   

# Service Lights (port 8084)
cd Lights
mvn spring-boot:run    

# Service PresenceSensors (port 8085)    
cd PresenceSensors   
mvn spring-boot:run     

# Service Windows (port 8086)
cd Windows
mvn spring-boot:run   

# Service WorkingHours (port 8087)
cd WorkingHours
mvn spring-boot:run   

# Service Users (port 8088)
cd Users
mvn spring-boot:run   
```

### 3. Frontend
Pour lancer l'interface utilisateur, **double-cliquez simplement sur le fichier** :
```
frontend/index.html
```

Ou ouvrez-le avec votre navigateur préféré.

## Ports utilisés
- Frontend : Ouvrir index.html directement (pas de serveur nécessaire)
- Service Reset DB : 5000
- Service Rooms : 8081
- Service Doors : 8082
- Service Alarms : 8083
- Service Lights : 8084
- Service PresenceSensors : 8085   
- Service Windows : 8086
- Service WorkingHours : 8087   
- Service Users : 8088

## Utilisation
1. Assurez-vous que tous les services sont en cours d'exécution
2. Double-cliquez sur `frontend/index.html` pour ouvrir l'interface
3. Commencez par ajouter des salles en cliquant sur les cellules vides
4. Ajoutez des éléments (lumières, alarmes, fenêtres, portes) via le menu latéral
5. Cliquez dans la salle pour placer les éléments
6. Utilisez les boutons qui apparaissent au survol pour changer l'état des éléments

## Base de données
La base de données est hébergée sur `srv-bdens.insa-toulouse.fr`.
Les identifiants sont déjà configurés dans les fichiers de configuration.

## Arrêt des services
- Pour les services Spring Boot : Ctrl+C dans chaque terminal
- Pour le service Python : Ctrl+C