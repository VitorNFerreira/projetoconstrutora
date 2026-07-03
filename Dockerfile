FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/types/package.json ./packages/types/package.json

RUN npm install

COPY . .

RUN npm run db:generate && npm run build -w @gestao-obras/api

EXPOSE 3001

CMD ["sh", "-c", "npm run prisma:generate -w @gestao-obras/api && npm run start -w @gestao-obras/api"]
