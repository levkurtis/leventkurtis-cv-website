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

### Phase 1 - Visual Polish ✓

- [x] **Larger Profile Photo** - Increased from w-32 to w-44/w-52
- [x] **Background Gradient** - Subtle circular gradient in hero (deep blue)
- [x] **Larger Fonts** - Base font 17px mobile, 18px desktop
- [x] **Merge Internal Initiatives** - Now collapsible within Accenture section

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

### UX & Visual Enhancements
- [ ] **Light/Dark Theme Toggle** - Switch between light and dark mode
- [ ] **Scroll Animations** - Subtle entrance animations on scroll (Framer Motion)
- [ ] **Interactive Skills Visualization** - Charts or graphs showing proficiency levels
- [ ] **Career Timeline View** - Visual timeline as alternative to list view

### Features
- [ ] **Contact Form** - Let visitors reach out without exposing email
- [ ] **Blog/Insights Section** - Share thoughts on Data & AI, consulting, career
- [ ] **Multi-language Support** - Danish/English toggle
- [ ] **Testimonials** - Quotes from colleagues or managers

### SEO & Analytics
- [ ] **SEO Improvements** - Structured data (JSON-LD), sitemap, Open Graph images
- [ ] **Analytics** - Vercel Analytics or Plausible (privacy-friendly)

---

## Technical Improvements

- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **Lighthouse Optimization** - Aim for 100 across all categories
- [ ] **TypeScript Improvements** - Proper types throughout, strict mode
- [ ] **Image Optimization** - next/image with proper sizing, lazy loading
- [ ] **Loading States** - Add loading states and error boundaries
- [ ] **Code Quality** - ESLint rules, consistent patterns

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
