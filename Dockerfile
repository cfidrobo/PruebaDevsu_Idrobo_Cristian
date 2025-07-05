# ─── BASE DE PRODUCCIÓN ───────────────────────────────────────
FROM node:18-alpine

# Crear usuario sin privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

# Sólo deps de prod
COPY package*.json ./
RUN npm ci --only=production

# Copiar código
COPY . .

# Cambiar a usuario sin privilegios
USER appuser

# Puerto por defecto (puedes sobreescribir)
ENV NODE_ENV=production
ENV PORT=8000
EXPOSE ${PORT}

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT}/api/users || exit 1

CMD ["node", "index.js"]
