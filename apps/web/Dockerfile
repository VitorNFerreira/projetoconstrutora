FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
COPY packages/types/package.json ./packages/types/package.json
RUN npm install
COPY . .
RUN npm run build -w @gestao-obras/web
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "@gestao-obras/web"]
