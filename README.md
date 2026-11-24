# Sebastian Szymczyna — Portfolio

Personal portfolio built with [Astro](https://astro.build), migrated from the Framer site (szymczyna.framer.website).

## Getting started

```bash
npm install
npm run fetch-assets   # one-time: downloads images from Framer CDN into public/images
npm run dev            # http://localhost:4321
npm run build          # static output in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Name, headline, intro, contact links | `src/data/site.ts` |
| Case studies (text, stats, screens) | `src/data/projects.ts` |
| Image paths | `src/data/assets.ts` |
| Colours, fonts, spacing | `src/styles/global.css` |
| Page sections | `src/components/*.astro` |
| Scroll animations, contact panel, form | `src/scripts/interactions.ts` |

Each Mountain Guide card lists the phone `screens` it shows while it scrolls past
(`src/data/projects.ts`), so screens can be reordered or swapped there.

## Contact form

Framer handled form submissions; a static site needs an external endpoint.
Set `PUBLIC_FORM_ENDPOINT` (e.g. a Formspree URL) in `.env` or in your hosting settings.
Without it, "Send message" opens the visitor's email app with the message already filled in.

## Deploy

Any static host works: Netlify, Vercel, Cloudflare Pages or GitHub Pages
(build command `npm run build`, output directory `dist`). Update `site` in `astro.config.mjs` to the final domain.
