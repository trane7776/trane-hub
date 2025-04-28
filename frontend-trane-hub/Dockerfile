# Frontend Dockerfile (Next.js)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG SERVER_URL
ARG APP_URL
ENV SERVER_URL=$SERVER_URL
ENV APP_URL=$APP_URL
RUN npm run build

FROM node:20 as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
