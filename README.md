# Esensible Solutions website

Single-page marketing site for Esensible Solutions Ltd (esensible.ca). Plain HTML, CSS and JavaScript with no build step and no framework.

## Structure

```
index.html            page markup
assets/css/site.css   all styles (design tokens at the top)
assets/js/site.js     nav, scroll reveals, contact form
assets/favicon.svg    logo mark / favicon
node.js               tiny local dev server
```

## Run locally

```
node node.js
# open http://localhost:8080
```

## Before going live

- The contact form opens the visitor's email app addressed to info@esensible.ca.
  Swap in a form backend (Formspree, Netlify Forms or your own endpoint) to capture leads reliably.
- Add real LinkedIn and social URLs to the footer once they exist.
- Host on a static host (GitHub Pages, Netlify, Cloudflare Pages). Don't serve the repo with node.js in production.
