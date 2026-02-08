<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white" />
</p>

<h1 align="center">Castronix Portfolio</h1>

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
- **Browser-based training** — Add new AI responses via keyword commands
- **Email notifications** — Unanswered questions trigger alerts via Supabase

### Flat CV (`/cv/index.html`)
- **ATS-friendly format** — Traditional layout for job applications
- **Print-optimized** — A4 page breaks, proper margins
- **Content automation** — Natural language commands for edits
- **Self-validation** — Scores content against best practices

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
├── index.html              # Portfolio landing page
├── resume/
│   └── index.html          # Digital resume with AI chat
├── cv/
│   └── index.html          # Traditional flat CV
├── assets/
│   ├── images/             # Project screenshots
│   └── workflow-diagram.png
├── data/
│   ├── projects.json       # Shared project data
│   └── projects-loader.js  # Dynamic loader
├── docs/
│   ├── PROJECT-STATUS.md   # 9-step workflow tracking
│   ├── PORTFOLIO-FEATURES.md
│   └── Design/             # PRD and architecture docs
└── scripts/
    └── sync-projects.js    # Project sync utility
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
- [x] Flat CV with content automation
- [x] Shared projects.json data system
- [x] GitHub stats integration
- [x] 9-step workflow section
- [ ] Custom domain (castronix.dev)
- [ ] Dark/light theme toggle
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

| Project | Description | Status |
|---------|-------------|--------|
| [REPPIT](https://github.com/ArunCastro/reppit) | Fitness tracking app (Flutter) | Launching |
| [NoteApp](https://github.com/ArunCastro/noteApp) | Rich text note-taking (Next.js) | Live |
| PRIMMO | AI fitness coach | In Progress |

---

## License

MIT

---

<p align="center">
  <sub>Built by <a href="https://github.com/ArunCastro">Arun Castro</a> • Powered by AI-assisted development</sub>
</p>
