#!/bin/bash
set -e  # Interrompe l'esecuzione se un comando fallisce

MYSQL_ROOT_PASSWORD="root"
MYSQL_DATABASE="moneyFlow"

echo "Avvio inizializzazione MySQL personalizzata..."

echo "Eseguo db.sql..."
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" < /docker-entrypoint-initdb.d/01_db.sql

echo "db.sql eseguito con successo!"

echo "Eseguo config.sql..."
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" < /docker-entrypoint-initdb.d/02_config.sql

echo "Eseguo import.sql..."
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" < /docker-entrypoint-initdb.d/03_import.sql


echo "config.sql eseguito con successo!"
