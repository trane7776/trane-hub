# Backend Dockerfile (NestJS)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20 as runner
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 4200
CMD ["node", "dist/main.js"]
