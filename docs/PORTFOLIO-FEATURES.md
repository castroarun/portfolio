# Portfolio Suite - Features & Presentation Guide

> **Author:** Arun Castro
> **Last Updated:** 2026-01-12

This document outlines the features and presentation of the three-part portfolio suite designed to showcase skills, experience, and projects to recruiters and potential employers.

---

## Overview

| Component | Purpose | URL |
|-----------|---------|-----|
| **Portfolio Page** | Main landing page - first impression, project showcase | `/index.html` |
| **Digital Resume** | Interactive, data-rich resume experience | `/resume/index.html` |
| **Flat CV** | Traditional, printable CV format | `/cv/index.html` |

---

## 1. Portfolio Page (`/index.html`)

### Purpose
The main landing page serves as the first impression for visitors. It showcases personality, projects, and provides navigation to detailed sections.

### Design Philosophy
- **Brittany Chiang inspired** - Clean, minimal, developer-focused aesthetic
- **Dark theme** - Professional, modern look (#0A0A0F base)
- **Cyan accent** (#22D3EE) - Consistent brand color throughout

### Key Features

#### Header & Navigation
- Fixed navigation bar with smooth scroll to sections
- Hamburger menu for mobile with slide-in animation
- Logo/name prominently displayed

#### Hero Section
- Bold introduction statement
- Animated typing effect or tagline
- Call-to-action buttons (View Projects, Contact)
- Background gradient orbs for visual depth

#### About Section
- Professional photo
- Brief bio highlighting:
  - 17+ years enterprise experience
  - AI-assisted development journey
  - Coder-first architect philosophy
- Link to detailed resume

#### Projects Showcase
- **Featured Projects** with alternating layout (image left/right)
- Project cards with:
  - Screenshot/mockup
  - Tech stack tags
  - Brief description
  - Links to live demo / GitHub
- **Current Projects:**
  1. REPPIT - Fitness tracking app (Flutter)
  2. NoteApp - Note-taking application (Next.js)
  3. PRIMMO - AI fitness coach (in development)
  4. This Portfolio - Showcasing the work
  5. Calci - Calculator app (in development)
  6. Cinder & The Little Red Dot - Spotify project

#### Engineering Principles Section
- "Instead of / We do" contrast cards
- Key principles:
  - Separation of Concerns
  - TDD (Test Driven Design)
  - Clean Code philosophy
  - 9-Step Workflow

#### Contact Section
- Contact form with EmailJS integration
- Social links (GitHub, LinkedIn, Email)
- Vertical email on right side (Brittany Chiang style)

### Interactive Elements
- Cursor glow spotlight effect (follows mouse)
- Scroll-triggered fade animations
- Grayscale-to-color image hover effects
- Grid background pattern

---

## 2. Digital Resume (`/resume/index.html`)

### Purpose
An interactive, data-rich resume that goes beyond traditional PDF resumes. Demonstrates technical skills through the medium itself.

### Design Philosophy
- **"Resume that codes itself"** - Interactive elements showcase development skills
- **Data-driven** - Live GitHub stats, dynamic content
- **Recruiter-friendly** - AI chat assistant answers common questions

### Key Features

#### Header
- Professional photo
- Name and title
- Contact information
- Quick action buttons (Download PDF, Contact)

#### GitHub Activity Section (Compact)
- **Profile Stats Row:**
  - Avatar
  - Total contributions
  - Public repos count
  - Pull requests
- **Mini Heatmap:**
  - 16-week contribution calendar
  - Color-coded activity levels
  - 11px cells for visibility
- **Public Repos Grid:**
  - Top 6 repos (filtered, pinned prioritized)
  - Pinned repos: PRIMMO, covered_calls, caclulate_anything
  - Excluded repos: any_calculator, buildfolio
  - Custom descriptions where needed

#### Professional Timeline
- Visual timeline with personal photos from key moments
- **Key Milestones:**
  - 2016: Best Short Film Award (South India Film Festival)
  - 2013-2015: Standard Bank - CMMI Level 5 contribution
  - 2016-2019: Entrepreneurial Sabbatical
  - 2019-Present: Bank of America - RTP Platform
  - Personal milestones (marriage, fitness journey)
- Expandable sections with multiple images per milestone

#### Skills Visualization
- **Radar Chart:** Competency overview across domains
- **Filterable Progress Bars:**
  - Categories: All, Architecture, Development, Data
  - Animated progress on scroll
- **Key Skills:**
  - Architecture & Design
  - Core Banking (CASA, Payments)
  - Python, Java, JavaScript
  - React, Next.js, Flutter
  - Oracle, PostgreSQL

#### Code Showcase
- **Three language tabs:** TypeScript, Python, SQL
- Syntax highlighting (Prism.js, Tomorrow theme)
- Copy-to-clipboard functionality
- Real code examples from actual projects

#### Certifications Section
- TOGAF 9.2 Certified
- CSPO (Certified Scrum Product Owner)
- Visual badge display

#### AI Chat Assistant
- **Floating chat widget** in bottom-right corner
- **Pre-built knowledge base** covering 60+ recruiter questions:
  - Personal & Background
  - Experience & Skills
  - Projects & Achievements
  - Work Style & Culture
  - Career Goals
  - Education & Certifications
- **Suggested question chips** for quick queries
- **Typing indicator** for realistic feel
- **Contact button** fallback for unknown questions

### AI Assistant Topics Covered
| Category | Example Questions |
|----------|-------------------|
| About | Tell me about yourself, Who are you? |
| Experience | Years of experience, Current role |
| Visa | Relocation, Work permit, Sponsorship |
| Workflow | 9-step process, Development methodology |
| Testing | TDD, Testing philosophy |
| Code Quality | Clean code, Best practices |
| Goals | Career direction, 5-year plan |
| AI Learning | Claude, Copilot, AI-assisted development |
| Cloud | Microservices, Deployment patterns |
| Sabbatical | Career break, Filmmaking, Why returned |
| Tech Stack | Languages, Frameworks, Tools |
| Agile | Scrum experience, Certifications |
| Projects | REPPIT, PRIMMO, NoteApp |
| Contact | Email, Call availability, Resume download |

---

## 3. Flat CV (`/cv/index.html`)

### Purpose
Traditional, ATS-friendly, printable CV format for formal applications and PDF downloads.

### Design Philosophy
- **Clean and scannable** - Easy for recruiters to skim
- **Print-optimized** - Proper page breaks, margins
- **ATS-compatible** - Standard formatting, no complex layouts

### Key Features

#### Header
- Name and contact information
- LinkedIn and GitHub links
- Professional title

#### Professional Summary
- 3-4 line executive summary
- Key highlights:
  - 17+ years enterprise technology consulting
  - Core banking and payments expertise
  - AI-assisted development advocate

#### Experience Section
- Reverse chronological order
- **Format per role:**
  - Company, Location, Duration
  - Role title
  - Key achievements (bullet points)
  - Technologies used

#### Key Positions
1. **Infosys (Bank of America)** - 2019-Present
   - Sr. Technology Architect
   - RTP Platform, Application Engineering

2. **Infosys (Emirates NBD)** - 2019
   - Technology Architect
   - CASA Transformation

3. **Infosys (Multiple Banks)** - 2015-2016
   - Technology Architect
   - Core Banking implementations

4. **EdgeVerve (Standard Bank)** - 2013-2015
   - Technology Architect
   - CMMI Level 5 achievement

#### Skills Section
- **Core Languages:** Python, PL/SQL, Java, JavaScript
- **Learning (AI-Assisted):** TypeScript, React, Next.js, Flutter
- **Databases:** Oracle, PostgreSQL, SQL Server
- **Architecture:** Microservices, Event-driven, Cloud-native patterns

#### Education & Certifications
- Degree information
- TOGAF 9.2 Certified
- CSPO Certified

#### Projects Section
- Links to live projects
- Brief descriptions
- Tech stack used

### Print Styles
- A4 page optimization
- Proper margins (15mm)
- Page break handling
- Hidden interactive elements in print

---

## Shared Data Architecture

### `data/projects.json`
Single source of truth for project information:
```json
{
  "projects": [
    {
      "id": "reppit",
      "name": "REPPIT",
      "description": "Fitness tracking app",
      "status": "live",
      "techStack": ["Flutter", "Dart", "Firebase"],
      "links": { "github": "...", "live": "..." }
    }
  ]
}
```

### Consistency Across Pages
- Same project data displayed in all three views
- Consistent color scheme and branding
- Shared CSS variables for theme

---

## Presentation Tips for Recruiters

### Portfolio Page
- **First 5 seconds matter** - Hero section captures attention
- **Projects speak louder** - Let the work demonstrate skills
- **Easy navigation** - Clear path to resume and contact

### Digital Resume
- **Interactive demo** - Show, don't just tell
- **AI assistant** - Answers questions 24/7
- **GitHub proof** - Real commits, real code

### Flat CV
- **ATS submission** - Use for job applications
- **Print for interviews** - Physical copy for in-person meetings
- **LinkedIn consistency** - Matches online profiles

---

## Technical Implementation

### Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Styling:** Custom CSS with CSS variables
- **Charts:** Chart.js (radar chart)
- **Syntax Highlighting:** Prism.js
- **Icons:** Lucide icons (SVG)
- **Fonts:** Inter Tight, JetBrains Mono
- **Hosting:** GitHub Pages

### Performance Optimizations
- Lazy loading for images
- Minified CSS/JS in production
- Optimized image sizes
- Preloaded critical resources

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus states for interactive elements
- Color contrast compliance

---

## Future Enhancements

1. **Dark/Light mode toggle** - User preference
2. **Project filtering** - By tech stack, status
3. **Blog section** - Technical articles
4. **Analytics dashboard** - Visitor insights
5. **Multi-language support** - i18n ready

---

## Contact

**Arun Castro**
- Email: arun.castromin@gmail.com
- GitHub: github.com/ArunCastro
- LinkedIn: linkedin.com/in/aruncastro
- Portfolio: castronix.dev (coming soon)
