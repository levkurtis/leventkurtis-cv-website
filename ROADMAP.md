# Roadmap

## Current Version: 1.0 ✓

- [x] Single-page CV website
- [x] Dark theme with deep blue accents
- [x] Sections: Hero, About, Experience, Skills, Certifications, Education
- [x] Responsive design
- [x] PDF download
- [x] Vercel deployment with GitHub auto-deploy
- [x] Custom domain (leventkurtis.com)

---

## Version 2.0 - Personal Life Hub

**Vision**: Transform from a CV website into a personal hub - a living document that showcases career, projects, hobbies, and life goals.

### Phase 1 - Visual Polish

- [ ] **Larger Profile Photo** - Current size too small, increase significantly
- [ ] **Background Gradient** - Subtle circular gradient in hero (deep blue, not too strong)
- [ ] **Larger Fonts** - Improve readability across the site
- [ ] **Merge Internal Initiatives** - Move into main Accenture section (keep collapsible)

### Phase 2 - New Sections

- [ ] **Projects Section** - Showcase meaningful work beyond job duties
  - Project title & description
  - Tech stack / skills used
  - Outcomes / impact
  - Links (GitHub, live demo, etc.)

- [ ] **Photography Gallery** - Display photography hobby
  - Photo gallery or featured shots
  - Shows personality beyond professional life

- [ ] **Scroll-based Background Darkening**
  - Background starts at current color (#21212f)
  - Gradually darkens as user scrolls
  - Very dark at the footer - creates depth and visual journey

### Phase 3 - Progress Tracking & Goals

- [ ] **Certification Progress Tracking**
  - Show in-progress certifications alongside completed
  - Progress indicator (e.g., "40% complete")
  - Grayed out / different styling for incomplete
  - Visual progress bar

- [ ] **Goals & Life Tracking**
  - "Currently working on" section
  - Career goals with progress
  - Update-able content about life
  - Reading list / learning journey

---

## Future Ideas

- [ ] **Contact Form** - Let visitors reach out without exposing email
- [ ] **Blog/Insights Section** - Share thoughts on Data & AI, consulting, career
- [ ] **SEO Improvements** - Structured data, sitemap, Open Graph images
- [ ] **Theme Toggle** - Light/dark mode switch
- [ ] **Animations** - Subtle entrance animations on scroll
- [ ] **Analytics** - Vercel Analytics or Plausible
- [ ] **Multi-language Support** - Danish/English toggle
- [ ] **Testimonials** - Quotes from colleagues or managers

---

## Technical Improvements

- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Lighthouse score optimization (aim for 100)
- [ ] Image optimization (next/image, lazy loading for gallery)
- [ ] Add loading states and error boundaries

---

## Files to Modify for v2.0

| File | Changes |
|------|---------|
| `components/Hero.tsx` | Larger photo, gradient background |
| `app/globals.css` | Gradient styles, larger fonts, scroll-darkening |
| `components/Experience.tsx` | Merge Internal Initiatives into Accenture |
| `components/Certifications.tsx` | Add progress tracking |
| `components/Projects.tsx` | NEW - Projects section |
| `components/Photography.tsx` | NEW - Photo gallery |
| `app/page.tsx` | Add new sections |

---

## How to Continue

When working with Claude Code on this project:
1. Say "let's work on the roadmap" or "implement Phase 1"
2. Reference specific items you want to tackle
3. Check off completed items with `[x]`
