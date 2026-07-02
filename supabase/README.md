# Supabase no projeto

Este repositório usa **Supabase Postgres como banco hospedado** e **Prisma como camada de schema/migrations**.

## Padrão adotado
- `DATABASE_URL`: conexão usada pela aplicação (pooler/session mode)
- `DIRECT_URL`: conexão direta usada pelo Prisma para migrations

## Por que este modelo
Evita manter duas fontes de verdade para schema. O schema continua em `apps/api/prisma/schema.prisma` e as migrations são aplicadas no Supabase pelo pipeline.

## Segredos necessários no GitHub
### Produção
- `PRODUCTION_DATABASE_URL`
- `PRODUCTION_DIRECT_URL`

### Homologação
- `STAGING_DATABASE_URL`
- `STAGING_DIRECT_URL`
