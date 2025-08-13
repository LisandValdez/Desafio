FROM node:20-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache openssl postgresql-client

# Copiar archivos package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copiar el resto del código de la aplicación
COPY . .

# Dar permisos de ejecución al binario de Prisma
RUN chmod +x node_modules/.bin/prisma

# Generar los archivos de Prisma (si es necesario)
RUN npx prisma generate || true

# Copiar y dar permisos de ejecución al script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]

