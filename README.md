# Ecommerce 🛒

[![CI](https://github.com/naiarar/Ecommerce/actions/workflows/ci.yml/badge.svg)](https://github.com/naiarar/Ecommerce/actions/workflows/ci.yml)

Loja virtual de periféricos e hardware feita em **Angular**, com catálogo, busca, carrinho persistente e formulário de contato.

**🔗 Demo:** <https://naiarar.github.io/Ecommerce/>

## Funcionalidades

- Catálogo de produtos com página de detalhes
- Busca por descrição (ignora maiúsculas e acentos), refletida na URL (`/produtos?descricao=mouse`)
- Carrinho de compras persistido no `localStorage` (sobrevive ao recarregar a página)
- Controle de quantidade por item, respeitando o estoque disponível; adicionar o mesmo produto soma a quantidade
- Subtotal por item, total do carrinho e contador de itens no cabeçalho atualizados em tempo real
- Notificações de feedback com Angular Material (Snackbar)
- Formulário de contato com validação e máscara de telefone
- Rotas com **lazy loading**, títulos por página e página 404
- Valores formatados em Real (`pt-BR` / `BRL`)

## Stack

Angular 21 · TypeScript · Signals · Standalone components · Angular Material · ngx-mask · Vitest

## Arquitetura

```text
src/app/
├── app.config.ts        providers (router, zoneless, locale pt-BR)
├── app.routes.ts        rotas com lazy loading
├── produtos/            listagem e detalhes de produtos
├── carrinho/            carrinho de compras
├── contato/             formulário de contato
├── header/ footer/      layout
├── nao-encontrada/      página 404
├── produtos.ts          modelo e catálogo de produtos
├── produtos.service.ts  consulta e busca no catálogo
├── carrinho.service.ts  estado do carrinho (signals + localStorage)
└── notificacao.service.ts
```

O estado do carrinho fica em `signals` no `CarrinhoService`; os componentes leem `itens()`, `total()` e `quantidadeItens()` e a interface é atualizada automaticamente, sem `zone.js`.

## Como rodar

**Pré-requisitos:** Node.js 20.19+, 22.12+ ou 24+ (há um `.nvmrc` com a versão usada no projeto).

```bash
nvm use        # opcional
npm install
npm start
```

Acesse `http://localhost:4200`.

## Testes

```bash
npm test             # execução única
npm run test:watch   # modo watch
```

Os testes rodam com Vitest + jsdom, sem precisar de navegador instalado.

## Deploy

O build de produção para o GitHub Pages é gerado na pasta `docs/`, com `base-href` `/Ecommerce/` e um `404.html` para que as rotas funcionem ao recarregar a página:

```bash
npm run build:pages
```

Depois é só fazer commit da pasta `docs/` e enviar para a `master`.

## Autora

Feito por [Naiara Rodrigues](https://github.com/naiarar).
