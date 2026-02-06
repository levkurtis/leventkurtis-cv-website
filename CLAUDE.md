# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
npm start        # Serve production build
```

No test framework is configured.

## Architecture

Next.js 14 App Router personal website/life hub. TypeScript strict mode. Tailwind CSS v4 (via `@tailwindcss/postcss` plugin). Deployed on Vercel with auto-deploy from GitHub.

### Content System

Goals and projects are markdown files with YAML frontmatter in `/content/goals/` and `/content/projects/`. Data loaders in `lib/goals.ts` and `lib/projects.ts` use `gray-matter` to parse frontmatter and `fs` to read files at build time. Markdown body is rendered client-side with `react-markdown` + `remark-gfm`.

**Goal frontmatter fields:** title, description, category (`focus`|`career`|`life`), status (`Not Started`|`In Progress`|`Complete`), date, priority, tags, targetDate, completedDate, link, projectSlugs.

**Project frontmatter fields:** title, description, status (`Done`|`Ongoing`|`Pending`|`Paused`|`Cancelled`), date, tags, coverImage.

### Server vs Client Split

Pages are server components that handle metadata and data loading. Interactive UI lives in client components (`ProjectsClient`, `GoalsClient`, `Photography`, `ThemeToggle`). Filtering and expansion are client-side with `useMemo`.

### Theme System

Light/dark mode via React Context (`lib/theme-context.tsx`) with CSS custom properties defined in `app/globals.css`. Persists to localStorage, falls back to `prefers-color-scheme`.

### Photography

Albums in `public/photography-portfolio/{album-name}/`. Album pages at `app/photography/[album]/page.tsx`. Uses `Lightbox` component for modal image viewing.

### SEO

Metadata in layouts, JSON-LD structured data (`JsonLd` component), `robots.ts`, and `sitemap.ts`. Open Graph and Twitter card meta tags configured.

### Path Alias

`@/*` maps to project root (tsconfig paths).
