FROM node:18-alpine

WORKDIR /app

COPY ../../package*.json ./
RUN npm install

COPY ../../ ./
RUN npm run build --workspace=apps/audit-log

# Stage 2: Run

# 拷贝编译产物和依赖
COPY --from=builder /app/dist/apps/audit-log ./dist
COPY --from=builder /app/node_modules ./node_modules

# 启动
CMD ["node", "dist/main.js"]