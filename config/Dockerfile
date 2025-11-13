# Usa l'immagine ufficiale di MySQL come base
FROM mysql:8.0

# Imposta le variabili d'ambiente necessarie per MySQL
ENV MYSQL_ROOT_PASSWORD=""
ENV MYSQL_DATABASE="moneyFlow"
ENV MYSQL_USER="web"
ENV MYSQL_PASSWORD="web"

# Copia gli script SQL di inizializzazione
COPY .env /docker-entrypoint-initdb.d/
COPY *.sql /docker-entrypoint-initdb.d/
COPY *.sh /docker-entrypoint-initdb.d/

# Imposta i permessi di esecuzione sullo script di inizializzazione personalizzato
RUN chmod +x /docker-entrypoint-initdb.d/*.sh

# Espone la porta standard di MySQL
EXPOSE 3306
