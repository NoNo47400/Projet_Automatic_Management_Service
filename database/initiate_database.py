import subprocess

# Commande MySQL
command = [
    "mysql",
    "-h", "srv-bdens.insa-toulouse.fr",  # Adresse du serveur MySQL
    "--port=3306",  # Port du serveur MySQL
    "-u", "projet_gei_037",  # Nom d'utilisateur MySQL
    "-pOo3Loh1g",  # Attention : inclure le mot de passe en ligne de commande est risqué
    "projet_gei_037",  # Nom de la base de données
    "<", "init.sql"  # Fichier SQL à exécuter
]

try:
    # Exécuter la commande
    result = subprocess.run(
        " ".join(command),
        shell=True,  # Nécessaire pour utiliser "<" avec subprocess
        check=True,  # Lève une exception si la commande échoue
        text=True  # Interprète la sortie comme du texte
    )
    print("Commande exécutée avec succès.")
except subprocess.CalledProcessError as e:
    print(f"Erreur lors de l'exécution de la commande : {e}")