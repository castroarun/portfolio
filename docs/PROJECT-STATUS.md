# Castronix Portfolio - Project Status

> **Project:** Castronix Portfolio Website
> **Purpose:** Showcase projects, workflow, and engineering practices

**Last Updated:** 2026-01-11

---

## Quick Summary

**Goal:** Create a best-in-class portfolio website to showcase:
- REPPIT, NoteApp, PRIMMO and future projects
- 9-Step development workflow
- Engineering practices and principles

**Current Phase:** Design & Mockup

---

## Mockups

| Version | File | Description |
|---------|------|-------------|
| V1 | [v1-basic.html](mockups/v1-basic.html) | Initial Augen-style design |
| V2 | [v2-premium.html](mockups/v2-premium.html) | Best-in-class Linear-style design |
| V5 | [v5-combined.html](mockups/v5-combined.html) | Combined features, project cards |
| V6 | [v6-combined.html](mockups/v6-combined.html) | Carousel showcase, spotlight effect, mobile menu |
| V7 | [v7-principles.html](mockups/v7-principles.html) | Principles showcase experiments (5 approaches) |
| V8 | [v8-brittany.html](mockups/v8-brittany.html) | **LATEST** - Brittany Chiang style, alternating projects, vertical email |
| Resume (PDF) | [resume-pdf-email.html](mockups/resume-pdf-email.html) | Print-optimized 2-column resume |
| Resume (Digital) | [resume-digital.html](mockups/resume-digital.html) | **NEW** - Interactive digital resume with GitHub stats, skills viz, code showcase, AI chat |

### V8 Features (Latest - Brittany + V6/V7 Combined)
**Layout (Brittany Chiang style):**
- Alternating featured project layout (image left/right)
- Fixed vertical email on right side (rotated 90°)
- Fixed social links on left side
- Numbered section headings with extending line (01., 02., etc.)
- Mobile slide-in menu with backdrop

**Theme & Effects (V6 style):**
- V6 dark foundation (#0A0A0F) with cyan accent (#22D3EE)
- Cursor glow spotlight effect (follows mouse)
- Grid background pattern
- Gradient orbs (top-right, bottom-left)
- Inter Tight font family

**Sections (V7 style):**
- Engineering Principles section with contrast cards
- "Instead of / We do" pattern from V7
- Success/Error color scheme for visual contrast
- Link to V7 for full principles showcase

**Other Features:**
- Grayscale-to-color image hover effect
- Project cards with folder icon
- Fade-up scroll animations
- Accessibility-focused focus states (dashed cyan outline)

### V6 Features
- Project carousel with horizontal scroll
- Card popup effect (15% scale) with spotlight dimming
- Scroll indicator with pulse animation
- Mobile hamburger menu with animated X transition
- Split-view project showcase
- Waitlist modal with domain chips
- Section labels: "Featured Work", "All Projects"

### V7 Principles Showcase (Experimental)
Five creative approaches to present engineering principles:
1. **Contrast Cards** - "Instead of / We do" side-by-side comparison
2. **Visual Equations** - Icon math: Problem + Principle = Solution
3. **Real Examples** - Actual decisions from REPPIT, NoteApp, PRIMMO
4. **Flip + Contrast Cards** - Combined: flip to reveal "Instead of / We do" (recommended)
5. **One Metric** - Each principle gets one impactful number

### V2 Features (Premium Version)
- Cursor glow spotlight effect
- Glassmorphism cards with backdrop blur
- Scroll-triggered fade animations
- Animated stat counters
- Interactive project mockups
- Gradient orbs and grid background
- Easter egg interaction
- Linear-style thin borders and accents

### Digital Resume Features (NEW)
A "truly digital" resume that differentiates from traditional PDF resumes:

**1. GitHub Heatmap + Live Stats**
- Interactive contribution calendar (52 weeks)
- Animated stat cards (commits, repos, PRs, stars)
- Language distribution visualization
- Hover effects on heatmap cells

**2. Interactive Skills Visualization**
- Chart.js radar chart for competency overview
- Filterable skill progress bars (All/Architecture/Development/Data)
- Animated progress bars on scroll
- Categories: Architecture, Core Banking, Python, React, Java, Data Analytics

**3. Code Showcase**
- Three language tabs (TypeScript, Python, SQL)
- Prism.js syntax highlighting (Tomorrow theme)
- Copy-to-clipboard functionality
- Real code examples from actual projects:
  - TypeScript: `useOfflineSync` hook from NoteApp
  - Python: Data pipeline from Bank of America work
  - SQL: Reconciliation report from Emirates NBD

**4. AI Chat Assistant**
- Pre-built knowledge base about experience & projects
- Suggested questions as clickable chips
- Real-time typing indicator
- Responses cover: Core banking, React projects, Certifications, NoteApp details

**Design System:**
- Dark theme (#0A0A0F) matching V8 portfolio
- Cyan accent (#22D3EE) for consistency
- Grid background + gradient orbs
- Numbered sections (01., 02., etc.)
- JetBrains Mono for code, Inter for UI

See [DIGITAL-RESUME-DESIGN.md](Design/DIGITAL-RESUME-DESIGN.md) for full architecture.

### Resume Content Automation System (NEW - Completed)
A local AI-powered agent for editing resume content via natural language commands:

**Command Categories:**
- **CRUD Operations:** Add/update/delete skills, bullets, project tags, profile info
- **Layout:** Compact mode, hide/show sections
- **Theme:** Dark/light mode switching
- **Review:** Full resume scoring with industry best practices

**Local AI Review Agent (No External API):**
- **ATS Optimization Rules:** 97.4% Fortune 500 use ATS - checks compliance
- **Keyword Patterns:** 5 pillars (hard skills, soft skills, industry terms, achievement language, emerging tech)
- **Role-Specific Keywords:** Technology Architect, Principal Architect, Engineering Manager, etc.
- **100-Point Scoring:** ATS (30), Content Quality (35), Formatting (20), Role Relevance (15)

**ContentValidator (Enforces Standards During Edits):**
- Validates bullets: action verbs (30pts), metrics (40pts), impact (20pts), length (10pts)
- Auto-suggests improvements for low-scoring content
- Context-aware verb suggestions based on content
- ATS keyword validation for skills

**Example Commands:**
```
Add TypeScript at 85%
Update bullet 1 in Bank of America to: Led migration achieving 50% efficiency
Validate: responsible for managing the team
Review my resume for Principal Architect role
Switch to light mode
```

---

## Design Inspiration Sources

Based on research from:
- [Awwwards Portfolio Winners](https://www.awwwards.com/websites/portfolio/)
- [Muzli Top 100 Portfolios 2025](https://muz.li/blog/top-100-most-creative-and-unique-portfolio-websites-of-2025/)
- [Brittany Chiang](https://brittanychiang.com) - Cursor glow, accessibility focus
- [Linear.app](https://linear.app) - Dark theme, thin borders, Inter font
- [Frontend Horse - Linear Look](https://frontend.horse/articles/the-linear-look/)

---

## Current Project Status (9-Step Workflow)

| Step | Name | Status |
|------|------|--------|
| 1 | DEV-CLOCK | Not Started |
| 2 | PRD & Design | In Progress |
| 3 | Test Cases | Not Started |
| 4 | Build | Not Started |
| 5 | Manual Testing | Not Started |
| 6 | Debug & Feedback | Not Started |
| 7 | Code Walkthrough | Not Started |
| 8 | Ship | Not Started |
| 9 | Retrospective | Not Started |

---

## Next Actions

- [x] Resume Content Automation System with local AI agent (Completed 2026-01-06)
- [x] Train AI Chat Assistant with Recruiter Question Bank (Added 2026-01-11 - needs review)
- [ ] **Review & Correct AI Assistant Responses** - Go through each of the 33 new responses and verify/correct with actual answers (Personal preferences, motivations, work style, etc.)
- [ ] Add screenshots for remaining projects (Spotify Songs, Space Race ML, Backtest Pro)
- [ ] Finalize resume/index.html as production version
- [ ] Set up custom domain (castronix.dev) on GitHub Pages
- [ ] Add favicon and meta tags for SEO/social sharing

---

## Future Ideas (Backlog)

### Interactive TOGAF Architecture Diagram
Display the 9-step workflow as an interactive architecture diagram (inspired by TOGAF ADM cycle):
- Visual circular/flowchart representation of the workflow
- Each stage is clickable/hoverable
- Shows deliverables at each stage
- Links to actual artifacts (PRD, test cases, code)
- Git commit links for each phase
- Progress indicator showing current project stage

**Implementation notes:**
- Could be SVG-based for crisp rendering at any size
- Consider using D3.js or Framer Motion for animations
- Mobile: could transform to vertical timeline
- Each node could expand to show sub-deliverables

### Other Ideas
- Project timeline showing development history
- Live GitHub contribution graph
- Tech stack visualization with competency levels
- Before/after code comparisons for refactoring stories

---

## Tech Stack (Planned)

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel