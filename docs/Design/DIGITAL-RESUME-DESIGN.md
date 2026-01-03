# Truly Digital Resume - Design Document

> **Vision:** A resume that proves claims through live data, engages through interactivity, and differentiates through AI-powered experiences.

**Last Updated:** 2026-01-03

---

## The Problem with Traditional Resumes

| Traditional Resume | Digital Resume Solution |
|-------------------|------------------------|
| Static claims ("I know React") | **Live GitHub stats proving activity** |
| Same format as everyone | **Interactive, memorable experience** |
| Can't verify work quality | **Code showcase with actual examples** |
| One-way communication | **AI assistant for personalized Q&A** |
| Outdated by the time it's sent | **Real-time data, always current** |

---

## Feature Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRULY DIGITAL RESUME                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │ GITHUB HEATMAP   │  │ SKILLS RADAR     │  │ CODE SHOWCASE  │ │
│  │ + LIVE STATS     │  │ + PROGRESS BARS  │  │ + HIGHLIGHTS   │ │
│  │                  │  │                  │  │                │ │
│  │ • Contribution   │  │ • Interactive    │  │ • Best Code    │ │
│  │   calendar       │  │   D3.js chart    │  │   Snippets     │ │
│  │ • Commit count   │  │ • Skill filters  │  │ • Prism.js     │ │
│  │ • Languages      │  │ • Proficiency    │  │   Highlighting │ │
│  │ • Recent repos   │  │   levels         │  │ • Expandable   │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                    AI CHAT ASSISTANT                        ││
│  │  "Ask me anything about Arun's experience..."               ││
│  │                                                             ││
│  │  Powered by: Claude API / OpenAI                            ││
│  │  Context: Resume data + project details + work history      ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. GitHub Heatmap + Live Stats

### Purpose
Show **consistent, verifiable coding activity** - not just claims, but proof.

### Components

#### 1.1 Contribution Heatmap
```
┌─────────────────────────────────────────────────────────────┐
│  GitHub Activity                           @castronix       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec │
│  ░░▓░ ░▓▓░ ░░▓░ ▓▓▓▓ ░▓░░ ░░▓▓ ▓▓░░ ░▓▓▓ ░░▓░ ▓░░░ ▓▓▓░ ░▓▓ │
│  ░▓▓░ ▓░░▓ ▓▓░░ ░░▓░ ▓▓░░ ▓░░░ ░▓▓░ ▓░░▓ ▓▓░░ ░▓▓░ ░░▓▓ ▓░░ │
│  ...                                                        │
│                                                             │
│  Less ░░░▓▓▓█ More                                          │
└─────────────────────────────────────────────────────────────┘
```

#### 1.2 Live Stats Cards
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    523      │  │     12      │  │     4       │  │    15+      │
│  Commits    │  │   Repos     │  │  Languages  │  │  Projects   │
│  (2024)     │  │  Public     │  │   Used      │  │  Completed  │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

### Implementation Options

| Option | Pros | Cons |
|--------|------|------|
| **GitHub Readme Stats** (embed) | No API needed, easy | Less control |
| **GitHub API + Custom Render** | Full control, real-time | API rate limits |
| **GitHub Contributions Calendar** (NPM) | React component ready | Dependency |

**Recommended:** GitHub API + Custom Render with caching (update daily)

### API Endpoints
```javascript
// GitHub REST API v3
GET https://api.github.com/users/{username}              // Profile stats
GET https://api.github.com/users/{username}/repos        // Repositories
GET https://api.github.com/users/{username}/events       // Recent activity

// GitHub GraphQL API (for contribution calendar)
query {
  user(login: "castronix") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
```

---

## 2. Interactive Skills Visualization

### Purpose
Make skills **memorable and scannable** with visual representation.

### Components

#### 2.1 Radar Chart (Primary Skills)
```
         Architecture
              ▲
             /│\
            / │ \
  Databases ──┼──► Frontend
            \ │ /
             \│/
              ▼
           Backend
```

**Categories:**
- Architecture & Domain (Solution Architecture, Core Banking, Payments)
- Backend (Python, Java, PL/SQL, Unix)
- Frontend (JavaScript, React, TypeScript)
- Data (Tableau, MicroStrategy, Splunk)
- Methodology (Agile, TOGAF, PMP)

#### 2.2 Skill Progress Bars (Detailed)
```
┌─────────────────────────────────────────────────────────────┐
│  Technical Skills                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Solution Architecture  ████████████████████░░  Expert      │
│  Core Banking           ██████████████████████  17+ years   │
│  Python                 ████████████████░░░░░░  Advanced    │
│  React/TypeScript       █████████████░░░░░░░░░  Intermediate│
│  Java/PL-SQL            ██████████████████████  Expert      │
│                                                             │
│  [ Filter: All | Architecture | Development | Data ]        │
└─────────────────────────────────────────────────────────────┘
```

### Implementation
- **Library:** Chart.js or D3.js for radar chart
- **Animation:** Animate on scroll reveal
- **Interactivity:** Hover to show details, click to filter

---

## 3. Code Showcase

### Purpose
Show **actual code quality** - not just claims about coding ability.

### Components

#### 3.1 Featured Code Snippets
```
┌─────────────────────────────────────────────────────────────┐
│  Code Showcase              [ TypeScript | Python | SQL ]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ // Custom Hook for Offline-First Sync (NoteApp)       │  │
│  │ export function useOfflineSync<T>() {                 │  │
│  │   const [syncStatus, setSyncStatus] = useState<...>   │  │
│  │   const [pendingChanges, setPending] = useState<T[]>  │  │
│  │                                                       │  │
│  │   useEffect(() => {                                   │  │
│  │     // Sync when coming back online                   │  │
│  │     const handleOnline = async () => {                │  │
│  │       for (const change of pendingChanges) {          │  │
│  │         await syncToCloud(change);                    │  │
│  │       }                                               │  │
│  │     };                                                │  │
│  │     ...                                               │  │
│  │   }, [pendingChanges]);                               │  │
│  │ }                                                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  📁 From: NoteApp          ⭐ Pattern: Custom Hook          │
│                                                             │
│  [ ← Previous ]                            [ Next → ]       │
└─────────────────────────────────────────────────────────────┘
```

### Code Examples to Showcase

| Project | Code Example | Why It's Impressive |
|---------|--------------|---------------------|
| NoteApp | Offline sync hook | Complex state management |
| REPPIT | Workout timer logic | Real-time state updates |
| PRIMMO | Voice AI integration | API orchestration |
| Work | Architecture diagrams | Enterprise patterns |

### Implementation
- **Syntax Highlighting:** Prism.js or Shiki (VSCode-quality)
- **Features:** Copy button, expand/collapse, language tabs
- **Theme:** Match resume dark theme

---

## 4. AI Chat Assistant

### Purpose
Let recruiters/colleagues **have a conversation** about your experience.

### Concept
```
┌─────────────────────────────────────────────────────────────┐
│  💬 Ask me anything about Arun's experience...              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [User] What's Arun's experience with core banking?         │
│                                                             │
│  [AI] Arun has 17+ years of experience in core banking,     │
│  primarily with Finacle implementations. He's led projects  │
│  for Emirates NBD, Standard Bank, and Bank of America       │
│  across India, Middle East, and APAC regions...             │
│                                                             │
│  [User] What projects has he built with React?              │
│                                                             │
│  [AI] Arun has built several React projects:                │
│  • NoteApp - React Native note-taking app with offline sync │
│  • REPPIT - Fitness tracking with workout timer             │
│  • PRIMMO - Next.js AI-powered personal trainer             │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Type your question...                              📤 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Options

| Option | Complexity | Cost | Quality |
|--------|------------|------|---------|
| **Claude API** | Medium | Per token | Best |
| **OpenAI API** | Medium | Per token | Great |
| **Pre-built Q&A** | Low | Free | Limited |
| **RAG + LLM** | High | Variable | Best |

**Recommended:** Claude API with system prompt containing resume context

### System Prompt Structure
```
You are an AI assistant for Arun Castromin Lawrance's digital resume.
Answer questions about his experience, skills, and projects.

CONTEXT:
- 17+ years in enterprise technology consulting
- Sr. Technology Architect at Infosys, Singapore
- Expertise: Core Banking (Finacle), Solution Architecture, NFR Management
- Projects: NoteApp, REPPIT, PRIMMO (AI-assisted development)
- Certifications: TOGAF, CSPO, ISO 31000, IBM Data Science

TONE: Professional, concise, factual. Don't make up information.
```

### Security Considerations
- Rate limiting (prevent abuse)
- Input sanitization
- Cost caps per session
- No PII exposure beyond resume

---

## Integration with Portfolio

### Option A: Embedded in Resume Page
Add digital features directly to `resume-pdf-email.html`
- Keep printable version clean
- Show interactive version on web

### Option B: Separate Digital Resume Page
Create `resume-digital.html` with full interactive features
- PDF version remains for downloads
- Digital version linked from portfolio

### Option C: Resume Section in Main Portfolio
Add resume features to `v8-brittany.html` portfolio
- Unified experience
- Single destination

**Recommended:** Option B - Separate pages for different purposes

---

## File Structure

```
docs/mockups/
├── resume-pdf-email.html      # Print-optimized (existing)
├── resume-digital.html        # NEW - Full interactive version
│
├── components/
│   ├── github-heatmap.js      # GitHub contribution calendar
│   ├── skills-radar.js        # D3.js radar chart
│   ├── code-showcase.js       # Prism.js code display
│   └── ai-chat.js             # Chat interface
│
└── styles/
    └── digital-resume.css     # Styles for interactive version
```

---

## Implementation Priority

| Phase | Feature | Effort | Impact |
|-------|---------|--------|--------|
| 1 | GitHub Heatmap + Stats | Medium | High |
| 1 | Skills Radar Chart | Medium | High |
| 2 | Code Showcase | Low | Medium |
| 3 | AI Chat Assistant | High | Very High |

---

## Success Metrics

1. **Differentiation:** Recruiters remember the interactive experience
2. **Verification:** GitHub stats prove consistent activity
3. **Engagement:** Average time on resume page (target: >2 min)
4. **Conversation:** AI chat interactions per visit

---

## Next Steps

1. [ ] Create `resume-digital.html` scaffolding
2. [ ] Implement GitHub Heatmap component
3. [ ] Add interactive Skills Radar chart
4. [ ] Build Code Showcase carousel
5. [ ] Develop AI Chat Assistant (Phase 2)