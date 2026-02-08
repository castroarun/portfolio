<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
</p>

<h1 align="center">Digital Resume</h1>

<h3 align="center">
  A three-part portfolio suite. <em>Portfolio. Digital Resume. Traditional CV.</em>
</h3>

<p align="center">
  Showcasing 17+ years of enterprise architecture experience through an interactive, AI-enhanced digital presence.<br />
  Built with vanilla JS, no frameworks — just clean code.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#live-demo">Live Demo</a> •
  <a href="#the-suite">The Suite</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a>
</p>

<!-- LAUNCHPAD:START -->
```json
{
  "stage": "live",
  "progress": 100,
  "complexity": "F",
  "lastUpdated": "2026-02-08",
  "targetDate": null,
  "nextAction": "Add new projects as they ship",
  "blocker": null,
  "demoUrl": "https://castroarun.github.io/portfolio/",
  "techStack": ["HTML5", "CSS3", "JavaScript", "Chart.js"],
  "shipped": true,
  "linkedinPosted": true
}
```
<!-- LAUNCHPAD:END -->

---

## Features

### Portfolio Page (`/index.html`)
- **Brittany Chiang inspired design** — Dark theme, cursor spotlight effect
- **Project showcase** — Featured projects with tech stack tags
- **Engineering principles** — "Instead of / We do" contrast cards
- **9-Step workflow section** — TOGAF-inspired methodology

### Digital Resume (`/resume/index.html`)
- **AI Chat Assistant** — 60+ pre-trained responses for recruiter questions
- **Live GitHub stats** — Contribution heatmap, repository cards
- **Interactive skills** — Filterable progress bars, radar chart
- **Professional timeline** — Career journey with milestone photos
- **Domain expertise** — Banking domain cards with depth indicators
- **Innovation Lab** — Project cards loaded from `data/projects.json`
- **LinkedIn Feed** — Interactive accordion with expandable posts
- **Email notifications** — Unanswered questions trigger alerts via Supabase

### Traditional CV (`/cv/index.html`)
- **ATS-friendly format** — Traditional layout for job applications
- **Print-optimized** — A4 page breaks, tightened margins for clean page flow
- **Dark/Light theme** — Toggle between themes, auto-switches to light for print
- **Dynamic projects** — Side projects loaded from shared `data/projects.json`

---

## Live Demo

| Component | URL |
|-----------|-----|
| Portfolio | [castroarun.github.io/portfolio](https://castroarun.github.io/portfolio/) |
| Digital Resume | [castroarun.github.io/portfolio/resume](https://castroarun.github.io/portfolio/resume/) |
| Flat CV | [castroarun.github.io/portfolio/cv](https://castroarun.github.io/portfolio/cv/) |

---

## The Suite

```
┌─────────────────────────────────────────────────────────────┐
│                     PORTFOLIO SUITE                          │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Portfolio Page │  Digital Resume │       Flat CV           │
│  (First Look)   │  (Deep Dive)    │   (ATS Submission)      │
├─────────────────┼─────────────────┼─────────────────────────┤
│ • Visual appeal │ • AI Assistant  │ • Traditional format    │
│ • Project cards │ • GitHub stats  │ • Print-ready           │
│ • Principles    │ • Code samples  │ • Content automation    │
│ • Contact form  │ • Skills chart  │ • Self-validation       │
└─────────────────┴─────────────────┴─────────────────────────┘
                           │
                    data/projects.json
                   (Single source of truth)
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 / CSS3 / JS | Core stack — no frameworks |
| [Chart.js](https://www.chartjs.org/) | Skills radar chart |
| [Prism.js](https://prismjs.com/) | Code syntax highlighting |
| [Lucide Icons](https://lucide.dev/) | SVG icon set |
| [GitHub Pages](https://pages.github.com/) | Hosting |
| [Supabase](https://supabase.com/) | Edge functions for email alerts |

---

## Project Structure

```
castronix-portfolio/
├── .project.json             # Project metadata (auto-sync)
├── index.html                # Portfolio landing page
├── resume/
│   └── index.html            # Digital resume with AI chat
├── cv/
│   └── index.html            # Traditional CV (print-optimized)
├── assets/
│   ├── images/               # Site images
│   └── projects/             # Project screenshots (auto-copied by sync)
├── data/
│   ├── projects.json         # Single source of truth for all projects
│   └── projects-loader.js    # Dynamic loader for resume & CV
├── docs/
│   ├── PROJECT-STATUS.md     # 9-step workflow tracking
│   ├── Design/               # PRD and architecture docs
│   └── mockups/              # Section mockups (LinkedIn feed, etc.)
└── scripts/
    └── sync-projects.js      # Syncs .project.json from all repos
```

---

## Screenshots

| Portfolio | Digital Resume | Flat CV |
|-----------|----------------|---------|
| ![Portfolio](assets/images/portfolio-screenshot.png) | ![Resume](assets/images/resume-screenshot.png) | ![CV](assets/images/cv-screenshot.png) |

> Screenshots coming soon

---

## Roadmap

- [x] Portfolio page with Brittany Chiang design
- [x] Digital resume with AI chat assistant
- [x] Traditional CV with print optimization
- [x] Shared projects.json data system
- [x] GitHub stats integration
- [x] 9-step workflow section
- [x] Dark/light theme toggle (CV)
- [x] Domain expertise cards
- [x] LinkedIn feed accordion
- [x] Centralized project sync (`scripts/sync-projects.js`)
- [ ] Custom domain (castronix.dev)
- [ ] Project filtering by tech stack

---

## Development

```bash
# Clone the repository
git clone https://github.com/castroarun/portfolio.git

# Navigate to project
cd portfolio

# Serve locally (any static server)
npx serve -l 3000

# Open in browser
http://localhost:3000
```

---

## Related Projects

| Project | Description | Tech | Status |
|---------|-------------|------|--------|
| [REPPIT](https://github.com/ArunCastro/reppit) | Fitness strength tracking | Flutter, Dart | Live |
| [NoteApp](https://github.com/ArunCastro/noteApp) | Rich text note-taking | Next.js, TypeScript | Live |
| [Klarity](https://github.com/ArunCastro/klarity) | Developer task board with 15-stage pipeline | Next.js, Zustand, Supabase | Live |
| [Orbit](https://github.com/ArunCastro/orbit) | Phone companion for Klarity | React Native, GitHub API | Live |
| [AnyCalc](https://github.com/ArunCastro/anycalc) | 19 interlinked financial calculators | Flutter, Dart | Live |
| [PRIMMO](https://github.com/ArunCastro/PRIMMO) | AI-powered personal strength coach | Next.js, Voice AI, Supabase | Crafting |
| Cinder | AI-assisted original music | Udio, Music Production | Live |
| The Little Red Dot | AI-assisted original music | Udio, Music Production | Live |

---

## License

MIT

---

<p align="center">
  <sub>Built by <a href="https://github.com/ArunCastro">Arun Castro</a> • Powered by AI-assisted development</sub>
</p>
