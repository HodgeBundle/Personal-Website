# Zheng Zhu — Academic Website

Source for the personal academic website of Zheng Zhu (朱政), PIMS
Postdoctoral Fellow at the University of Calgary.

The site presents research interests, publications and preprints, teaching
history, biography, and contact information. Its visual system uses a dark
editorial palette, Playfair Display for English display typography, Manrope for
interface and body text, and a Song/Ming-style system font stack for the
Chinese name.

## Pages

- `/` — introduction and current research themes
- `/about` — biography, portrait, affiliation, office, and contact information
- `/research` — research interests, publications, preprints, and current work
- `/teaching` — current and previous courses

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

The production build is validated with:

```bash
npm run build
```

## Technology

- Next.js / React
- Vinext and Vite
- Cloudflare-compatible server output
- Responsive CSS with reduced-motion support

## Content updates

Page content lives under `app/`. Shared navigation and footer markup lives in
`app/components/site-shell.tsx`, while the visual system and responsive rules
live in `app/globals.css`.
