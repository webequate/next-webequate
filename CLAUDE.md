# Project: next-webequate (WebEquate — webequate.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

**Purpose:** Company website and portfolio for WebEquate, a full-service web development agency founded in 2005 by Allen Johnson. Visitors can browse the agency's portfolio of client projects, explore its service offerings, read about the company, and submit a contact form that delivers email through Gmail SMTP.

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 24 LTS (24.15.0) | Pinned in `.nvmrc` and `vercel.json` |
| Next.js | 16 | App Router only; Turbopack enabled |
| React | 19 | Automatic JSX runtime (`react-jsx`) |
| TypeScript | 5.x | strict mode, `moduleResolution: bundler` |
| Tailwind CSS | 3.x | PostCSS pipeline |
| ESLint | 9 | Flat config (`eslint.config.mjs`) |
| Prettier | 3.x | Integrated via `eslint-plugin-prettier` |
| Nodemailer | 8 | Contact form email (Gmail SMTP) |
| Deployment | Vercel | Node 24, no custom build command |

---

## Architecture

- **App Router only.** There is no `pages/` directory (excluded in `tsconfig.json`). All routes live under `app/`.
- **Turbopack** is the bundler for both dev and build. Do not add webpack configuration — it will be ignored and may cause errors.
- **SVG imports** are inlined as TSX components (`components/WebEquateLogo.tsx`). No `@svgr/webpack` loader and no raw `.svg` imports — the SVG file exists in `components/` for reference only.
- **CSS `@import`** statements must appear before all `@tailwind` directives in `globals.css` — Turbopack enforces this. This project currently has no `@import` lines; if adding a Google Font, place it first.
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.ts`.
- **All content is static.** No database or CMS. Site content lives in `data/*.json` and images in `public/images/`. Pages are statically generated at build time.
- **Two content streams:** Projects (`data/projects.json`) and Services (`data/services.json`). Each has independent active/featured status flags and ordering. The home page shows the featured subset of each.

---

## Directory structure

```
next-webequate/
├── app/                          # All routes (App Router)
│   ├── layout.tsx                # Root layout: HTML shell, font, GTM, Layout wrapper, providers
│   ├── page.tsx                  # Home page: titles, summaryItems, featured projects + services
│   ├── providers.tsx             # Client-side providers (next-themes ThemeProvider)
│   ├── about/
│   │   └── page.tsx              # Two-column: AboutContent (text) + AboutDetails (photo)
│   ├── contact/
│   │   └── page.tsx              # Two-column: ContactForm + ContactDetails sidebar
│   ├── services/
│   │   └── page.tsx              # Full service grid (all active services)
│   ├── projects/
│   │   ├── layout.tsx            # Pass-through layout with shared metadata
│   │   ├── page.tsx              # All active projects grid
│   │   └── [id]/
│   │       └── page.tsx          # Server component: generateMetadata, generateStaticParams, prev/next
│   ├── featured/
│   │   └── [id]/
│   │       └── page.tsx          # Server component: same as projects/[id] but robots: no-index
│   └── api/
│       └── send-email/
│           └── route.ts          # POST: contact form → Nodemailer. GET: health ping
│
├── components/                   # Shared UI components (25 files)
│   ├── WebEquateLogo.tsx         # Inline SVG logo with accent rectangles (used as home link)
│   ├── AllenJohnson.tsx          # Inline SVG of "ALLEN JOHNSON" in Russo One font
│   ├── AboutContent.tsx          # About page text: intro heading + paragraph list
│   ├── AboutDetails.tsx          # About page image (allen-ai.jpg); prop interface present but unused
│   ├── ContactDetails.tsx        # Contact sidebar: icons + name/location/phone/email/website
│   ├── ContactForm.tsx           # Contact form with honeypot, validation, loading state
│   ├── Copyright.tsx             # Footer copyright with dynamic year
│   ├── ExternalLink.tsx          # External resource link (opens in new tab)
│   ├── Footer.tsx                # Footer nav, social links, copyright (client — uses usePathname)
│   ├── FormInput.tsx             # Reusable labeled text/email input
│   ├── Hamburger.tsx             # Mobile menu toggle (FiMenu / FiX icons)
│   ├── Header.tsx                # Responsive nav: logo, social, links, hamburger, theme switcher
│   ├── Heading.tsx               # Section h2 heading with accent-color text
│   ├── HomeButton.tsx            # Unused home link with static image (not referenced by any page)
│   ├── Layout.tsx                # Main content wrapper (<main> with border/padding)
│   ├── PageTransition.tsx        # Route-change fade animation wrapper (client — uses usePathname)
│   ├── ProjectDetailClient.tsx   # Client component: project image, swipe nav, ProjectHeader/Footer
│   ├── ProjectFooter.tsx         # Project metadata: description, tags, links, screenshot links
│   ├── ProjectGrid.tsx           # Responsive 2→3-col project thumbnail grid with hover overlay
│   ├── ProjectHeader.tsx         # Project detail title + prev/next arrow navigation
│   ├── ScreenshotLink.tsx        # Device screenshot link with device-type icon
│   ├── ServiceGrid.tsx           # 1→2-col service cards with dynamic react-icons/fa icons
│   ├── Social.tsx                # Maps socialLinks array → SocialButton list
│   ├── SocialButton.tsx          # Social icon link (GitHub, LinkedIn, Twitter, etc.)
│   ├── TagLink.tsx               # Project tag badge with FaTag icon
│   ├── ThemeSwitcher.tsx         # Moon/Sun toggle (next-themes, mounted guard)
│   └── WebEquateLogo.tsx         # Inline SVG logo
│
├── hooks/
│   ├── useScrollToTop.tsx        # Returns scroll-to-top button JSX; shows after 400px scroll
│   └── useThemeSwitcher.tsx      # Returns [activeTheme, setTheme]; persists to localStorage
│
├── interfaces/
│   └── ContactForm.ts            # ContactForm interface (name, email, subject, message, website)
│
├── lib/
│   └── seo.ts                    # generateSeoMetadata(): centralised Next.js Metadata factory
│
├── types/
│   ├── basics.ts                 # Basics and SocialLink (matches data/basics.json)
│   ├── project.ts                # Project, ProjectScreenshots, ProjectStatus
│   ├── service.ts                # Service type (matches data/services.json)
│   └── experience.ts             # School, Job types — defined but not yet used
│
├── data/                         # Static JSON content (source of truth for all site content)
│   ├── basics.json               # Company identity: name, titles, summaryItems, aboutIntro/Items, social links, contact info
│   ├── projects.json             # 7 portfolio projects with status flags and screenshot paths
│   └── services.json             # 12 service offerings with icons and status flags
│
├── styles/
│   └── globals.css               # Tailwind directives, animation keyframes, nav classes, scrollbar fix
│
├── public/
│   ├── images/                   # Page images (allen-ai.jpg, webequate-og.jpg, project screenshots)
│   ├── assets/                   # Brand logos (logo-webequate-light.png used in email template)
│   ├── fonts/                    # Custom font files (if any)
│   ├── resume/                   # Resume PDFs
│   ├── samplework/               # Sample work files (not linted — excluded in eslint.config.mjs)
│   ├── robots.txt                # Auto-generated by next-sitemap
│   ├── sitemap-0.xml             # Auto-generated + sorted by build:sitemap
│   └── webequate.png             # Favicon
│
├── scripts/
│   └── sort-sitemap.js           # Reads sitemap-*.xml, sorts <loc> entries, writes back
│
├── next.config.js                # Turbopack SVG extensions, AVIF/WebP image formats, strict mode
├── tsconfig.json                 # Target ES2022, react-jsx, @/* alias, bundler resolution
├── tailwind.config.js            # Custom palette (blue accent), dark mode: class, forms plugin
├── eslint.config.mjs             # ESLint v9 flat config
├── postcss.config.js             # PostCSS for Tailwind
├── .prettierrc.json              # Formatting rules
├── next-sitemap.config.js        # Sitemap config; excludes /featured and /featured/**
├── vercel.json                   # NODE_VERSION: 24.15.0
├── .nvmrc                        # Node 24
└── .env.template                 # Environment variable reference
```

---

## Key files

| File | Purpose |
|---|---|
| `next.config.js` | Turbopack extensions, AVIF/WebP image formats, strict mode |
| `tsconfig.json` | `jsx: react-jsx`, no `baseUrl`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint v9 flat config with native `@typescript-eslint` rules |
| `styles/globals.css` | Tailwind directives first, then animation/nav classes |
| `.nvmrc` | Node 24 |
| `vercel.json` | `NODE_VERSION: 24.15.0` |
| `lib/seo.ts` | `generateSeoMetadata()` — use for all dynamic route metadata |
| `app/api/send-email/route.ts` | Contact form API handler |
| `data/basics.json` | Company identity and contact config |
| `data/projects.json` | All project content (single source of truth) |
| `data/services.json` | All service content (single source of truth) |

---

## Environment variables

All variables are required in production unless marked optional. Copy `.env.template` to `.env.local` for local development.

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail account used as the SMTP sender |
| `GMAIL_APP_PASS` | Yes | Gmail app-specific password (not the account password) |
| `EMAIL_FROM` | Yes | `From:` address in outgoing emails |
| `EMAIL_TO` | Yes | Recipient address for contact form submissions |
| `EMAIL_CC` | No | CC address for contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (`https://webequate.com`) — used for metadata and sitemaps |
| `NEXT_PUBLIC_ASSET_URL` | Yes | Base URL for public assets |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

`NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

---

## Third-party services

| Service | How used |
|---|---|
| **Gmail SMTP** | Nodemailer connects on port 465 (TLS) using `GMAIL_USER` + `GMAIL_APP_PASS`. Configure a Gmail App Password — standard account passwords are rejected. |
| **Google Tag Manager** | Injected via `@next/third-parties` `<GoogleTagManager>` in the root layout. Controlled by `NEXT_PUBLIC_GTM_ID`. |
| **Google Fonts** | Russo One (weight 400) loaded via `next/font/google` in `app/layout.tsx` as a CSS variable (`--font-russo-one`). This is not an `@import` — it goes through Next.js font optimization. |
| **Vercel** | Deployment platform. No custom build command — Vercel auto-detects Next.js. Node version set in `vercel.json`. |
| **next-sitemap** | Generates `sitemap.xml` and `robots.txt` at build time via `npm run build:sitemap`. Config in `next-sitemap.config.js`. Excludes `/featured` and `/featured/**` from the sitemap. |

---

## Data model

### `data/basics.json` → `types/basics.ts`

Single object with company-wide identity and contact info. Imported directly in server components.

```ts
type SocialLink = {
  name: string;
  handle: string;
  url: string;
};

type Basics = {
  _id: string;
  name: string;
  titles: string[];       // Gradient-styled headlines on the home page
  summaryItems: string[]; // Supporting paragraphs below the headlines
  aboutIntro: string;     // H1 heading on the About page
  aboutItems: string[];   // Body paragraphs on the About page
  resumeLink: string;
  socialLinks: SocialLink[];
  location: string;
  phone: string;
  website: string;
  contactIntro: string;   // Intro text in the ContactDetails sidebar
};
```

### `data/projects.json` → `types/project.ts`

Array of project objects. All project pages filter and sort this array. The `status` flags control which projects appear where — never hard-code a project list in a page component.

```ts
type ProjectScreenshots = {
  path?: string;     // Base path under public/ for screenshot files
  mobile?: string;   // Filename for mobile screenshot
  tablet?: string;
  laptop?: string;
  desktop?: string;
};

type ProjectStatus = {
  active?: boolean;        // Appears in /projects grid
  activeOrder?: number;    // Sort order within active list
  featured?: boolean;      // Appears in home page + /featured/* routes
  featuredOrder?: number;  // Sort order within featured list
};

type Project = {
  id: string;              // URL segment: /projects/my-id or /featured/my-id
  name: string;
  type: string;            // Free-form label (e.g., "Next.js", "WordPress")
  company: string;
  thumbImage: string;      // Path relative to public/: used in ProjectGrid
  tags: string;            // Comma-separated tag string
  description: string;
  mainImage: string;       // Path relative to public/: used in ProjectDetailClient
  details?: string;        // URL for "Further Details" external link
  link?: string;           // URL for "Live Site" external link
  screenshots?: ProjectScreenshots;
  status?: ProjectStatus;
};
```

A project can be both `active` and `featured`. Active projects appear at `/projects`; featured projects appear on the home page and at `/featured/[id]`. The two sets are sorted independently by `activeOrder` and `featuredOrder`.

### `data/services.json` → `types/service.ts`

Array of service objects. Filtered and sorted the same way as projects — never render `servicesData` directly.

```ts
type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;   // Font Awesome icon name string, e.g. "FaCode" — resolved at runtime via Icons[service.icon]
  status: {
    active: boolean;
    activeOrder: number;
    featured: boolean;
    featuredOrder: number;
  };
};
```

Service icons are resolved in `ServiceGrid` by importing all of `react-icons/fa` and doing a dynamic key lookup: `Icons[service.icon as keyof typeof Icons]`. The icon string in the JSON must exactly match a named export from `react-icons/fa`.

### `interfaces/ContactForm.ts`

```ts
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;  // Honeypot — must be empty; bots fill it in
}
```

### `types/experience.ts` (defined, not yet used)

```ts
type School = { _id, school, program, city, endDate, order };
type Job    = { _id, company, role, city, startDate, endDate, achievements[], order };
```

These types exist for a potential experience/résumé section. There is no `data/experience.json` yet.

---

## Routing

| URL pattern | Source file | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home: titles, summaryItems, featured projects + services grids |
| `/about` | `app/about/page.tsx` | Two-column: text left, photo right (reverses on desktop) |
| `/contact` | `app/contact/page.tsx` | Two-column: form left, contact details right |
| `/services` | `app/services/page.tsx` | Full ServiceGrid of all active services |
| `/projects` | `app/projects/page.tsx` | ProjectGrid of all active projects |
| `/projects/[id]` | `app/projects/[id]/page.tsx` | SEO-indexed project detail with prev/next |
| `/featured/[id]` | `app/featured/[id]/page.tsx` | Same as `/projects/[id]` but `robots: { index: false }` |
| `/api/send-email` | `app/api/send-email/route.ts` | POST: contact form handler; GET: health check |

Dynamic project pages use `generateStaticParams` to pre-render all IDs at build time. The `params` object is typed as `Promise<{ id: string }>` — always `await params` before use (React 19 async params).

The `/featured/[id]` route exists so home-page project thumbnails link to a detail view that won't compete with the canonical `/projects/[id]` URL in search results. Both routes render `ProjectDetailClient` — the only difference is the `path` prop (`"featured"` vs `"projects"`) and the robots metadata.

---

## SEO and metadata

### `lib/seo.ts` — `generateSeoMetadata()`

This is the canonical way to generate metadata for any page that needs per-item OG images, canonical URLs, or custom robots settings. Use it in `generateMetadata` functions on dynamic routes.

```ts
import { generateSeoMetadata } from "@/lib/seo";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const project = /* look up project */;

  return generateSeoMetadata({
    title: `WebEquate | ${project.name}`,
    description: project.description,
    path: `/projects/${project.id}`,
    ogImage: `/${project.mainImage}`,  // relative path is made absolute automatically
    ogImageAlt: project.name,
    ogType: "article",
    // robots: { index: false } for /featured/[id]
  });
};
```

The function constants (site URL, Twitter handle, default OG image) are hardcoded in `lib/seo.ts`:

```ts
const SITE_NAME       = "WebEquate";
const SITE_URL        = "https://webequate.com";
const DEFAULT_OG_IMAGE = "/images/webequate-og.jpg";
const TWITTER_HANDLE  = "@WebEquate";
```

### Static page metadata

Simple pages (`/about`, `/contact`, `/services`, `/projects`) declare metadata inline as a `const metadata: Metadata` export rather than using `generateSeoMetadata`. Either approach is fine — use `generateSeoMetadata` when you need canonical URLs, absolute OG images, or custom robots settings.

### Sitemap

`next-sitemap.config.js` generates sitemap and robots.txt. `/featured` and `/featured/**` are explicitly excluded so featured-only project pages don't appear in the sitemap.

---

## Theming

Dark mode is class-based (set on `<html>`). `next-themes` manages persistence to `localStorage` and hydration safety.

**Custom Tailwind palette** (blue accent — distinct from orange used in sibling projects):

| Token | Value | Usage |
|---|---|---|
| `light-1` | `#f5f5f5` | Background (light mode body, card surfaces) |
| `light-2` | `#a3a3a3` | Secondary text (light mode) |
| `light-3` | `#404040` | Borders and subtle UI (light mode) |
| `dark-1` | `#262626` | Surface (dark mode) |
| `dark-2` | `#525252` | Secondary text (dark mode) |
| `dark-3` | `#d4d4d4` | Borders and subtle UI (dark mode) |
| `accent-light` | `#6699ff` | Links and highlights (light mode) |
| `accent-dark` | `#3366cc` | Links and highlights (dark mode) |

Use `dark:` prefix variants for dark-mode styles. The `ThemeSwitcher` component guards its render with a `mounted` check to avoid hydration mismatches.

**Typography:** Russo One (loaded via `next/font/google` in `app/layout.tsx`) is the display font, exposed as the CSS variable `--font-russo-one` and applied as a class on `<html>`. Standard body text uses the Tailwind sans stack.

---

## Coding conventions

### Imports

All imports use the `@/` alias (maps to project root). No relative imports except inside the same component file.

```ts
import basics from "@/data/basics.json";
import type { Project } from "@/types/project";
import Header from "@/components/Header";
import { generateSeoMetadata } from "@/lib/seo";
```

### Server vs client components

The default is server component. Add `"use client"` only when the component needs browser APIs, event handlers, or React hooks. Currently client components: `Footer`, `Header`, `PageTransition`, `ProjectDetailClient`, `ContactForm`, `ThemeSwitcher`, `providers.tsx`.

### TypeScript

- Strict mode is on. Avoid `any` — the ESLint config allows it only in `**/api/**/*.ts` files.
- Type data shapes in `types/` (matching JSON structure). Put component prop interfaces inline at the top of the file; use `interfaces/` only for types shared across multiple files.
- `params` in dynamic routes must be typed as `Promise<{ id: string }>` and awaited — this is the React 19 / Next.js 16 async params pattern.

### Data filtering and sorting

Never render raw JSON arrays. Always filter by status flags and sort by order fields:

```ts
// Active projects for /projects page
const projects = projectsData
  .filter((p) => p.status?.active)
  .sort((a, b) => (a.status?.activeOrder ?? 0) - (b.status?.activeOrder ?? 0));

// Featured projects for home page
const featured = projectsData
  .filter((p) => p.status?.featured)
  .sort((a, b) => (a.status?.featuredOrder ?? 0) - (b.status?.featuredOrder ?? 0));
```

Services follow the same pattern using `status.active`/`status.activeOrder` and `status.featured`/`status.featuredOrder`.

### Styling

- Tailwind utility classes only — no CSS modules, no inline style objects.
- Dark mode via `dark:` prefix on every element that needs it.
- Animation classes (`.fade-up`, `.page-transition`, `.scrollToTop`) are defined in `globals.css` — use them via `className`; don't recreate the keyframes inline.
- Nav class hierarchy: `.nav-primary` (desktop header), `.nav-secondary` (footer), `.nav-mobile` (hamburger drawer).
- Gradient utility classes: `.text-gradient-dark` / `.text-gradient-light`, `.bg-gradient-dark` / `.bg-gradient-light`.

### Forms

- All form state lives in the `ContactForm` client component via `useState`.
- Submit handler POSTs JSON to `/api/send-email`, reads `{ success, message }` response.
- Always include the honeypot `website` field (hidden via CSS, not `type="hidden"`).
- Reset form fields on successful submission.
- Show loading state on the submit button during the request.

### Email API route

Server-side validation mirrors client validation. The route (`app/api/send-email/route.ts`):

1. Rejects requests with a filled honeypot field silently (returns success to confuse bots).
2. Validates all required fields and email format.
3. Escapes HTML in all user-supplied strings before embedding in the HTML email body.
4. Sends a branded dark-themed HTML email and a plain-text fallback.
5. On error in development, returns a 500 with the error message; in production, returns a generic message.

The route is `export const runtime = "nodejs"` and `export const dynamic = "force-dynamic"`.

### Project detail pages

Project detail is split across two files:

- `app/projects/[id]/page.tsx` (server) — handles `generateStaticParams`, `generateMetadata`, prev/next index lookup, `notFound()` on invalid ID.
- `components/ProjectDetailClient.tsx` (client) — handles the swipe gesture listener, router navigation, and renders `Header`, `ProjectHeader`, image, `ProjectFooter`, `Footer`.

Swipe navigation is mobile-only: the `isMobile` state gates the `onSwipedLeft`/`onSwipedRight` handlers so desktop trackpad swipes don't trigger page navigation.

### Service icons

`ServiceGrid` imports the entire `react-icons/fa` namespace and looks up icon components by the string key stored in the JSON. The icon name in `data/services.json` must match a named export from `react-icons/fa` exactly (e.g., `"FaCode"`, `"FaChartBar"`). If a key doesn't match, `ServiceGrid` renders a red error placeholder.

### Animations

- Page transitions: wrap page content in `<PageTransition>`.
- Staggered element entrances: add `fade-up` class with `style={{ animationDelay: '0.05s' }}`.
- Scroll-to-top button: use the `useScrollToTop` hook (returns ready-to-render JSX; consumed in root layout).

### SEO / metadata

Every route exports `metadata` or `generateMetadata`. Required fields for static pages:

```ts
export const metadata: Metadata = {
  title: "Page Title | WebEquate",
  description: "...",
  openGraph: { title, description, url: "https://webequate.com/route" },
  twitter: { title, description },
};
```

For dynamic routes, always use `generateSeoMetadata()` from `lib/seo.ts` — it handles canonical, absolute OG image URLs, Twitter cards, and the robots field in one call.

---

## Component reference

| Component | Client? | Props | Notes |
|---|---|---|---|
| `Header` | Yes | `socialLink: SocialLink` | Passes first social link to `SocialButton`; active-link detection via `usePathname` |
| `Footer` | Yes | `name: string, socialLinks: SocialLink[]` | Active-link detection; hidden on mobile (`.hidden.sm:flex`) |
| `Layout` | No | `children` | `<main>` wrapper with border, padding; used in root layout |
| `PageTransition` | Yes | `children` | Re-mounts on route change via `key={pathname}`; applies `.page-transition` class |
| `ProjectDetailClient` | Yes | `name, socialLinks, project, prevProject, nextProject, path` | `path` must be `"projects"` or `"featured"` — used to build navigation URLs |
| `ProjectGrid` | No | `projects: Project[], path: string` | `path` controls link target (`/projects/{id}` vs `/featured/{id}`) |
| `ServiceGrid` | No | `services: Service[]` | Dynamic icon lookup from `react-icons/fa`; falls back to error span on unknown key |
| `ProjectHeader` | No | `title, prevId?, nextId?, path` | Renders invisible placeholders when prev/next are null to preserve layout |
| `ProjectFooter` | No | `description, tags, details?, link?, path?, mobile?, tablet?, laptop?, desktop?` | All screenshot props are optional |
| `ContactForm` | Yes | — | Self-contained; reads no external props |
| `ContactDetails` | No | `name?, contactIntro?, location?, phone?, email?, website?` | All props optional; skips rows that are undefined |
| `AboutContent` | No | `aboutIntro: string, aboutItems: string[]` | `aboutIntro` renders as an `<h1>` |
| `AboutDetails` | No | `name, location, phone, website` | Props are declared but prefixed `_` — only renders the founder photo |
| `WebEquateLogo` | No | `className?` | Inline SVG; default class sizes it responsively |
| `AllenJohnson` | No | — | Inline SVG text; renders "ALLEN JOHNSON" in Russo One |
| `ThemeSwitcher` | Yes | — | Guards render with `mounted` state to prevent hydration mismatch |
| `SocialButton` | No | `name: string, url: string` | Supports: github, linkedin, twitter, facebook, instagram, youtube |
| `Heading` | No | `text: string` | Renders `<h2>` with `.text-gradient-dark dark:text-gradient-light` |
| `HomeButton` | No | — | **Unused** — not imported by any page or component |
| `TagLink` | No | `name: string` | Renders `<Link href="#">` (link target is a placeholder) |
| `ExternalLink` | No | `name: string, url: string` | Opens in new tab; external link icon from `react-icons/fi` |
| `ScreenshotLink` | No | `name, path, url` | Device icon determined by `name` value |
| `FormInput` | No | `inputLabel, labelFor, inputType, inputId, inputName, placeholderText, ariaLabelName, onChange, value` | |
| `Hamburger` | No | `showMenu: boolean, toggleMenu: VoidFunction` | |
| `Copyright` | No | `name: string` | Dynamic year via `new Date().getFullYear()` |
| `Social` | No | `socialLinks: SocialLink[]` | Renders a row of `SocialButton` components |

---

## Hooks

### `hooks/useScrollToTop.tsx`

Returns JSX for a floating scroll-to-top button. Shows after the user scrolls 400px. Apply to the root layout to make it available on all pages.

### `hooks/useThemeSwitcher.tsx`

Returns `[activeTheme: string, setTheme: Dispatch]`. Manages theme state in `localStorage` and toggles a class on the document root. This is a lower-level hook; prefer using `next-themes` via `ThemeSwitcher` component for normal use.

---

## Commands

```bash
npm run dev            # dev server on port 5555 (Turbopack)
npm run build          # production build
npm run lint           # eslint . (ESLint v9 flat config)
npm run format         # prettier --write on all source files
npm run build:sitemap  # next-sitemap + custom sort script
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.
- Do not use relative imports — use the `@/` alias.
- Do not render `projectsData` or `servicesData` arrays directly — always filter by `status.active` or `status.featured` and sort by the corresponding order field.
- Do not put secrets in `NEXT_PUBLIC_*` environment variables — they are embedded in the client bundle.
- Do not import `.svg` files as React components — SVGR is not configured. Inline SVGs as TSX (see `WebEquateLogo.tsx` for the pattern).
- Do not add new service icons without verifying the string name is a valid `react-icons/fa` export — `ServiceGrid` has no build-time check.
- Do not use Framer Motion for new animations — use the existing CSS animation classes in `globals.css`.

---

## Upgrade history (condensed)

The following changes were made to reach the current state from a Next.js 15 / Node 22 baseline:

1. **Next.js 16 + Turbopack** — removed webpack SVG loader and `@svgr/webpack`, added `turbopack.resolveExtensions`, inlined `logo-webequate.svg` as JSX in `WebEquateLogo.tsx`, set `jsx: react-jsx`.
2. **ESLint v9 flat config** — deleted `.eslintrc.json`, created `eslint.config.mjs`, changed lint script from `next lint` to `eslint .`; added `public/**` and `next-env.d.ts` to ignores.
3. **Security audit pass** — `nodemailer` 6→8, various ReDoS/injection fixes.
4. **Dependency refresh** — all packages to current stable; `@typescript-eslint` parser + plugin added; `react`/`react-dom` to 19.2.5, `sharp` to 0.34.5, `postcss` to 8.5.10.
5. **Dead code removal** — removed duplicate `switch` case in `TagLink`, unused `Link` import in `ProjectFooter`, unused `catch` binding in `ContactForm`, unused destructured props prefixed with `_` in `AboutDetails` and `route.ts`.
6. **tsconfig cleanup** — target `es5`→`es2022`, `moduleResolution: node`→`bundler`, `jsx: preserve`→`react-jsx`, expanded include/exclude paths.
7. **Node.js 24 LTS** — `.nvmrc`, `vercel.json`, `engines` all updated.
