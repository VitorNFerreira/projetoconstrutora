# Deploy automático com Cloudflare + Supabase

## Arquitetura adotada

- **Frontend web**: Cloudflare Workers com OpenNext (`apps/web`)
- **API NestJS**: Cloudflare Containers (`apps/api`)
- **Banco de dados**: Supabase Postgres
- **Automação**: GitHub Actions

## Fluxo automático

### Homologação
- push em `develop`
- GitHub Actions roda build
- aplica migrations no Supabase de staging
- sincroniza secrets da API no Cloudflare
- publica API no Cloudflare Containers
- publica frontend no Cloudflare Workers

### Produção
- push em `main`
- GitHub Actions roda build
- aplica migrations no Supabase de produção
- sincroniza secrets da API no Cloudflare
- publica API no Cloudflare Containers
- publica frontend no Cloudflare Workers

## Arquivos adicionados

- `apps/web/open-next.config.ts`
- `apps/web/wrangler.jsonc`
- `apps/api/cloudflare/worker.ts`
- `apps/api/wrangler.jsonc`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`
- `GITHUB_SECRETS.md`
- `supabase/README.md`

## Pré-requisitos nas plataformas

### Cloudflare
1. Criar ou usar uma conta com Workers habilitado.
2. Para a API em Containers, usar plano compatível com **Cloudflare Containers**.
3. Criar um API Token com permissões para Workers/Deploy.
4. Obter o `CLOUDFLARE_ACCOUNT_ID`.

### Supabase
1. Criar projeto de **staging**.
2. Criar projeto de **produção**.
3. Criar usuário dedicado do Prisma, se desejar separar acessos.
4. Obter duas URLs por ambiente:
   - **pooled/session** para `DATABASE_URL`
   - **direct** para `DIRECT_URL`

## Secrets no GitHub

Cadastre os secrets descritos em `GITHUB_SECRETS.md`.

### Cloudflare
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Staging
- `STAGING_DATABASE_URL`
- `STAGING_DIRECT_URL`
- `STAGING_JWT_SECRET`
- `STAGING_APP_URL`
- `STAGING_API_URL`

### Produção
- `PRODUCTION_DATABASE_URL`
- `PRODUCTION_DIRECT_URL`
- `PRODUCTION_JWT_SECRET`
- `PRODUCTION_APP_URL`
- `PRODUCTION_API_URL`

## Branches recomendadas

- `feature/*` → desenvolvimento local
- `develop` → homologação automática
- `main` → produção automática

## Banco de dados

Este projeto permanece **Prisma-first**.

Ou seja:
- o schema oficial continua em `apps/api/prisma/schema.prisma`
- o pipeline usa `prisma migrate deploy`
- o Supabase atua como banco hospedado

Isso evita manter Prisma de um lado e SQL manual de outro como duas fontes de verdade.

## Primeira configuração sugerida

1. Subir o código para GitHub.
2. Criar os secrets do repositório.
3. Conectar Cloudflare ao projeto.
4. Criar os bancos no Supabase.
5. Rodar um deploy inicial manual em `develop`.
6. Validar staging.
7. Promover para `main`.

## Observações importantes

- O workflow sincroniza secrets da API com `wrangler secret put` antes do deploy.
- O frontend recebe `NEXT_PUBLIC_API_URL` no momento do build/deploy.
- Para produção, prefira mudanças compatíveis com rollout gradual no banco.
- Não incluí seed automático em produção para evitar carga indevida em ambiente real.

## Comandos úteis

### Local
- `npm install`
- `npm run db:generate`
- `npm run build`

### Deploy web manual
- `npm run deploy:web`

### Deploy API manual
- `npm run deploy:api`

### Migration manual
- `npm run db:migrate:deploy`
