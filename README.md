# Ecommerce 🛒

Loja virtual de periféricos e hardware feita em **Angular**, com catálogo, carrinho persistente e formulário de contato.

**🔗 Demo:** https://naiarar.github.io/Ecommerce/

![Tela da loja](docs/screenshot.png)

## Funcionalidades

- Catálogo de produtos com página de detalhes
- Carrinho de compras persistido no `localStorage` (sobrevive ao recarregar a página)
- Controle de quantidade por item, respeitando o estoque disponível
- Notificações de feedback com Angular Material
- Formulário de contato
- Rotas com **lazy loading** por módulo e página 404

## Stack

Angular 15 · TypeScript · Angular Material · Karma/Jasmine

## Arquitetura

```
src/app/
├── produtos/            listagem e detalhes de produtos
├── carrinho/            carrinho de compras
├── contato/             formulário de contato
├── header/ footer/      layout
├── nao-encontrada/      página 404
├── produtos.service.ts  catálogo
├── carrinho.service.ts  estado do carrinho no localStorage
└── notificacao.service.ts
```

## Como rodar

**Pré-requisitos:** Node 18.

```bash
npm install
npm start
```

Acesse `http://localhost:4200`.

## Testes

```bash
npm test
```

## Deploy

O build de produção é gerado na pasta `docs/` e publicado pelo GitHub Pages.

```bash
npx ng build --output-path docs --base-href /Ecommerce/
```

## Autora

Feito por [Naiara Rodrigues](https://github.com/naiarar).
