/**
 * Dynamic Project Loader
 * Loads projects from data/projects.json and renders them to the portfolio
 *
 * Logic:
 * - Projects with status "idea" or "discovery" → Under Conception section
 * - All other projects → Main Featured Projects section (sorted by status)
 * - All hints/descriptions come from projects.json (single source of truth)
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

  // Category to overline mapping
  const CATEGORY_OVERLINES = {
    featured: 'Featured Project',
    personal: 'Personal Project',
    music: 'Creative Project'
  };

  // Full descriptions for portfolio (can be overridden in JSON with "portfolioDescription")
  const FULL_DESCRIPTIONS = {
    reppit: 'A mobile strength training app that tracks and prompts your workouts, rest periods, and progress. Features timer modes, workout history, and detailed analytics for all - beginners to serious lifters.',
    noteapp: 'A notes app with real-time sync across devices. Features markdown support, folder organization, and AI-powered search to find any note instantly. Built for speed and simplicity.',
    primmo: 'An agentic AI strength coach that communicates via WhatsApp and voice calls. Leverages workout data from REPPIT to provide personalized training guidance, form corrections, and motivation.',
    portfolio: 'Interactive digital resume with AI chat assistant, skills radar, project showcase cards, and 9-step workflow visualization. Crafted to showcase technical depth and design sensibility.',
    anycalc: 'Smart calculator with presets for EMI, tips, splits, and everyday calculations. A versatile calculator for all your daily decision-making needs.',
    cinder: 'AI-assisted original music production. A creative exploration blending technology with artistic expression. Themes of warmth, nostalgia, and human connection.',
    littlereddot: 'AI-assisted original music celebrating Singapore. Themes of identity, culture, and the island\'s unique spirit. A tribute to the little red dot on the map.'
  };

  // Tech stack overrides (portfolio may show different tech than JSON)
  const TECH_OVERRIDES = {
    reppit: ['Flutter', 'Dart', 'SQLite', 'Riverpod'],
    noteapp: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    primmo: ['Next.js', 'TypeScript', 'WhatsApp API', 'Voice AI'],
    portfolio: ['HTML', 'CSS', 'JavaScript', 'Chart.js']
  };

  /**
   * Check if a project is in conception stage (concept or exploring)
   */
  function isConceptionProject(project) {
    return project.status === 'concept' || project.status === 'exploring';
  }

  /**
   * Sort projects by status priority
   */
  function sortByStatus(a, b) {
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

    // GitHub link
    if (links.github) {
      html += `
        <a href="${links.github}" class="project-link-icon" aria-label="GitHub" target="_blank">
          ${SVG_ICONS.github}
        </a>`;
    }

    // Preview/External link
    if (links.preview && links.preview !== '#') {
      html += `
        <a href="${links.preview}" class="project-link-icon" aria-label="External Link" target="_blank">
          ${SVG_ICONS.external}
        </a>`;
    } else if (links.preview === '#' && project.status === 'building') {
      // Coming soon indicator
      html += `
        <a href="#" class="project-link-icon" aria-label="Coming Soon">
          ${SVG_ICONS.clock}
        </a>`;
    } else if (links.preview === '#') {
      // Default external link placeholder
      html += `
        <a href="#" class="project-link-icon" aria-label="External Link">
          ${SVG_ICONS.external}
        </a>`;
    }

    // Spotify link (for music projects)
    if (links.spotify) {
      html += `
        <a href="${links.spotify}" class="project-link-icon" aria-label="Spotify" target="_blank">
          ${SVG_ICONS.spotify}
        </a>`;
    }

    return html;
  }

  /**
   * Generate HTML for a featured project article
   */
  function renderProjectArticle(project) {
    const overline = CATEGORY_OVERLINES[project.category] || 'Project';
    // Use statusHint from JSON (single source of truth)
    const hint = project.statusHint || null;
    // Use portfolioDescription if available, then FULL_DESCRIPTIONS fallback, then JSON description
    const description = project.portfolioDescription || FULL_DESCRIPTIONS[project.id] || project.description;
    const techStack = TECH_OVERRIDES[project.id] || project.tech;

    let hintHtml = '';
    if (hint) {
      // Use green (launch-hint) for live/shipped, amber (status-hint) for crafting/beta
      const hintClass = ['live', 'shipped'].includes(project.status)
        ? 'project-launch-hint'
        : 'project-status-hint';
      hintHtml = `<span class="${hintClass}">${hint}</span>`;
    }

    return `
      <article class="featured-project fade-up">
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

      // Split projects by status
      const activeProjects = projects
        .filter(p => !isConceptionProject(p) && p.display?.showInResume)
        .sort(sortByStatus);
      const conceptionProjects = projects.filter(p => isConceptionProject(p));

      // Render all active projects in the main featured section (sorted by status)
      const featuredContainer = document.getElementById('featured-projects-list');
      if (featuredContainer) {
        featuredContainer.innerHTML = activeProjects.map(renderProjectArticle).join('\n');
      }

      // Render conception projects
      const conceptionContainer = document.getElementById('conception-projects-grid');
      if (conceptionContainer && conceptionProjects.length > 0) {
        conceptionContainer.innerHTML = conceptionProjects.map(renderConceptionItem).join('\n');
      }

      // Re-initialize fade animations for dynamically added elements
      if (typeof window.initializeFadeAnimations === 'function') {
        window.initializeFadeAnimations();
      } else {
        // Fallback: manually trigger fade-up for new elements
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

    } catch (error) {
      console.error('Failed to load projects:', error);
      // Projects will remain hardcoded as fallback
    }
  }

  /**
   * Initialize project loader on DOM ready
   */
  function init() {
    // Only load if containers exist
    if (document.getElementById('featured-projects-list') || document.getElementById('conception-projects-grid')) {
      loadProjects();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
