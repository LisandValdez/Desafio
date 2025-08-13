#!/bin/sh
set -e

echo "⏳ Esperando a Postgres..."
until pg_isready -h db -U postgres; do
  sleep 1
done
echo "✅ Postgres listo"

echo "📦 Ejecutando migraciones..."

# Intentar ejecutar las migraciones de Prisma y continuar incluso si hay errores
npx prisma migrate deploy || echo "⚠️ No hay migraciones pendientes o ocurrió un error durante las migraciones."

echo "🚀 Iniciando backend..."
exec npm run start:dev
