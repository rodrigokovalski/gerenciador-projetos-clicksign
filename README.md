# Gerenciador de projetos (Clicksign)

Monorepo: Nuxt 4 em `apps/web`, Rails 8 em `apps/api`, pacotes em `packages/*`. O front fala com a API em `http://localhost:3001` por padrão.

## Dependências

1. Node.js ≥ 18
2. PostgreSQL ≥ 9.5
3. Ruby 3.4.9
5. pnpm 9.0.0

## Instalação

```bash
git clone <url-do-repositório>
cd gerenciador-projetos-clicksign
pnpm install
cd apps/api && bundle install && bin/rails db:prepare
```

## Rodar o projeto

Na **raiz** do repositório:

```bash
pnpm dev
```

O Turbo sobe **os três** ao mesmo tempo: <br /><br /> Nuxt (**http://localhost:3000**) <br /> API Rails / Puma (**http://localhost:3001**) <br /> Storybook do design system (**http://localhost:6006**).