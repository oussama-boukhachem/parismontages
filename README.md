# ParisMontages — Refonte (démo)

Maquette de refonte du site **parismontages.fr** (rayonnage industriel, Paris & Île-de-France).
Site statique **HTML / CSS / JS**, sans build, prêt pour GitHub Pages.

## Direction de design (skill `frontend-design-ultimate`)

- **Ton** : Industrial / Utilitarian — acier sombre, orange de sécurité, typo condensée, data-dense.
- **Palette** : graphite `#0B0E11` / surface `#12171C` + accent sécurité `#FF5A1F` + jaune `#FFC300`.
- **Typo** : Archivo (display), Barlow (texte), JetBrains Mono (labels/data). Pas d'Inter/Roboto/Arial.
- **Élément mémorable** : motif `hazard stripes`, bandeau défilant, calculateur de capacité, compteurs.
- **Motion** : révélations au scroll orchestrées (IntersectionObserver), transitions 200–400 ms.
- **Responsive** : mobile-first, breakpoints 1020 / 860 / 768 / 560 / 420 px.

## Contenu

Sections : header sticky, hero, bandeau défilant, diagnostic (problème/solution), 6 services,
6 gammes produits, calculateur de capacité, méthode en 6 étapes, bande photos « sur le terrain »,
zones (8 départements IDF), 6 témoignages, FAQ, formulaire de devis, footer.

## Structure

```
index.html
assets/
  css/styles.css
  js/main.js
  img/*.jpg
CREDITS.md      # attributions des photos
```

## Pistes avant mise en production

- Brancher le formulaire sur un vrai endpoint (PHP/Formspree/API) — actuellement `mailto:`.
- Remplacer/valider les chiffres marketing (tonnes, surface libérée) avec le client.
- Enrichir les mentions légales (SIRET, dirigeant) et ajouter les CGV/confidentialité.
- Optimiser davantage les images (AVIF/WebP) si besoin.

## Servir en local

```bash
python3 -m http.server 8088
# http://localhost:8088
```
