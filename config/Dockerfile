# Usa l'immagine ufficiale di MySQL come base
FROM mysql:8.0

# Copia gli script SQL di inizializzazione
COPY *.sql /docker-entrypoint-initdb.d/
COPY *.sh /docker-entrypoint-initdb.d/

# Imposta i permessi di esecuzione sullo script di inizializzazione personalizzato
RUN chmod +x /docker-entrypoint-initdb.d/*.sh

# Espone la porta standard di MySQL
EXPOSE 3306
