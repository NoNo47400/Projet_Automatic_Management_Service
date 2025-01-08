import mariadb
import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def reset_database():
    try:
        # Connexion à MariaDB local
        connection = mariadb.connect(
            host="localhost",
            user="root",
            password="root",
            database="archi_service",
            port=3306
        )
        
        cursor = connection.cursor()
        
        # Lecture du fichier SQL
        script_dir = os.path.dirname(os.path.abspath(__file__))
        sql_file_path = os.path.join(script_dir, '..', 'database', 'init.sql')
        
        with open(sql_file_path, 'r') as file:
            sql_script = file.read()
        
        # Exécution des commandes SQL
        for statement in sql_script.split(';'):
            if statement.strip():
                cursor.execute(statement + ';')
                
        connection.commit()
        return {"status": "success", "message": "Database reset successfully"}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
    finally:
        if 'connection' in locals():
            cursor.close()
            connection.close()

@app.route('/reset', methods=['POST'])
def reset():
    result = reset_database()
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)