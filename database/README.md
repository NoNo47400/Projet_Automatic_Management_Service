# Instructions pour la base de données

## Accéder à la base de données
```sh
mysql -h srv-bdens.insa-toulouse.fr -P 3306 -u projet_gei_037 -pOo3Loh1g
```

## Utiliser la base de données créée
```sql
USE projet_gei_037;
```

## Afficher les tables créées
```sql
SHOW TABLES;
```

## Afficher le contenu de chaque table
```sql
SELECT * FROM <nom_table>;
```