```sh
# Formato Personalizado (-F c) El archivo es un archivo binario
PGPASSWORD=admin pg_dump -h localhost -p 5432 -U postgres -d postgres -F c -b -v -f postgres_backup_Fc.sql
PGPASSWORD=admin pg_restore -h localhost -p 5432 -U postgres -d postgres -v postgres_backup_Fc.sql
PGPASSWORD=admin pg_restore -h localhost -p 5432 -U postgres -d postgres --create -v postgres_backup_Fc.sql
PGPASSWORD=admin pg_restore --clean --if-exists -h localhost -U postgres -d postgres postgres_backup_Fc.sql


# Formato SQL Plano (-F p) No tiene compresión
PGPASSWORD=admin pg_dump -h localhost -p 5432 -U postgres -d postgres -F p -b -v -f postgres_backup_Fp.sql
PGPASSWORD=admin psql -h localhost -p 5432 -U postgres -d postgres -f postgres_backup_Fp.sql



# ========== MySQL ==========
# 1. Respaldo de Base de Datos MySQL
mysqldump -u root -p --host=localhost --port=3306 --databases my_db > mysql_backup.sql


# 1.2. Backup de todas las bases de datos
mysqldump -u root -p --host=localhost --port=3306 --all-databases > all_databases_backup.sql

# 1.3. Backup con compresión
mysqldump -u root -p --host=localhost --port=3306 --databases nombre_de_la_base_de_datos | gzip > backup.sql.gz

# 2. Restauración de Base de Datos MySQL
mysql -u root -p --host=localhost --port=3306 nombre_de_la_base_de_datos < backup.sql

# 2.2. Restaurar desde un archivo comprimido (.sql.gz)
gunzip < backup.sql.gz | mysql -u root -p --host=localhost --port=3306 nombre_de_la_base_de_datos
zcat backup.sql.gz | mysql -u root -p --host=localhost --port=3306 nombre_de_la_base_de_datos

# 2.3. Restaurar todas las bases de datos
mysql -u root -p --host=localhost --port=3306 < all_databases_backup.sql
