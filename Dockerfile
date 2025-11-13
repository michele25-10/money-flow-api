# =======================
# STAGE 1: build environment
# =======================
FROM node:20-alpine AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia solo i file necessari per installare le dipendenze
COPY package*.json ./

# Installa le dipendenze in modo pulito e riproducibile
RUN npm ci --only=production

# Copia il resto del progetto
COPY . .

# =======================
# STAGE 2: runtime environment
# =======================
FROM node:20-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia solo ciò che serve dal primo stage
COPY --from=build /app /app

# Espone la porta (modifica se serve)
EXPOSE 5000

# Avvia l’app
CMD ["npm", "start"]
