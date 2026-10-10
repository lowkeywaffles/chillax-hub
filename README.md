# Chillax Hub: website demo

Demo website for Chillax Hub, 3000 Northside Blvd, Ste 700, Richardson, TX 75080 (by UT Dallas) · (469) 777-6077.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Vinyl-record language switch (Side A = EN, Side B = ES), lava-lamp light/dark switch.
- Very little public info exists, so the page sticks to confirmed facts (dessert/ice cream spot, location, phone, 4.3 rating).

## Needed before going live (most important for this one)
- [ ] Opening hours
- [ ] Menu: ice cream flavors, desserts, drinks (boba? coffee? shakes?) and prices
- [ ] Photos of the treats and the space (seating?)
- [ ] Is the "Chillax Hub" Facebook page theirs? Instagram?
- [ ] Logo/brand colors

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
