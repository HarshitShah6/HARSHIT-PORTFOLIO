# Harshit Shah — Portfolio

Personal developer portfolio for Harshit Shah, a full-stack Software Development Engineer. Built as a fast, animated single-page site.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (design tokens via CSS variables)
- Framer Motion
- Lenis
- lucide-react
- Space Grotesk, Inter, JetBrains Mono (Fontsource)

## Setup

```bash
cd harshit-portfolio
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build     # production build
npm run preview   # preview the build
npm run lint      # ESLint
npm run format    # Prettier
```

## How to edit content

All copy lives in typed files under `src/data/`:

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Name, tagline, email, phone, links, form endpoint |
| `src/data/nav.ts` | Navigation labels and section ids |
| `src/data/experience.ts` | Timeline roles and bullets |
| `src/data/impact.ts` | Animated stats |
| `src/data/projects.ts` | Tiffin platform + production work cards |
| `src/data/skills.ts` | Bento groups and marquee labels |
| `src/data/education.ts` | Education entries |

Replace the résumé PDF at `public/Harshit_Shah_Resume.pdf`.

## Placeholders to fill in

See **TODO** comments in `src/data/site.ts`:

1. GitHub URL
2. LinkedIn URL
3. Résumé PDF (`public/Harshit_Shah_Resume.pdf`)
4. Formspree (or similar) form endpoint
5. Canonical domain (`canonicalUrl`, `index.html` OG tags, `public/robots.txt`, `public/sitemap.xml`)

## Deploy

**Vercel:** import the repo, framework preset Vite, output `dist`. Zero extra config.

**Netlify:** import the repo, build command `npm run build`, publish directory `dist`.

Set the production domain, then update sitemap/robots/OG URLs.

## Accessibility and motion

The site respects `prefers-reduced-motion`, persists theme choice, and falls back to `prefers-color-scheme`. Custom cursor and heavy mesh motion are disabled on coarse pointers.
