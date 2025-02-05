# Imagen base
FROM node:20-alpine AS base

# Definir directorio de trabajo
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Crear directorios y asignar permisos
RUN mkdir -p $APP_HOME/dist && chown -R node:node $APP_HOME

# Copiar archivos de dependencias
COPY package*.json ./

# Cambiar al usuario `node`
USER node

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY --chown=node:node . .

# -----------------------------
# Etapa de construcción
# -----------------------------
FROM base AS build

# Establecer entorno de producción
ENV NODE_ENV=production

# Ejecutar el build de la aplicación
RUN npm run build

# -----------------------------
# Etapa de producción
# -----------------------------
FROM node:20-alpine AS production

# Definir directorio de trabajo
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Copiar archivos necesarios desde la etapa de build
COPY --from=build $APP_HOME/dist ./dist
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Exponer el puerto 3000
EXPOSE 3000

# Definir entorno de producción
ENV NODE_ENV=production

# Comando para iniciar en producción
CMD ["node", "dist/main.js"]