# Portfólio — Washington Costa (costadev)

Versão simples do portfólio: **HTML + CSS + JavaScript + Tailwind CSS (via CDN)**.
Sem React, sem `npm`, sem build. É só abrir o `index.html`.

## Como ver no seu computador

Dê dois cliques no `index.html`. (O Tailwind, as fontes e os ícones carregam pela
internet, então precisa estar online na primeira abertura.)

Se preferir um servidor local:

```bash
npx serve .
# ou
python -m http.server 5500
```

## Estrutura

```
index.html        → todo o conteúdo e as seções da página
css/style.css     → cores (variáveis), botões, cards, animações
js/main.js        → contatos, menu do celular, título digitado, animação ao rolar
assets/img/       → capturas de tela dos projetos
favicon.svg       → ícone da aba
robots.txt        → SEO
```

## Onde mexer em cada coisa

| Quero mudar...                                  | Onde                                          |
| ----------------------------------------------- | --------------------------------------------- |
| WhatsApp, e-mail, GitHub, LinkedIn              | `CONFIG` no topo de `js/main.js`              |
| Textos de hero, serviços, sobre                 | `index.html`                                  |
| Título e descrição para buscas (SEO)            | `<head>` do `index.html`                      |
| Cores e tema                                    | variáveis `:root` em `css/style.css`          |
| Fontes                                          | link do Google Fonts no `<head>` + `@theme`   |

> O número de WhatsApp aparece também como texto no rodapé (`+55 11 96235-0981`)
> e o @ do GitHub/LinkedIn também. Se trocar em `CONFIG`, ajuste esses textos no `index.html`.

## Adicionar um projeto novo

1. Coloque a imagem (proporção ~16:10, ex.: 1000x625) em `assets/img/`.
2. No `index.html`, na seção `PROJETOS`, copie um bloco `<div class="reveal"> ... </div>`
   e troque a imagem, o nome, a descrição e o link.

## Publicar

Como é um site estático, qualquer hospedagem serve: arraste a pasta inteira para o
[Netlify Drop](https://app.netlify.com/drop), ou use GitHub Pages / Vercel.

Depois de ter o domínio final, descomente/adicione no `<head>` as linhas
`canonical` e `og:url` (há um comentário indicando onde).

## Observação sobre o Tailwind via CDN

O script `@tailwindcss/browser` é ótimo para projetos simples e aprendizado.
Para produção com desempenho máximo, o ideal é gerar o CSS com o CLI do Tailwind
(`npx @tailwindcss/cli -i ... -o ...`) e trocar o `<script>` por um `<link>` do CSS gerado.
