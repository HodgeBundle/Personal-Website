# Zheng Zhu — Academic Website

Source for the personal academic website of Zheng Zhu (朱政), PIMS
Postdoctoral Fellow at the University of Calgary.

Published at <https://hodgebundle.github.io/Personal-Website/>.

## Pages

- `/` — introduction, generative hero art, and current research themes
- `/about/` — biography, portrait, affiliation, office, and contact information
- `/research/` — research interests, publications, preprints, and current work
- `/teaching/` — current and previous courses

## Technology

Plain static HTML/CSS/JS — no build step. The `site/` directory is deployed
to GitHub Pages as-is by `.github/workflows/pages.yml`.

The home page hero is a generative canvas piece (`site/assets/hero-art.js`):
nested hairline orbits with points travelling along them, an iterate spiral
converging to the fixed point z*, and an arboreal tree — a small portrait of
arithmetic dynamics. It is deterministic (seeded PRNG), DPR-aware, and
respects `prefers-reduced-motion`.

The visual system uses a warm ivory paper palette with a copper accent,
Ibarra Real Nova for the English name, Playfair Display for the remaining English display type, Manrope for interface text,
Geist Mono for labels, and Ma Shan Zheng (马善政) for the Chinese name.
All fonts are self-hosted subsets in `site/assets/`.

## Development

Everything is static; open `site/index.html` directly or serve the folder:

```bash
cd site && python3 -m http.server 8000
```

## Content updates

Page content lives in the HTML files under `site/`. Shared styles live in
`site/assets/site.css`. The portrait is `site/assets/zheng-zhu.jpg`.
