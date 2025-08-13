#!/bin/sh
set -e

echo "⏳ Esperando a Postgres..."
until pg_isready -h db -U postgres; do
  sleep 1
done
echo "✅ Postgres listo"

echo "📦 Ejecutando migraciones..."
npx prisma migrate deploy

echo "🚀 Iniciando backend..."
exec npm run start:dev
