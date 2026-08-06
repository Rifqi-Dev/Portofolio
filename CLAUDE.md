---
tags: [project, Portofolio]
---

# Portofolio — Overview

Personal portfolio site for Rifqi Firlian Pratama (Software Engineer & AI
Engineer). React 18 (CRA), single-page scroll app (not multi-page
routing). Live at https://kapuyuaxdev.my.id. Backed by
[[../porto-api/porto-api|porto-api]].

**Full detailed project rules already exist in-repo at
`.github/copilot-instructions.md`** (theme, section layout, component
library usage, coding conventions) — that file is the authoritative,
detailed spec and is mirrored into this vault at
[[copilot|copilot.md]] for reference. Read it before UI work on this
project; this overview is the short-form summary.

## Stack

- React 18, `react-scripts` (CRA), Tailwind CSS 3, JavaScript (no TS)
- Animation: `@react-spring/web` (primary — number tickers, entrance
  animations), `aos` (scroll-triggered reveals). `motion` is present from
  earlier work but the in-repo instructions say **do not** use
  `framer-motion`-style APIs going forward — prefer React Spring per
  [[../../00-global/overview#Frontend stack (FLOW frontend, Portofolio)|global overview]].
- Icons: FontAwesome only (`@fortawesome/react-fontawesome`)
- Alerts/toasts: SweetAlert2 only — no `react-toastify`/`alert()`
- Component sources: **Magic UI** and **React Bits**, copy-pasted into
  `src/components/magicui/` and `src/components/reactbits/` respectively
  (JS + Tailwind flavor, not TS) via `npx shadcn@latest add ...`
- Contact form: EmailJS (`@emailjs/browser`)

## Structure

```
Portofolio/
  src/
    components/
      magicui/      # Magic UI copy-paste components
      reactbits/     # React Bits copy-paste components
    service/
    utils/
    resources/
  public/
  Dockerfile, nginx.conf
```

## Conventions specific to this project

See `.github/copilot-instructions.md` / [[copilot]] for the full spec:
section order (`home → skills → experience → projects → contact`),
color palette, glassmorphism card styling, and the exact do/don't list
(no react-router-dom, no framer-motion, no non-FontAwesome icons, no
non-SweetAlert2 toasts).

## History

- **Features**: [[features/hero-intro-and-background|Hero/intro & background]],
  [[features/weather-widget-removed|Weather widget (removed)]],
  [[features/content-sections|Content sections]],
  [[features/deployment-and-seo|Deployment & SEO]]
- **Bugs**: [[bugs/responsive-and-animation-fixes|Responsive & AOS animation fixes]]
- **Decisions**: [[decisions/single-page-scroll-architecture|Single-page scroll architecture]],
  [[decisions/copy-paste-component-libraries|Copy-paste component libraries]]

## See also

- [[../../00-global/rules|Global rules]]
