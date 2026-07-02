# Plan: wjzhan-dev Personal Website

## Context

A minimal, Apple-inspired personal website hosted on GitHub Pages. Built with Next.js + Tailwind CSS v4. Serves as a portfolio, technical notebook, and comeback story — showcasing projects, writings, tools, and an interactive family sandbox.

## Tech Stack

- **Next.js 16** (App Router) + **Tailwind CSS v4** + TypeScript
- Static export (`output: "export"`, `trailingSlash: true`) for GitHub Pages
- **Shiki** — build-time syntax highlighting (zero client JS)
- **Framer Motion** — drag interactions, animations
- **Geist** font via `next/font/google`
- **shadcn/ui** pattern — Badge, Button (cva variants, Radix primitives)
- **lucide-react** — icons
- **@radix-ui/react-tabs** — tabbed components

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Now | Hero + 3-tab Feature108: Current Project, Current Reading, Quick Thought |
| `/lab/` | Lab | Changelog1 timeline — experiments & prototypes |
| `/lab/[slug]/` | Lab Detail | Literate Python viewer (Shiki-highlighted) |
| `/builds/` | Builds | Changelog1 timeline — production tools |
| `/builds/[slug]/` | Build Detail | Literate Python viewer |
| `/thoughts/` | Thoughts | Vertical list — essays & reflections |
| `/thoughts/[slug]/` | Thought Detail | Literate Python viewer |
| `/tools/` | Tools | 2-tab Feature108: Claude Code / LLM |
| `/tools/[slug]/` | Tool Detail | Literate Python viewer |
| `/about/` | About Me | Bio, expertise, contact cards, Family Sandbox |

## Current Visual Design

### Now Page (`/`)
- Centered hero: "Learn. Build. Share." + subtitle "From Data Science to AI — building in public."
- Feature108 component with 3 tabs (no icons): Current Project, Current Reading, Quick Thought
- Tab content dynamically synced from data files — latest project from Lab+Builds, latest thought from Thoughts
- Tab labels: single-line on mobile, responsive sizing (`text-sm sm:text-lg`)

### Lab & Builds Pages
- Changelog1 timeline layout — sticky left-column badges showing `archive_status` from `.py` files
- Description pulled from `.py` docstring via `getFirstParagraph()`
- Images loaded from `public/scripts/{category}/{slug}/image.jpg`

### Tools Page
- Feature108 with 2 tabs (no icons): Claude Code / LLM
- Images loaded from `public/scripts/Tools/{slug}/image.jpg`

### About Me Page
- Previously/Currently/Future timeline as first paragraph
- Professional bio — 7 years at TALROO, data-to-revenue ML
- Career break story — two kids, preparing return
- Expertise grid — ML, NLP, Big Data, Languages, Deployment, Statistics
- Contact cards — Email, GitHub, LinkedIn (3-col grid, sky-blue icons)
- The Family Sandbox V1.0.0 — 1D interactive retro arcade game

### Detail Pages (Literate Viewer)
- `.py` files read at build time, parsed into blocks:
  - `text("...")` → prose (headers, paragraphs, lists, bold)
  - `image("url")` → embedded images
  - `link("url")` → clickable links
  - Code blocks → Shiki-highlighted HTML (github-light/github-dark dual theme)
- Minimal academic-lecture styling — no cards, no shadows, clean typography
- Zero client JS for highlighting — all done at build time

## File Structure

```
wj_blog/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages on push
├── public/
│   ├── .nojekyll
│   ├── avatars/avatar.jpeg        # Profile photo
│   └── scripts/                   # .py files + images (single source of truth)
│       ├── Lab/{slug}/
│       ├── Builds/{slug}/
│       ├── Thoughts/{slug}/
│       └── Tools/{slug}/
├── src/
│   ├── app/
│   │   ├── globals.css            # CSS variables, theme, resets, retro animations
│   │   ├── layout.tsx             # Root: Geist fonts, Nav, Footer, dark mode script
│   │   ├── page.tsx               # Now page (Feature108 tabs)
│   │   ├── lab/page.tsx           # Lab index (Changelog1)
│   │   ├── lab/[slug]/page.tsx    # Lab detail (LiterateViewer)
│   │   ├── builds/page.tsx        # Builds index (Changelog1)
│   │   ├── builds/[slug]/page.tsx # Build detail
│   │   ├── thoughts/page.tsx      # Thoughts index (ThoughtCard list)
│   │   ├── thoughts/[slug]/page.tsx
│   │   ├── tools/page.tsx         # Tools index (Feature108 tabs)
│   │   ├── tools/[slug]/page.tsx  # Tool detail
│   │   └── about/page.tsx         # About Me + Family Sandbox
│   ├── components/
│   │   ├── ui/
│   │   │   ├── badge.tsx          # shadcn Badge
│   │   │   ├── button.tsx         # shadcn Button
│   │   │   ├── feature108.tsx     # Tabbed showcase (Now + Tools)
│   │   │   └── changelog-1.tsx    # Timeline component (Lab + Builds)
│   │   ├── Nav.tsx                # Responsive: desktop links, mobile hamburger
│   │   ├── Footer.tsx             # "© 2026 wjzhan-dev"
│   │   ├── ThoughtCard.tsx        # Vertical list card
│   │   ├── PageHeader.tsx         # Page title + subtitle
│   │   ├── LiterateViewer.tsx     # Renders parsed .py blocks as rich HTML
│   │   └── RetroArcadeSandbox.tsx # 1D family fight game (About page)
│   ├── data/
│   │   ├── lab.ts, builds.ts, thoughts.ts, tools.ts, now.ts
│   └── lib/
│       ├── types.ts               # ContentItem interface
│       ├── content.ts             # getPythonContent, getLiterateBlocks, getFirstParagraph,
│       │                          # getProjectImage, getArchiveStatus, getLatest, getLatestAcross
│       ├── literate.ts            # parseLiterateRaw — .py → Block[]
│       └── utils.ts               # cn() helper (clsx + tailwind-merge)
├── next.config.ts                 # output: 'export', trailingSlash: true
└── package.json
```

## Key Design Decisions

### 1. Content Sync from .py Files
- `archive_status = "Deployed"` variable in `.py` → badge label on index pages
- First `"""..."""` docstring → card description on index pages
- `image.jpg` in project folder → card image
- Index pages dynamically build entries from data files + .py content at build time

### 2. Literate Python Rendering
- `parseLiterateRaw()` splits `.py` into prose/image/link/code blocks
- `getLiterateBlocks()` highlights code blocks via Shiki at build time
- `LiterateViewer` renders blocks as server component — zero client JS
- Prose: `#`, `##`, `###` headers, `- ` lists, `**bold**`

### 3. Utility Functions
- `getLatest(items)` — latest ContentItem by date
- `getLatestAcross(...arrays)` — latest across multiple arrays
- `getFirstParagraph(code)` — extracts docstring
- `getProjectImage(cat, slug)` — finds image in project folder
- `getArchiveStatus(cat, slug)` — reads `archive_status` from .py

### 4. Responsive Nav
- Desktop: horizontal link list
- Mobile: hamburger button (Menu/X icons), animated dropdown via Framer Motion

### 5. Retro Arcade Sandbox (About Page)
- 1D horizontal drag with Framer Motion (`drag="x"`)
- Two kids (base64-embedded PNGs) constrained to left/right halves
- Idle: step-bounce + pixel hearts flying between them
- Fighting: weapon emojis + CRT shake when close enough
- Base64 avatars — no public PNG files for kids' photos

### 6. GitHub Pages Auto-Deploy
- `.github/workflows/deploy.yml` — triggers on push to main
- Builds with `npm run build`, deploys `out/` via `peaceiris/actions-gh-pages`

## Deleted / Removed
- Prism.js (replaced by Shiki)
- CodeViewer.tsx (replaced by LiterateViewer)
- ProjectCard.tsx, ToolCard.tsx (replaced by Changelog1 / Feature108)
- ContactLinks.tsx (inlined into About page)
- Tailwind v3 `--tw-*` variables from globals.css
- copy-assets.js (scripts now live in public/scripts/)
