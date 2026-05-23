Launching my portfolio page.

I've always wanted one — but never had enough shipped projects to justify it.

Now I do. 8 projects live, 4 more in the pipeline. So I built the page. But not as a static showcase — as a self-updating system.

Every project cycles through design, architecture, and review — iterated until the foundation is solid — before a single line of code.

"A flaw caught in design costs $1. The same flaw in production costs $100."
— IBM Systems Sciences Institute

The portfolio is just the output of that discipline.



𝗛𝗼𝘄 𝗶𝘁 𝘄𝗼𝗿𝗸𝘀

Every project follows a structure:
→ A `.project.json` in the repo with metadata — name, status, tech stack, progress, screenshot
→ A sync script reads every project repo, pulls the data, and writes it into a single `projects.json`
→ That one JSON file drives three pages — the portfolio, the digital resume, and the traditional CV

Update once. Reflected everywhere.



𝗧𝗵𝗲 𝗿𝗲𝗮𝗹 𝗯𝗲𝘁

The more projects that get structurally built and pushed to GitHub — the portfolio updates itself.

Agents handle the structural side: README generation, screenshot capture, metadata sync, status tracking. A project ships, gets pushed to GitHub, the portfolio picks it up.

No manual editing. No rework or alignment work in the portfolio.



𝗧𝗵𝗿𝗲𝗲 𝗽𝗮𝗴𝗲𝘀, 𝗼𝗻𝗲 𝘀𝗼𝘂𝗿𝗰𝗲

→ Portfolio — project cards, tech stack tags, live/building/concept status badges
→ Digital Resume — the interactive resume I posted about recently
→ Traditional CV — print-optimized, ATS-friendly, one-click PDF

All three pull from the same `projects.json`. A project goes from "concept" to "live" in the data — every page reflects it automatically.



𝗕𝘂𝗶𝗹𝘁 𝘄𝗶𝘁𝗵

Vanilla JavaScript. No frameworks. Chart.js for visualizations. Supabase for the contact form and chat logging.

Built using my 9-step development workflow:
https://www.linkedin.com/pulse/clarity-clutter-why-ai-assisted-development-needs-arun-castromin-hmxzc/

The auto-sync architecture borrows from the same in-session global agent pattern I designed for Klarity:
https://www.linkedin.com/pulse/my-project-management-app-8mb-works-offline-talks-ai-meet-castromin-mmnsc/



🔗 Portfolio: https://castroarun.github.io/portfolio/
🔗 Digital Resume: https://castroarun.github.io/portfolio/resume/
🔗 Traditional CV: https://castroarun.github.io/portfolio/cv/



Have a look around. If you're building portfolios or thinking about structured project pipelines — would love to hear how you approach it.



#Portfolio #WebDevelopment #JavaScript #BuildInPublic #AI #Supabase #FullStack #OpenToCollaborate
