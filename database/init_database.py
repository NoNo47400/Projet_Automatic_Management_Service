import subprocess

# Commande MySQL
command = [
    "mysql",
    "-u", "root",  # Nom d'utilisateur MySQL
    "-proot",  # Attention : inclure le mot de passe en ligne de commande est risqué
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