# Gestão de Obras

MVP web para gestão financeira de obras, compras e suprimentos.

## Stack
- Frontend: Next.js 14 + TypeScript + OpenNext/Cloudflare
- Backend: NestJS + Prisma + Cloudflare Containers
- Banco: Supabase Postgres (produção) / PostgreSQL local (dev)
- Infra local: Docker Compose

## Módulos nesta entrega
- Autenticação
- Clientes
- Fornecedores
- Orçamentos
- Obras
- Solicitações de compra
- Cotações de fornecedores
- Pedidos de compra

## Como rodar localmente
1. Copie `.env.example` para `.env` na raiz.
2. Suba o banco: `docker compose up -d`
3. Instale dependências: `npm install`
4. Gere o client do Prisma: `npm run db:generate`
5. Rode migrations: `npm run db:migrate`
6. Rode seed: `npm run db:seed`
7. Suba a aplicação: `npm run dev`

## Deploy sugerido
- Frontend: Cloudflare Workers
- API: Cloudflare Containers
- Banco: Supabase Postgres
- Automação: GitHub Actions

Veja `DEPLOY.md` para o fluxo completo de CI/CD.

## Usuário inicial
- Email: `admin@gestaoobras.com`
- Senha: `admin123`
