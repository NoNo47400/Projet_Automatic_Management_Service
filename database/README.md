# Instructions pour la base de données

## Installation de MariaDB

### Windows
1. Télécharger MariaDB : https://dlm.mariadb.com/3964460/MariaDB/mariadb-11.4.4/winx64-packages/mariadb-11.4.4-winx64.msi 
2. Durant l'installation :
   - Mot de passe root : `root`
   - Service name : `MariaDB`
   - Port : `3306`

### Linux 
```bash
# Installer MariaDB
sudo apt update
sudo apt install mariadb-server

# Configurer MariaDB (suivre les instructions à l'écran)
sudo mysql_secure_installation
# - Définir le mot de passe root comme 'root'
# - Répondre 'Y' à toutes les questions

# Démarrer le service
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

## Commandes utiles

### Se connecter à MariaDB
```bash
mysql -u root -proot
```

### Créer la base de données
```sql
CREATE DATABASE IF NOT EXISTS archi_service;
```

### Sélectionner la base de données
```sql
USE archi_service;
```

### Afficher les tables
```sql
SHOW TABLES;
```

### Afficher le contenu d'une table
```sql
SELECT * FROM nom_table;
```

### Supprimer la base de données
```sql
DROP DATABASE IF EXISTS archi_service;
```

## Vérification du service

### Windows
```powershell
sc query MariaDB
```

### Linux
```bash
systemctl status mariadb
```

## Ports
Le service MariaDB utilise le port 3306 par défaut. Assurez-vous que ce port est disponible.