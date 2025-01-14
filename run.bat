@echo off
rem --------------------------------------------------------------------------
rem Script Batch pour lancer tous les services Spring Boot et ouvrir le frontend
rem --------------------------------------------------------------------------

set SERVICES_DIR=.

# CE SCRIPT EST À EXÉCUTER DANS UN ENVIRONNEMENT WINDOWS
# ET NECESSITE D'AVOIR SUIVI LES INSTRUCTIONS D'INSTALLATION DU README AU PREALABLE

echo Reset de la database et démarrage du service python
start cmd /k "venv\Scripts\activate && python scripts/reset_db.py"

echo Démarrage du service Rooms (8081)
start cmd /k "cd %SERVICES_DIR%\Rooms && mvn spring-boot:run"

echo Démarrage du service Doors (8082)
start cmd /k "cd %SERVICES_DIR%\Doors && mvn spring-boot:run"

echo Démarrage du service Alarms (8083)
start cmd /k "cd %SERVICES_DIR%\Alarms && mvn spring-boot:run"

echo Démarrage du service Lights (8084)
start cmd /k "cd %SERVICES_DIR%\Lights && mvn spring-boot:run"

echo Démarrage du service PresenceSensors (8085)
start cmd /k "cd %SERVICES_DIR%\PresenceSensors && mvn spring-boot:run"

echo Démarrage du service Windows (8086)
start cmd /k "cd %SERVICES_DIR%\Windows && mvn spring-boot:run"

echo Démarrage du service WorkingHours (8087)
start cmd /k "cd %SERVICES_DIR%\WorkingHours && mvn spring-boot:run"

echo Démarrage du service Users (8088)
start cmd /k "cd %SERVICES_DIR%\Users && mvn spring-boot:run"

rem Attendre quelques secondes que tout monte (optionnel)
echo Attente de 5 secondes...
timeout /t 5 > nul

echo Ouverture du frontend...
start frontend\index.html

echo Tous les services sont en cours d’exécution.