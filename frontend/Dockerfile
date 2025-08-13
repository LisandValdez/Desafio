# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción (servidor ligero)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para servir la app
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]()