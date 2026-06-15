# Portfolio Project Guidelines

## Project Identity

**Owner:** Rifqi Firlian Pratama — Software Engineer & AI Engineer  
**Site URL:** https://kapuyuaxdev.my.id  
**Stack:** React 18 (CRA), Tailwind CSS 3, JavaScript

---

## Architecture: Single Page App (Scroll-Based)

This is a **single-page scroll app** — NOT multi-page routing.

- **Remove** `react-router-dom` routing. There are no pages, only sections.
- Navigation scrolls to section IDs using `react-scroll` (`<Link to="sectionId" spy smooth duration={800} />`).
- Each section is a `<section id="...">` full-screen block stacked vertically in `App.js`.
- **Do not** use `BrowserRouter`, `Routes`, `Route`, or `<Outlet />`.
- **Remove** the `Layout`, `Sidenav`, `Navbar` (router-based), and `OnlineCompiler` components.
- Replace top nav with a sticky scroll-tracking navbar that highlights the active section.

### Section Order & IDs

| #   | Section ID   | Component        |
| --- | ------------ | ---------------- |
| 1   | `home`       | `<Hero />`       |
| 2   | `skills`     | `<Skills />`     |
| 3   | `experience` | `<Experience />` |
| 4   | `projects`   | `<Projects />`   |
| 5   | `contact`    | `<Contact />`    |

---

## Visual Theme: Space / Galaxy

### Background

- Replace `react-particles` stars with a **moving, blinking star field** background.
- Preferred approach: use a ReactBits background component (e.g., `StarField`, `Dot Field`, or `Particles`) or a custom canvas/CSS animation.
- The background must be fixed, full-screen, behind all content (`position: fixed; z-index: 0`).
- Stars should twinkle/blink and slowly drift — do NOT use a static image.

### Color Palette (keep existing)

| Token           | Value                                       | Usage                       |
| --------------- | ------------------------------------------- | --------------------------- |
| Background      | `#000000`                                   | Page background             |
| Card background | `bg-white/10` or `#A20B0B` at `20%` opacity | Glassmorphism cards         |
| Primary accent  | `#A20B0B`, `#822020`                        | Buttons, badges, highlights |
| Tailwind accent | `red-400`, `red-700`, `red-800`             | Hover states, gradients     |
| Text            | `white`                                     | All body text               |
| Font            | `font-poppins` (Google Fonts, weight 500)   | All text                    |

### Glassmorphism Cards

All section cards use:

```jsx
className = "backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl";
```

### Animations

- **Page animations:** `@react-spring/web` — use `useSpring` / `useTrail` for entrance animations.
- **Scroll animations:** `aos` library — initialize with `{ duration: 1500 }`.
- **Number counters:** `@react-spring/web` `animated.span` with spring from `0` to target.
- **Hover effects:** Tailwind `hover:scale-105 transition-transform duration-300`.
- **Do NOT** use `framer-motion` — not in the project.

---

## UI Component Libraries

### Magic UI — https://magicui.design/

- Components are **copy-pasted** into `src/components/magicui/` (not npm-installed as a whole package).
- Built with React + TypeScript + Tailwind CSS + Motion (Framer Motion).
- Use for: animated text effects, border beams, shimmer buttons, meteors, sparkles, number tickers, typing animations.
- Install individual components via CLI: `npx shadcn@latest add "https://magicui.design/r/<component>"`.
- Always check https://magicui.design/docs/components/<component-name> before implementing.

### React Bits — https://reactbits.dev/

- Components are **copy-pasted** into `src/components/reactbits/` (not npm-installed as a whole package).
- Use for: animated backgrounds, text effects, creative UI patterns (StarField, Aurora, etc.).
- Pick the **JS + Tailwind** flavor when copying components (not TypeScript, since this is a JS CRA project).
- Install via: `npx shadcn@latest add @react-bits/<ComponentName>` or copy source directly.

---

## Icons

Always use **FontAwesome** (`@fortawesome/react-fontawesome`). Never use other icon libraries.

```jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
<FontAwesomeIcon icon={faGithub} />;
```

---

## Toast / Alerts

Always use **SweetAlert2** (`sweetalert2`). Never use `react-toastify` or browser `alert()`.

```jsx
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});
Toast.fire({ icon: "success", title: "Message sent!" });
```

---

## Section Content

### 1. Hero (`#home`)

- Avatar photo (existing CDN URL from `intro.js`)
- Name: **Rifqi Firlian Pratama**
- Role: **Software Engineer & AI Engineer**
- Tagline gradient: `bg-gradient-to-r from-red-400 to-red-800 bg-clip-text text-transparent`
- Social links: LinkedIn, GitHub, Instagram, Email — wrapped in `<NeonContainer>`
- `<VisitorCount />` widget at bottom of hero (keep existing logic with `@react-spring/web` counter)

### 2. Skills (`#skills`)

Render as an animated card grid. Data:

**Hard Skills:**

```
Web Development, REST APIs, JavaScript, TypeScript, Node.js, Express.js, Bun, ElysiaJs,
PostgreSQL, MongoDB, Angular, React.js, CSS3/SCSS, Tailwind CSS, JIRA, Git, Docker,
Python, Computer Vision, OpenCV, FFmpeg
```

**Soft Skills:** Team Work, Problem Solving, Fast Learning

**Software / Tools:** VS Code, Linux Server, Postman, Anaconda, LabelMe

Use shield.io badge images for tech stack items, same pattern as existing `WhatIdo.js`:

```jsx
<img
  src={`https://img.shields.io/badge/${name}-${color}?style=for-the-badge`}
  alt={name}
/>
```

### 3. Work Experience (`#experience`)

Render as a vertical timeline. Data:

```
PT. Inovasi Teknologi Olahraga | AI Engineer | August 2025 – Present | Contract Remote
PT. Tjakrabirawa Teknologi Indonesia | AI Engineer | October 2024 – August 2025 | Contract Remote
PT. Ondel Teknologi Indonesia | Full Stack Developer | August 2023 – May 2025 | Contract Jakarta Utara
```

Key tech stacks per role — summarize from CV (AI: Python, OpenCV, FFmpeg, REST APIs; FS: Angular, Express, PostgreSQL, Node.js).

### 4. Personal Projects (`#projects`)

Render as a card grid. Primary project:

**FLOW — Personal Finance Tracker**

- URL: http://flow.kapuyuaxdev.my.id/
- Description: Offline-first PWA for tracking expenses, income, loans, budgets, savings, and pockets with optional Google-authenticated cloud sync across devices.
- Tech stack: React 19, Vite, TypeScript, Tailwind CSS, Zustand, Dexie (IndexedDB), Recharts, Node.js, Express, Prisma, PostgreSQL, PASETO tokens, Docker
- Key features: Dashboard with cashflow charts, transaction CRUD, budget limits, savings targets, money pockets/envelopes, loan tracking, delta-sync across devices, PWA (installable)
- Screenshot: use `https://api.screenshotmachine.com/?key=67285c&url=http://flow.kapuyuaxdev.my.id/&dimension=1024x768` (existing API key pattern from `Projects.js`)
- GitHub link if available; otherwise link to live URL

Include other existing projects from `Projects.js` (robotik.pkm.unp.ac.id, sunshine.onindonesia.id, onmarket.id series).

### 5. Contact (`#contact`)

Keep existing `Contact.js` logic: EmailJS with `useRef` form, SweetAlert2 toast on success/failure. Fields: Name, Email, Subject, Message.

---

## What to Remove

- `OnlineCompiler` component and all its sub-components (`Editor.js`, `Output.js`)
- `About.js` (stub, unused)
- `Weather.js` and `Earthquacke.js` (unused in current layout)
- `Sidenav` component
- `Layout` component (replaced by flat scroll layout)
- All `react-router-dom` usage (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, etc.)
- `monaco-editor-webpack-plugin` and `react-monaco-editor` from package.json if OnlineCompiler is removed
- `@babel/standalone` if OnlineCompiler is removed

---

## File Organization

```
src/
  components/
    Hero.js          # section 1
    Skills.js        # section 2
    Experience.js    # section 3
    Projects.js      # section 4 (refactor existing)
    Contact.js       # section 5 (keep existing)
    Navbar.js        # sticky scroll-tracking nav (rewrite)
    Footer.js        # keep existing
    VisitorCount.js  # keep existing
    NeonContainer.js # keep existing
    magicui/         # Magic UI copy-paste components
    reactbits/       # React Bits copy-paste components
  service/
    analyticService.js   # keep
    textEditorService.js # remove when OnlineCompiler removed
  utils/
    stars-particles.json # keep or replace with ReactBits StarField
```

---

## Coding Conventions

- All components are **function components** with hooks. No class components.
- Use **Tailwind CSS** utility classes. No inline `style={{}}` unless for dynamic values (e.g., spring animations).
- Prefer `const` arrow functions: `const Hero = () => { ... }; export default Hero;`
- Use `useEffect` + `AOS.init({ duration: 1500 })` in the root component or each section that needs scroll animations.
- `@react-spring/web` for number tickers and entrance animations; `aos` for scroll-triggered reveals.
- Do not add TypeScript — project is JavaScript CRA.
