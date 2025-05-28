# Stage 1: Build
FROM node:20

WORKDIR /app

COPY ../../package*.json ./
RUN npm install

COPY ../../ .
RUN npm run build --workspace=apps/api-gateway

# Stage 2: Run

COPY --from=builder /app/dist/apps/api-gateway ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]
