# LASTOMAR Business Corporation — Landing Page

Landing page institucional de página única para a **LASTOMAR Business Corporation**, escritório de assessoria jurídica sediado em Belas, Luanda — Angola.

## Estrutura do projeto

```
lastomar/
│
├── index.html            → estrutura completa da página (secções, SEO, JSON-LD)
├── css/
│   └── style.css         → design system (tokens), componentes e responsividade
├── js/
│   └── main.js            → navbar, menu mobile, accordions, scroll reveal
├── assets/
│   ├── images/            → reservado para fotografia real (ver "Imagens" abaixo)
│   ├── icons/
│   │   └── favicon.svg
│   └── fonts/             → reservado caso se opte por hospedar as fontes localmente
├── README.md
└── .gitignore
```

## Como visualizar

Não é necessário build nem instalação. Basta abrir `index.html` num navegador,
ou servir a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Stack

HTML5, CSS3 e JavaScript puro (sem frameworks), conforme especificado para a
primeira versão. As fontes **Cormorant Garamond** (títulos) e **Inter** (texto)
são carregadas via Google Fonts com `preconnect` para otimizar o carregamento.

## Design system

Todas as cores, tipografia, espaçamentos e sombras estão centralizados como
variáveis CSS em `:root`, no topo de `css/style.css`. Para ajustar a paleta ou
escala tipográfica, edite apenas essa secção — todos os componentes herdam
dela.

## Conteúdo pendente de confirmação pelo cliente

Os seguintes pontos foram propositadamente deixados como estrutura preparada,
sem dados inventados, e devem ser atualizados quando a informação for
confirmada:

- **Localização exacta / Google Maps** — atualmente apresenta-se "Belas,
  Luanda — Angola" como texto. Assim que houver uma morada precisa ou
  coordenadas, o bloco `.contact-map` em `index.html` pode ser substituído por
  um embed real do Google Maps.
- **Imagem de Open Graph** (`og:image`) — não foi incluída por não haver uma
  fotografia oficial fornecida. Recomenda-se adicionar uma imagem 1200×630px
  em `assets/images/` e referenciá-la no `<head>`.
- **Redes sociais** — não foram adicionadas por não terem sido fornecidas.
- **Nomes de advogados, número de inscrição na Ordem, estatísticas, prémios
  ou certificações** — não foram incluídos por não terem sido fornecidos. Não
  devem ser preenchidos com informação fictícia.
- **Domínio / URL canónico** — o `<head>` não define uma tag `canonical` nem
  `og:url` porque o domínio final ainda não foi definido; adicionar assim que
  o site for publicado.

## Notas de manutenção

- O botão de WhatsApp assume o número **925 341 062** como único número
  confirmado para WhatsApp. Caso o segundo número também tenha WhatsApp,
  atualizar os links `https://wa.me/244925341062` onde relevante.
- Os cards de "Áreas de Atuação" usam um padrão de *accordion* acessível
  (`aria-expanded`, navegação por teclado). Novas áreas podem ser adicionadas
  copiando um `<article class="service-card">` existente.
- As animações respeitam `prefers-reduced-motion`; qualquer nova animação
  adicionada deve manter essa mesma cautela.
