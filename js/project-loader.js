/**
 * Dynamic Project Loader + Modal Overlay
 * Loads projects from data/projects.json and renders them to the portfolio
 * Opens project deep-dive modal on card click
 *
 * Logic:
 * - Projects with status "idea" or "discovery" → Under Conception section
 * - All other projects → Main Featured Projects section (sorted by status)
 * - All hints/descriptions come from projects.json (single source of truth)
 * - Click any project card → modal overlay with architecture deep-dive
 */

(function() {
  'use strict';

  // Status priority for sorting (lower = higher priority = shown first)
  const STATUS_PRIORITY = {
    'live': 1,        // Deployed & accessible
    'shipped': 2,     // Built, ready to launch
    'beta': 3,        // Under testing
    'crafting': 4,    // In active development
    'exploring': 5,   // Discovery phase
    'concept': 99     // Idea stage → Under Conception
  };

  // SVG icons for project links
  const SVG_ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`,
    spotify: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 15s1.5-2 4-2 4 2 4 2"></path>
      <path d="M7 11s2-2 5-2 5 2 5 2"></path>
      <path d="M6 7s2.5-2 6-2 6 2 6 2"></path>
    </svg>`
  };

  // Project ID to overline mapping (tech category)
  const PROJECT_OVERLINES = {
    anycalc: 'Web App',
    klarity: 'Desktop App',
    orbit: 'Mobile App',
    portfolio: 'Web App',
    cinder: 'Music',
    littlereddot: 'Music',
    reppit: 'Mobile App',
    noteapp: 'Web App',
    primmo: 'AI / Voice',
    'portfolio-optimization': 'Automation'
  };

  // Fallback category mapping
  const CATEGORY_OVERLINES = {
    featured: 'Web App',
    personal: 'Web App',
    music: 'Music'
  };

  // Full descriptions for portfolio (can be overridden in JSON with "portfolioDescription")
  const FULL_DESCRIPTIONS = {
    reppit: 'A mobile strength training app that tracks and prompts your workouts, rest periods, and progress. Features timer modes, workout history, and detailed analytics for all - beginners to serious lifters.',
    noteapp: 'A notes app with real-time sync across devices. Features markdown support, folder organization, and AI-powered search to find any note instantly. Built for speed and simplicity.',
    primmo: 'An agentic AI strength coach that communicates via WhatsApp and voice calls. Leverages workout data from REPPIT to provide personalized training guidance, form corrections, and motivation.',
    portfolio: 'Interactive digital resume with AI chat assistant, skills radar, project showcase cards, and 9-step workflow visualization. Crafted to showcase technical depth and design sensibility.',
    anycalc: '19 interlinked financial calculators in one app \u2014 EMI, tip splits, compound interest, currency conversion, and more. Plan mode lets you chain calculations together for smarter decision-making.',
    cinder: '7 songs of redemption, grace & transformation. From ashes to flame \u2014 faith set to music. AI-assisted original music production blending technology with artistic expression.',
    littlereddot: '8 songs about love, resilience, and saying goodbye. A musical tribute to Singapore \u2014 from moonlit longing to unbroken flames. This is my heart, set to music.',
    klarity: 'Lightweight desktop task board with a 15-stage pipeline, ETag-based distributed sync, and multi-agent orchestration for AI-assisted developers. Built to bring clarity to complex workflows.',
    orbit: 'Mobile companion for Klarity \u2014 review, update, and triage tasks from your phone with zero-server architecture using GitHub as backend and SHA-based conflict resolution.',
    'portfolio-optimization': 'Automated portfolio construction and maintenance \u2014 covered calls, rebalancing, and risk analytics to outperform market indexes.',
    'quantifyd-premarket-brief': 'A daily intelligence brief in your inbox before the opening bell \u2014 three stages, ~3-minute loop. <ul style="margin:10px 0 0 0;padding-left:1.2em;line-height:1.8"><li><b>Stage 1 \u00b7 08:00 IST</b> \u2014 VPS builds the JSON (market data, holdings events, news).</li><li><b>Stage 2 \u00b7 08:02 IST</b> \u2014 Claude routine writes sentiment + narrative.</li><li><b>Stage 3 \u00b7 08:03 IST</b> \u2014 VPS dispatches to <b>Gmail</b> + <b>WhatsApp</b>.</li></ul>'
  };

  // Tech stack overrides (portfolio may show different tech than JSON)
  const TECH_OVERRIDES = {
    reppit: ['Flutter', 'Dart', 'SQLite', 'Riverpod'],
    noteapp: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    primmo: ['Next.js', 'TypeScript', 'WhatsApp API', 'Voice AI'],
    portfolio: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    anycalc: ['Flutter', 'Dart', 'Material Design'],
    klarity: ['Next.js', 'TypeScript', 'Zustand', 'Supabase'],
    orbit: ['React Native', 'Tauri', 'GitHub API'],
    'portfolio-optimization': ['Python', 'Pandas', 'Kite API']
  };

  // Tech stack → official site URLs
  const TECH_URLS = {
    'Flutter': 'https://flutter.dev',
    'Dart': 'https://dart.dev',
    'SQLite': 'https://www.sqlite.org',
    'Riverpod': 'https://riverpod.dev',
    'Next.js': 'https://nextjs.org',
    'TypeScript': 'https://www.typescriptlang.org',
    'Supabase': 'https://supabase.com',
    'Tailwind': 'https://tailwindcss.com',
    'WhatsApp API': 'https://developers.facebook.com/docs/whatsapp',
    'Voice AI': 'https://vapi.ai',
    'HTML': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'CSS': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'Chart.js': 'https://www.chartjs.org',
    'Material Design': 'https://m3.material.io',
    'Zustand': 'https://zustand-demo.pmnd.rs',
    'React Native': 'https://reactnative.dev',
    'Tauri': 'https://tauri.app',
    'GitHub API': 'https://docs.github.com/en/rest',
    'Python': 'https://www.python.org',
    'Pandas': 'https://pandas.pydata.org',
    'Kite API': 'https://kite.zerodha.com',
    'Udio': 'https://www.udio.com',
    'Music Production': 'https://www.udio.com',
    'AI/ML': 'https://en.wikipedia.org/wiki/Artificial_intelligence'
  };

  // Architecture pattern → reference URLs
  const PATTERN_URLS = {
    'State Machine': 'https://en.wikipedia.org/wiki/Finite-state_machine',
    'Local-First': 'https://www.inkandswitch.com/local-first',
    'Data Isolation': 'https://en.wikipedia.org/wiki/Data_isolation',
    'Row-Level Security': 'https://supabase.com/docs/guides/database/postgres/row-level-security',
    'Soft Delete': 'https://en.wikipedia.org/wiki/Soft_deletion',
    'Optimistic Persistence': 'https://en.wikipedia.org/wiki/Optimistic_concurrency_control',
    'Tiered Routing': 'https://en.wikipedia.org/wiki/Tiered_architecture',
    'Event-Driven': 'https://en.wikipedia.org/wiki/Event-driven_architecture',
    'RAG / Vector Search': 'https://en.wikipedia.org/wiki/Retrieval-augmented_generation',
    'RLS': 'https://supabase.com/docs/guides/database/postgres/row-level-security',
    'Pipeline Pattern': 'https://en.wikipedia.org/wiki/Pipeline_(software)',
    'Distributed Sync': 'https://en.wikipedia.org/wiki/Distributed_computing',
    'Multi-Agent': 'https://en.wikipedia.org/wiki/Multi-agent_system',
    'Zero-Server Architecture': 'https://en.wikipedia.org/wiki/Serverless_computing',
    'Conflict Resolution': 'https://en.wikipedia.org/wiki/Optimistic_concurrency_control',
    'Rule Engine': 'https://en.wikipedia.org/wiki/Business_rules_engine',
    'Stateless Computation': 'https://en.wikipedia.org/wiki/Stateless_protocol',
    'Golden Source': 'https://en.wikipedia.org/wiki/Single_source_of_truth',
    'Multi-Format Rendering': 'https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller',
    'Strategy Pattern (GoF)': 'https://en.wikipedia.org/wiki/Strategy_pattern',
    'Real-Time Streaming': 'https://en.wikipedia.org/wiki/WebSocket',
    'Domain Modeling': 'https://en.wikipedia.org/wiki/Domain-driven_design'
  };

  // ============ PROJECT DETAILS for Modal Deep-Dives ============
  // Architecture data sourced from resume/index.html Section 07
  const PROJECT_DETAILS = {
    'quantifyd-premarket-brief': {
      features: [
        'Lands in inbox + WhatsApp at 08:03 IST every weekday — three minutes from data fetch to delivery',
        'Three stages, two halves: VPS builds the raw JSON at 08:00; Claude Code cloud routine narrates at 08:02; VPS dispatches via Gmail SMTP + Twilio WhatsApp at 08:03',
        'Sandboxed cloud agent stays stateless — no SSH key, no SMTP credentials, no secrets. Only reads /api/premarket/brief/raw and writes synthesis to /synthesized',
        '08:08 IST self-healing fallback on the VPS guarantees delivery — even if the cloud routine never posts back, the un-synthesized version goes out',
        'Free data spine: yfinance (14 tickers), NSE archive CSVs, BSE corporate actions, RSS from Moneycontrol/Mint/Reuters India, plus the local holdings_events.db'
      ],
      archFlow: ['Sources\n(yfinance + RSS)', 'VPS Builder\n08:00 IST', 'Claude Cloud\n08:02 IST', 'VPS SMTP\n08:03 IST'],
      archHighlight: 2,
      archInsight: '<strong>Separation of layers</strong> — the VPS handles deterministic work (fetching, persisting, transport via Gmail SMTP) while the cloud routine handles the part that benefits from language understanding (sentiment tags, narrative one-liner). Each side stays in its lane. <strong>Stateless cloud agent</strong> means there are no secrets to leak — the worst-case payload an attacker could harvest is a public-data forecast. <strong>Idempotent fallback</strong> at 08:08 IST guarantees delivery even when the cloud round-trip fails — the same dual-rail design banks use for critical settlement messaging where a backup channel must always exist.',
      adr: '<strong>Decision:</strong> Webhook-back-to-VPS over having the cloud routine send email directly via Gmail MCP. <strong>Rationale:</strong> Gmail MCP only exposes <code>create_draft</code>, not <code>send_email</code> — letting the cloud handle delivery would mean clicking "Send" on a draft every morning. By keeping SMTP transport on the VPS (where the app password already lives), the loop stays fully autonomous. The 08:08 fallback exists because cloud sandboxes can fail silently; degraded brief beats no brief.',
      patterns: ['Two-Stage Pipeline', 'Stateless Synthesis Layer', 'Self-Healing Fallback'],
      links: { github: 'https://github.com/castroarun/Quantifyd/blob/master/docs/PREMARKET_BRIEF.md', preview: 'https://castroarun.github.io/Quantifyd/premarket_brief_pipeline.html' }
    },
    reppit: {
      features: [
        'Automatic strength-level detection based on lifts relative to bodyweight',
        'Smart progression engine with PROGRESS/MAINTAIN logic per session',
        'Muscle heatmap visualization across 5 body parts and 23 exercises',
        'Full-screen rest timer with wake-lock, sound/vibration alerts',
        'Multi-profile support (up to 5 users), offline-first, zero registration'
      ],
      archFlow: ['User Input', 'State Machine\n(Beginner\u2192Elite)', 'SQLite\n(Local-First)', 'Multi-Profile\nIsolation'],
      archHighlight: 1,
      archInsight: '<strong>State machine pattern</strong> drives progression through deterministic levels (Beginner \u2192 Intermediate \u2192 Advanced \u2192 Elite) \u2014 the same pattern that governs credit tier transitions and KYC status workflows in banking systems. <strong>Local-first SQLite</strong> ensures the app works without connectivity, mirroring how branch banking systems must operate during network outages. <strong>Multi-profile data isolation</strong> enforces strict partitioning between users \u2014 the mobile equivalent of row-level security.',
      adr: '<strong>Decision:</strong> SQLite over cloud-first storage. <strong>Rationale:</strong> Workout data must be available mid-set regardless of connectivity. Local-first with optional sync mirrors how ATMs process transactions offline and reconcile later \u2014 availability over consistency for the user-facing path.',
      patterns: ['State Machine', 'Local-First', 'Data Isolation'],
      links: { github: 'https://github.com/castroarun/REPPIT' }
    },
    noteapp: {
      features: [
        'Auto-save after 1 second of inactivity \u2014 never lose a thought',
        '6 pre-built templates: Weekend Planner, Goal Tracker, Meeting Notes, and more',
        'Rich text editing via Tiptap 2.x with full keyboard shortcut support',
        'Supabase Auth + Row-Level Security \u2014 notes private by default',
        'Dark mode, pin notes, cross-note search, shipped and live'
      ],
      archFlow: ['User Action', 'Debounced\nAuto-Save', 'RLS Policy\nEnforcement', 'Soft Delete\n(Recoverable)'],
      archHighlight: 2,
      archInsight: '<strong>Row-level security</strong> at the database level ensures users only access their own data \u2014 the same Supabase RLS policies used in banking for customer data isolation. <strong>Soft delete</strong> preserves data for audit and recovery, matching regulatory requirements where financial records must never be permanently destroyed. <strong>Debounced auto-save</strong> demonstrates optimistic persistence \u2014 writes are batched and retried, similar to how transaction systems handle intermittent connectivity.',
      adr: '<strong>Decision:</strong> Soft delete with <code>deleted_at</code> timestamp over hard delete. <strong>Rationale:</strong> Regulatory audit patterns require data recovery capability. Banking systems never permanently destroy records \u2014 they mark them inactive. Same principle applied here for user notes.',
      patterns: ['Row-Level Security', 'Soft Delete', 'Optimistic Persistence'],
      links: { github: 'https://github.com/castroarun/noteApp', preview: 'https://noteapp-castronix.vercel.app' }
    },
    primmo: {
      features: [
        '4-tier cost-optimized response: FAQ \u2192 semantic search \u2192 formula \u2192 Claude API',
        'Multi-channel delivery via WhatsApp (Twilio) and voice calls (Vapi.ai)',
        'Proactive scheduled check-ins and motivational outreach via n8n',
        'REPPIT integration \u2014 syncs real workout data, not generic advice',
        '3-phase roadmap: WhatsApp + FAQ, Voice calls, Multi-user dashboard'
      ],
      archFlow: ['User Query', '4-Tier AI\nRouter', 'Vector\nSearch', 'Event\nOrchestrator', 'RLS-Protected\nStorage'],
      archHighlight: 1,
      archInsight: '<strong>4-tier AI routing</strong> (cache \u2192 rules \u2192 lightweight model \u2192 full model) mirrors how payment systems route transactions through cost-optimized processing tiers. <strong>Event-driven orchestration</strong> decouples AI inference from data persistence \u2014 the same pattern behind CQRS in payment rails. <strong>Vector search (RAG)</strong> enables semantic retrieval over exercise data, demonstrating enterprise AI patterns. <strong>Row-level security</strong> enforces per-user data isolation at the database level.',
      adr: '<strong>Decision:</strong> 4-tier routing over single-model approach. <strong>Rationale:</strong> 80% of user queries are repetitive ("log my bench press"). Routing these through cache/rules instead of GPT-4 reduces cost by ~90% \u2014 the same cost-optimization logic behind tiered transaction processing in payment gateways.',
      patterns: ['Tiered Routing', 'Event-Driven', 'RAG / Vector Search', 'RLS'],
      links: { github: 'https://github.com/castroarun/PRIMMO' }
    },
    klarity: {
      features: [
        'Two-surface architecture: Tauri 2.0 desktop + React Native/Expo mobile',
        'Command palette (Cmd+K) with Claude AI agent for task breakdown',
        'Zero-backend sync via machine-readable README status blocks',
        'Health scoring algorithm that surfaces neglected projects (14+ days stale)',
        '15-stage pipeline from idea to deployment with configurable gates'
      ],
      archFlow: ['Task Input', '15-Stage\nPipeline', 'ETag\nSync', 'Multi-Agent\nOrchestration'],
      archHighlight: 1,
      archInsight: '<strong>15-stage pipeline</strong> with configurable gates mirrors loan origination workflows and straight-through processing (STP) pipelines in banking. <strong>ETag-based sync</strong> implements optimistic concurrency control \u2014 the same distributed reconciliation pattern used when multiple systems update shared financial records. <strong>Multi-agent orchestration</strong> via Zustand demonstrates how banking systems coordinate between microservices without tight coupling.',
      adr: '<strong>Decision:</strong> ETag-based optimistic concurrency over pessimistic locking. <strong>Rationale:</strong> Distributed task sync across devices requires conflict detection without blocking. ETags detect stale writes \u2014 the same concurrency model banks use for multi-user account operations where locking would degrade throughput.',
      patterns: ['Pipeline Pattern', 'Distributed Sync', 'Multi-Agent'],
      links: { github: 'https://github.com/castroarun/taskBoard' }
    },
    orbit: {
      features: [
        'Voice-to-action pipeline: voice capture transcribed via Groq, executed by Claude',
        'Zero-server architecture using GitHub as the distributed datastore',
        'SHA-based conflict resolution for cross-device sync without a backend',
        'Health dashboard with project scores and staleness detection',
        '"Ship tab" ranking projects by readiness to deploy'
      ],
      archFlow: ['Phone\nClient', 'GitHub\nBackend', 'SHA-Based\nConflict Resolver', 'Desktop\n(Klarity)'],
      archHighlight: 1,
      archInsight: '<strong>Zero-server architecture</strong> using GitHub as a distributed datastore mirrors how banking settlement systems use existing infrastructure (SWIFT, MEPS+) rather than standing up dedicated servers. <strong>SHA-based conflict resolution</strong> implements the same content-addressable approach used in Git itself \u2014 identical to how banks detect duplicate transactions in multi-channel environments where mobile and branch can modify the same account simultaneously.',
      adr: '<strong>Decision:</strong> GitHub as backend over dedicated server infrastructure. <strong>Rationale:</strong> Zero infrastructure cost and built-in versioning. SHA-based conflict detection ensures data integrity across devices \u2014 the same hash-based reconciliation banks use for cross-channel transaction deduplication.',
      patterns: ['Zero-Server Architecture', 'Conflict Resolution'],
      links: { github: 'https://github.com/castroarun/taskBoard' }
    },
    anycalc: {
      features: [
        '19+ calculators across 5 categories: Investment, Loans, Tax, Health, Lifestyle',
        'Workspace Mode \u2014 open multiple calculators side-by-side for comparison',
        '100% local processing \u2014 all calculations client-side, zero data sent to servers',
        'Interactive Recharts visualizations \u2014 results as responsive charts, not just numbers',
        'Live at anycalc.in, built on Next.js 14 App Router with TypeScript'
      ],
      archFlow: ['Input\nExpression', 'Formula\nParser', 'Stateless\nCompute', 'Deterministic\nOutput'],
      archHighlight: 1,
      archInsight: '<strong>Rule engine pattern</strong> \u2014 stateless, deterministic computation pipelines identical to how banking product pricing engines compute interest rates, fees, and EMIs. Same input always produces the same output, with no side effects. This is the foundation of every financial calculation engine in banking, from loan EMI calculators to forex rate converters.',
      adr: '<strong>Decision:</strong> Pure functions with zero shared state. <strong>Rationale:</strong> Financial calculations must be deterministic and auditable. Every EMI, tip split, and conversion in AnyCalc is a pure function \u2014 same inputs, same outputs, always. This is non-negotiable in banking computation engines.',
      patterns: ['Rule Engine', 'Stateless Computation'],
      links: { github: 'https://github.com/castroarun/caclulate_anything' }
    },
    portfolio: {
      features: [
        'AI Chat Assistant with 60+ pre-trained recruiter responses \u2014 no LLM required',
        '3-part suite: Portfolio landing, interactive resume, ATS-optimized printable CV',
        'Single-source-of-truth: all projects load from projects.json across all views',
        'Zero-framework build: pure HTML5/CSS3/vanilla JS with Chart.js and Prism.js',
        'Project 1-pager modals with architecture deep-dives on card click'
      ],
      archFlow: ['projects.json\n(Golden Source)', 'Portfolio\nCards', 'Resume\nFlip-Cards', 'Launchpad\nDashboard'],
      archHighlight: 0,
      archInsight: '<strong>Golden source pattern</strong> \u2014 one <code>projects.json</code> file drives three different outputs (portfolio cards, resume flip-cards, Launchpad status). This is the same pattern banks use for regulatory reporting: a single authoritative data source generates Basel III reports, MAS submissions, and internal dashboards without data duplication or drift.',
      adr: '<strong>Decision:</strong> Single JSON golden source over per-page data duplication. <strong>Rationale:</strong> Three views (portfolio, resume, Launchpad) consuming different slices of the same data. Duplicating would create drift \u2014 the exact problem golden source solves in bank regulatory reporting where one truth feeds multiple downstream consumers.',
      patterns: ['Golden Source', 'Multi-Format Rendering'],
      links: { github: 'https://github.com/castroarun/portfolio', preview: 'https://castroarun.github.io/portfolio/' }
    },
    'portfolio-optimization': {
      features: [
        'Historical backtesting engine for covered call options strategies',
        'Delta-based and % OTM strike selection algorithms for optimal strikes',
        'Comprehensive metrics: Sharpe ratio, max drawdown, CAGR, win rate per strategy',
        'Equity curves + return distribution visualizations via Matplotlib',
        'Modular architecture: data loaders, strategy engine, backtest runner, metrics'
      ],
      archFlow: ['Market Data\n(WebSocket)', 'Strategy\nEngine', 'Cost Model\n(Brokerage+Tax)', 'Risk\nAnalytics'],
      archHighlight: 1,
      archInsight: '<strong>Strategy pattern</strong> (Gang of Four) \u2014 pluggable trading algorithms behind a single interface, identical to how banking product engines swap calculation strategies without conditional branching. <strong>Real-time WebSocket streaming</strong> from Kite Connect demonstrates the same data pipeline patterns used in market data feeds and trading platforms. <strong>Full cost modeling</strong> (brokerage, STT, GST, stamp duty) mirrors how banking fee engines compute transaction costs across product types.',
      adr: '<strong>Decision:</strong> Strategy pattern over if/else branching for trading algorithms. <strong>Rationale:</strong> New strategies (iron condor, butterfly) must be pluggable without modifying the engine \u2014 identical to how banking product engines add new loan products without changing the core pricing system.',
      patterns: ['Strategy Pattern (GoF)', 'Real-Time Streaming', 'Domain Modeling'],
      links: { github: 'https://github.com/castroarun/covered_calls' }
    },
    cinder: {
      features: [
        '7 original songs of redemption, grace & transformation',
        'AI-assisted music production with Udio',
        'From ashes to flame — faith set to music',
        'Available on Spotify and Apple Music'
      ],
      albumDesc: '7 songs of redemption, grace & transformation. From ashes to flame — faith set to music.',
      tracks: [
        { title: 'Empowered', theme: 'Grace that rewrites brokenness' },
        { title: 'Fingerprints', theme: 'Looking back and seeing God\'s hand' },
        { title: 'Talitha Cumi', theme: 'Compassion, miracles, and following Christ' },
        { title: 'His Heart on the Cross', theme: 'The cost and power of the crucifixion' },
        { title: 'Temple of Grace', theme: 'Sacred dwelling' },
        { title: 'Unspoken', theme: 'The weight of words left unsaid' },
        { title: 'Restart', theme: 'Beginning again' }
      ],
      lyricsPreview: [
        { track: 'Fingerprints', lines: 'Your fingerprints are all over me\nNot bound by chains, something stronger\nYou were writing every page' },
        { track: 'His Heart on the Cross', lines: 'More than my eyes have ever seen\nMore than my mind could ever hold\nA love that broke the grave\'s cold stone' },
        { track: 'Unspoken', lines: 'Words carry wounds longer than war\nDeeper than any blade\nBut the echo that broke the glass\nCould make it whole again someday' }
      ],
      archFlow: null,
      archInsight: null,
      adr: null,
      patterns: null,
      links: { spotify: 'https://open.spotify.com/user/castronix' }
    },
    littlereddot: {
      features: [
        '8 original songs about love, resilience, and saying goodbye',
        'A musical tribute to Singapore — the little red dot',
        'AI-assisted production with Udio',
        'Available on Spotify and Apple Music'
      ],
      albumDesc: '8 songs about love, resilience, and saying goodbye. A musical tribute to Singapore. From moonlit longing to unbroken flames — this is my heart, set to music.',
      tracks: [
        { title: 'Until Then', theme: 'Longing and devotion across distance' },
        { title: 'Strangers in Motion', theme: 'Shared humanity on a train ride' },
        { title: 'Daughters of the World', theme: 'Celebrating the strength of women' },
        { title: 'Unbroken', theme: 'Resilience against the world\'s judgment' },
        { title: 'Unspoken', theme: 'The weight of words left unsaid' },
        { title: 'Maps to Nowhere', theme: 'The beautiful detours of life' },
        { title: 'The Invisible', theme: 'Fatherhood and transformation' },
        { title: 'The Little Red Dot', theme: 'A farewell love letter to Singapore' }
      ],
      lyricsPreview: [
        { track: 'The Little Red Dot', lines: 'Singapore, you\'re under my skin\nIsland of sun and rain\nI\'m taking your storms within\nI\'ll never be the same' },
        { track: 'Until Then', lines: 'The moon remembers what I told her\nWhen I whispered out your name\nShe promised she would watch you sleeping\nUntil I see your face again' },
        { track: 'Strangers in Motion', lines: 'Strangers in motion\nPassing through the same light\nDifferent wars, same fight\nWe\'re all just travelers' }
      ],
      archFlow: null,
      archInsight: null,
      adr: null,
      patterns: null,
      links: { spotify: 'https://open.spotify.com/user/castronix' }
    }
  };

  /**
   * Check if a project is in conception stage (concept or exploring)
   */
  function isConceptionProject(project) {
    return project.status === 'concept' || project.status === 'exploring';
  }

  // Explicit display order for portfolio page (array index = position).
  // Newest project goes to position 0 by convention.
  const DISPLAY_ORDER = [
    'quantifyd-premarket-brief',
    'anycalc', 'klarity', 'orbit', 'portfolio', 'cinder',
    'littlereddot', 'reppit', 'noteapp', 'primmo', 'portfolio-optimization'
  ];

  /**
   * Sort projects by explicit display order, then by status priority as fallback
   */
  function sortByStatus(a, b) {
    const orderA = DISPLAY_ORDER.indexOf(a.id);
    const orderB = DISPLAY_ORDER.indexOf(b.id);
    const posA = orderA >= 0 ? orderA : 99;
    const posB = orderB >= 0 ? orderB : 99;
    if (posA !== posB) return posA - posB;

    const priorityA = STATUS_PRIORITY[a.status] || 50;
    const priorityB = STATUS_PRIORITY[b.status] || 50;
    return priorityA - priorityB;
  }

  /**
   * Generate HTML for project links
   */
  function renderProjectLinks(project) {
    const links = project.links || {};
    let html = '';

    if (links.github) {
      html += `
        <a href="${links.github}" class="project-link-icon" aria-label="GitHub" target="_blank">
          ${SVG_ICONS.github}
        </a>`;
    }

    if (links.preview && links.preview !== '#') {
      html += `
        <a href="${links.preview}" class="project-link-icon" aria-label="External Link" target="_blank">
          ${SVG_ICONS.external}
        </a>`;
    } else if (links.preview === '#' && project.status === 'building') {
      html += `
        <a href="#" class="project-link-icon" aria-label="Coming Soon">
          ${SVG_ICONS.clock}
        </a>`;
    } else if (links.preview === '#') {
      html += `
        <a href="#" class="project-link-icon" aria-label="External Link">
          ${SVG_ICONS.external}
        </a>`;
    }

    if (links.spotify) {
      html += `
        <a href="${links.spotify}" class="project-link-icon" aria-label="Spotify" target="_blank">
          ${SVG_ICONS.spotify}
        </a>`;
    }

    return html;
  }

  /**
   * Generate HTML for a featured project article (with data-project-id for modal)
   */
  function renderProjectArticle(project) {
    const overline = PROJECT_OVERLINES[project.id] || CATEGORY_OVERLINES[project.category] || 'Project';
    const hint = project.statusHint || null;
    const description = project.portfolioDescription || FULL_DESCRIPTIONS[project.id] || project.description;
    const techStack = TECH_OVERRIDES[project.id] || project.tech;

    let hintHtml = '';
    if (hint) {
      const hintClass = ['live', 'shipped'].includes(project.status)
        ? 'project-launch-hint'
        : 'project-status-hint';
      hintHtml = `<span class="${hintClass}">${hint}</span>`;
    }

    return `
      <article class="featured-project fade-up" data-project-id="${project.id}">
        <div class="project-image">
          <div class="project-image-wrapper">
            <img src="${project.image}" alt="${project.name} - ${project.tagline}" loading="lazy">
          </div>
        </div>
        <div class="project-content">
          <p class="project-overline">${overline}</p>
          <h3 class="project-title"><a href="#">${project.name}</a> ${hintHtml}</h3>
          <div class="project-description">
            <p>${description}</p>
          </div>
          <ul class="project-tech-list">
            ${techStack.map(tech => `<li>${tech}</li>`).join('\n            ')}
          </ul>
          <div class="project-links">
            ${renderProjectLinks(project)}
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Render a conception item (idea/discovery stage project)
   */
  function renderConceptionItem(project) {
    return `
      <div class="conception-item">
        <span class="conception-icon">${project.icon}</span>
        <span class="conception-name">${project.name}</span>
        <span class="conception-desc">${project.tagline || project.shortDesc}</span>
      </div>
    `;
  }

  // ============ MODAL LOGIC (Carousel) ============

  // Current modal index in DISPLAY_ORDER
  var currentModalIndex = -1;
  var isNavigating = false;

  /**
   * Get the project name for a given project ID (from the DOM card)
   */
  function getProjectName(projectId) {
    var card = document.querySelector('[data-project-id="' + projectId + '"]');
    if (card) {
      var titleEl = card.querySelector('.project-title a');
      if (titleEl) return titleEl.textContent;
    }
    // Fallback: capitalize the ID
    var names = {
      anycalc: 'AnyCalc', klarity: 'Klarity', orbit: 'Orbit',
      portfolio: 'Portfolio', cinder: 'Cinder', littlereddot: 'The Little Red Dot',
      reppit: 'REPPIT', noteapp: 'NoteApp', primmo: 'PRIMMO',
      'portfolio-optimization': 'Portfolio Optimization'
    };
    return names[projectId] || projectId;
  }

  /**
   * Build the modal HTML content for a project
   */
  function buildModalContent(projectId) {
    const details = PROJECT_DETAILS[projectId];
    if (!details) return '';

    const overline = PROJECT_OVERLINES[projectId] || 'Project';
    const desc = FULL_DESCRIPTIONS[projectId] || '';
    const tech = TECH_OVERRIDES[projectId] || [];

    const card = document.querySelector(`[data-project-id="${projectId}"]`);
    const name = getProjectName(projectId);
    const hintEl = card ? card.querySelector('.project-launch-hint, .project-status-hint') : null;
    const hint = hintEl ? hintEl.textContent : '';
    const isLive = hintEl && hintEl.classList.contains('project-launch-hint');
    const imgEl = card ? card.querySelector('.project-image-wrapper img') : null;
    const imgSrc = imgEl ? imgEl.src : '';

    let html = '';

    // Header
    html += `<div class="project-modal-header">`;
    html += `<p class="project-modal-overline">${overline}</p>`;
    html += `<h2 class="project-modal-title">${name}`;
    if (hint) {
      html += ` <span class="project-modal-badge ${isLive ? 'live' : 'crafting'}">${hint}</span>`;
    }
    html += `</h2>`;
    if (desc) {
      html += `<p class="project-modal-tagline">${desc}</p>`;
    }
    if (tech.length > 0) {
      html += `<div class="project-modal-tags">${tech.map(function(t) {
        var url = TECH_URLS[t];
        return url ? `<a href="${url}" class="project-modal-tag" target="_blank" rel="noopener">${t}</a>` : `<span class="project-modal-tag">${t}</span>`;
      }).join('')}</div>`;
    }
    html += `</div>`;

    // Image
    if (imgSrc) {
      html += `<div class="project-modal-image"><img src="${imgSrc}" alt="${name}"></div>`;
    }

    // Key Features
    if (details.features && details.features.length > 0) {
      html += `<div class="project-modal-section">`;
      html += `<h3 class="project-modal-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Key Features</h3>`;
      html += `<ul class="project-modal-features">`;
      details.features.forEach(function(f) { html += `<li>${f}</li>`; });
      html += `</ul></div>`;
    }

    // Track listing (music)
    if (details.tracks && details.tracks.length > 0) {
      html += `<div class="project-modal-section">`;
      html += `<h3 class="project-modal-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><path d="M7 11s2-2 5-2 5 2 5 2"/><path d="M6 7s2.5-2 6-2 6 2 6 2"/></svg> Track Listing</h3>`;
      html += `<div class="project-modal-tracklist">`;
      details.tracks.forEach(function(track, i) {
        html += `<div class="project-modal-track"><span class="track-number">${String(i + 1).padStart(2, '0')}</span><span class="track-info"><span class="track-title">${track.title}</span><span class="track-theme">${track.theme}</span></span></div>`;
      });
      html += `</div></div>`;
    }

    // Lyrics preview (music)
    if (details.lyricsPreview && details.lyricsPreview.length > 0) {
      html += `<div class="project-modal-section">`;
      html += `<h3 class="project-modal-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg> Lyrics Preview</h3>`;
      html += `<div class="project-modal-lyrics-grid">`;
      details.lyricsPreview.forEach(function(excerpt) {
        html += `<div class="project-modal-lyric-card"><div class="lyric-card-track">${excerpt.track}</div><div class="lyric-card-lines">${excerpt.lines.replace(/\n/g, '<br>')}</div></div>`;
      });
      html += `</div></div>`;
    }

    // Architecture
    if (details.archFlow) {
      html += `<div class="project-modal-section">`;
      html += `<h3 class="project-modal-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> Architecture</h3>`;

      if (details.patterns && details.patterns.length > 0) {
        html += `<div class="project-modal-patterns">${details.patterns.map(function(p) {
          var url = PATTERN_URLS[p];
          return url ? `<a href="${url}" class="project-modal-pattern" target="_blank" rel="noopener">${p}</a>` : `<span class="project-modal-pattern">${p}</span>`;
        }).join('')}</div>`;
      }

      html += `<div class="project-modal-arch-flow">`;
      details.archFlow.forEach(function(node, i) {
        if (i > 0) html += `<span class="project-modal-arch-arrow">\u2192</span>`;
        const isHighlight = i === details.archHighlight;
        html += `<div class="project-modal-arch-node${isHighlight ? ' highlight' : ''}">${node.replace(/\n/g, '<br>')}</div>`;
      });
      html += `</div>`;

      if (details.archInsight) {
        html += `<div class="project-modal-insight"><div class="project-modal-insight-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> Architecture Insight</div><div class="project-modal-insight-text">${details.archInsight}</div></div>`;
      }

      if (details.adr) {
        html += `<div class="project-modal-adr"><div class="project-modal-adr-label">Architecture Decision</div><div class="project-modal-adr-text">${details.adr}</div></div>`;
      }

      html += `</div>`;
    }

    // Links
    const allLinks = details.links || {};
    const linkEntries = [];
    if (allLinks.github) linkEntries.push(`<a href="${allLinks.github}" class="project-modal-link" target="_blank">${SVG_ICONS.github} GitHub</a>`);
    if (allLinks.preview) linkEntries.push(`<a href="${allLinks.preview}" class="project-modal-link" target="_blank">${SVG_ICONS.external} Live Demo</a>`);
    if (allLinks.spotify) linkEntries.push(`<a href="${allLinks.spotify}" class="project-modal-link" target="_blank">${SVG_ICONS.spotify} Spotify</a>`);

    if (linkEntries.length > 0) {
      html += `<div class="project-modal-section"><h3 class="project-modal-section-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Links</h3><div class="project-modal-links">${linkEntries.join('')}</div></div>`;
    }

    return html;
  }

  /**
   * Update the preview side panels with adjacent project names
   */
  function updatePreviewPanels() {
    var prevIndex = (currentModalIndex - 1 + DISPLAY_ORDER.length) % DISPLAY_ORDER.length;
    var nextIndex = (currentModalIndex + 1) % DISPLAY_ORDER.length;

    var leftName = document.getElementById('previewLeftName');
    var rightName = document.getElementById('previewRightName');
    var leftPanel = document.getElementById('projectModalPreviewLeft');
    var rightPanel = document.getElementById('projectModalPreviewRight');

    if (leftName) leftName.textContent = getProjectName(DISPLAY_ORDER[prevIndex]);
    if (rightName) rightName.textContent = getProjectName(DISPLAY_ORDER[nextIndex]);

    // Make preview panels clickable
    if (leftPanel) {
      leftPanel.classList.add('clickable');
      leftPanel.onclick = function() { navigateModal(-1); };
    }
    if (rightPanel) {
      rightPanel.classList.add('clickable');
      rightPanel.onclick = function() { navigateModal(1); };
    }
  }

  /**
   * Open project modal with deep-dive content (carousel-aware)
   */
  function openProjectModal(projectId) {
    var details = PROJECT_DETAILS[projectId];
    if (!details) return;

    // Set current index
    currentModalIndex = DISPLAY_ORDER.indexOf(projectId);
    if (currentModalIndex === -1) currentModalIndex = 0;

    var contentEl = document.getElementById('projectModalContent');
    var backdrop = document.getElementById('projectModalBackdrop');
    var modal = document.getElementById('projectModal');

    if (contentEl && backdrop) {
      contentEl.innerHTML = buildModalContent(projectId);
      backdrop.classList.add('active');
      document.body.classList.add('modal-open');
      if (modal) modal.scrollTop = 0;
      updatePreviewPanels();
    }
  }

  /**
   * Navigate to prev/next project with slide animation
   * @param {number} direction -1 for prev, 1 for next
   */
  function navigateModal(direction) {
    if (isNavigating) return;
    isNavigating = true;

    var modal = document.getElementById('projectModal');
    var contentEl = document.getElementById('projectModalContent');
    if (!modal || !contentEl) { isNavigating = false; return; }

    // Determine animation direction
    var outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
    var inClass = direction > 0 ? 'slide-in-right' : 'slide-in-left';

    // Slide out current
    modal.classList.add(outClass);

    setTimeout(function() {
      // Update index (wrap around)
      currentModalIndex = (currentModalIndex + direction + DISPLAY_ORDER.length) % DISPLAY_ORDER.length;
      var newId = DISPLAY_ORDER[currentModalIndex];

      // Populate new content
      contentEl.innerHTML = buildModalContent(newId);
      modal.scrollTop = 0;
      updatePreviewPanels();

      // Remove out animation, add in animation
      modal.classList.remove(outClass);
      modal.classList.add(inClass);

      setTimeout(function() {
        modal.classList.remove(inClass);
        isNavigating = false;
      }, 300);
    }, 280);
  }

  /**
   * Close the project modal
   */
  function closeProjectModal() {
    var backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
    currentModalIndex = -1;
    isNavigating = false;
  }

  /**
   * Wire click handlers on project cards + carousel navigation
   */
  function wireModalHandlers() {
    // Click on project cards
    document.querySelectorAll('.featured-project[data-project-id]').forEach(function(article) {
      article.style.cursor = 'pointer';
      article.addEventListener('click', function(e) {
        if (e.target.closest('a')) return;
        var id = article.getAttribute('data-project-id');
        if (id) openProjectModal(id);
      });
    });

    // Close button
    var closeBtn = document.getElementById('projectModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    // Click on backdrop (only the backdrop itself, not children)
    var backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) closeProjectModal();
      });
    }

    // Navigation arrows
    var prevBtn = document.getElementById('projectModalPrev');
    var nextBtn = document.getElementById('projectModalNext');
    if (prevBtn) prevBtn.addEventListener('click', function() { navigateModal(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { navigateModal(1); });

    // Keyboard: Escape, Left, Right
    document.addEventListener('keydown', function(e) {
      if (currentModalIndex === -1) return; // modal not open
      if (e.key === 'Escape') closeProjectModal();
      if (e.key === 'ArrowLeft') { e.preventDefault(); navigateModal(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigateModal(1); }
    });
  }

  /**
   * Load and render all projects
   */
  async function loadProjects() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const projects = data.projects || [];

      const activeProjects = projects
        .filter(p => !isConceptionProject(p) && p.display?.showInResume)
        .sort(sortByStatus);
      const conceptionProjects = projects.filter(p => isConceptionProject(p));

      const featuredContainer = document.getElementById('featured-projects-list');
      if (featuredContainer) {
        featuredContainer.innerHTML = activeProjects.map(renderProjectArticle).join('\n');
      }

      const conceptionContainer = document.getElementById('conception-projects-grid');
      if (conceptionContainer && conceptionProjects.length > 0) {
        conceptionContainer.innerHTML = conceptionProjects.map(renderConceptionItem).join('\n');
      }

      // Re-initialize fade animations for dynamically added elements
      if (typeof window.initializeFadeAnimations === 'function') {
        window.initializeFadeAnimations();
      } else {
        const fadeElements = document.querySelectorAll('.fade-up:not(.visible)');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        fadeElements.forEach(el => observer.observe(el));
      }

      // Wire modal handlers after dynamic content is loaded
      wireModalHandlers();

    } catch (error) {
      console.error('Failed to load projects:', error);
      // Projects will remain hardcoded as fallback
      // Still wire modal handlers for hardcoded cards
      wireModalHandlers();
    }
  }

  /**
   * Initialize project loader on DOM ready
   */
  function init() {
    if (document.getElementById('featured-projects-list') || document.getElementById('conception-projects-grid')) {
      loadProjects();
    } else {
      // No project containers, but still wire modal if cards exist
      wireModalHandlers();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
