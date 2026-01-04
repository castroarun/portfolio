#!/usr/bin/env node
/**
 * Project Sync Script
 *
 * Reads projects.json and updates:
 * - resume/index.html (What I'm Building section)
 * - index.html (Featured Work section)
 * - docs/mockups/resume-digital.html (source file)
 *
 * Usage: node scripts/sync-projects.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const PROJECTS_JSON = path.join(ROOT, 'docs', 'projects.json');
const RESUME_HTML = path.join(ROOT, 'resume', 'index.html');
const PORTFOLIO_HTML = path.join(ROOT, 'index.html');
const MOCKUP_RESUME = path.join(ROOT, 'docs', 'mockups', 'resume-digital.html');

// Load projects
function loadProjects() {
  const data = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'));
  return data;
}

// Generate status dot HTML
function getStatusDot(status, config) {
  const statusInfo = config[status] || config.building;
  return `<span class="status-dot" style="background: ${statusInfo.color}; box-shadow: 0 0 6px ${statusInfo.glowColor};"></span>`;
}

// Generate project card HTML for resume (simple-card style)
function generateResumeCard(project, statusConfig) {
  const statusInfo = statusConfig[project.status] || statusConfig.building;

  return `
              <div class="simple-card" data-status="${project.status}">
                <div class="simple-card-header">
                  <span class="status-dot ${project.status}"></span>
                  <h4>${project.name}</h4>
                </div>
                <p class="simple-card-desc">${project.description}</p>
                <div class="simple-card-tech">
                  ${project.technologies.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
                </div>
              </div>`;
}

// Generate featured project HTML for portfolio
function generatePortfolioProject(project, index) {
  const isEven = index % 2 === 0;

  return `
          <!-- ${project.name} -->
          <article class="project ${isEven ? '' : 'project-reverse'}">
            <div class="project-content">
              <p class="project-overline">Featured Project</p>
              <h3 class="project-title">${project.name}</h3>
              <div class="project-description">
                <p>${project.longDescription || project.description}</p>
              </div>
              <ul class="project-tech-list">
                ${project.technologies.map(t => `<li>${t}</li>`).join('\n                ')}
              </ul>
              <div class="project-links">
                ${project.githubRepo ? `<a href="https://github.com/${project.githubRepo}" target="_blank" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>` : ''}
              </div>
            </div>
            <div class="project-image">
              <div class="project-image-wrapper">
                <img src="assets/projects/${project.id}.png" alt="${project.name} Screenshot" loading="lazy" onerror="this.style.display='none'">
              </div>
            </div>
          </article>`;
}

// Generate legend counts
function generateLegendCounts(projects) {
  const counts = {
    all: projects.length,
    live: projects.filter(p => p.status === 'live').length,
    building: projects.filter(p => p.status === 'building').length,
    planning: projects.filter(p => p.status === 'planning').length,
    ideating: projects.filter(p => p.status === 'ideating').length
  };
  return counts;
}

// Update HTML file with new content between markers
function updateHtmlSection(filePath, startMarker, endMarker, newContent) {
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipped: ${filePath} (not found)`);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.log(`  Skipped: ${filePath} (markers not found)`);
    return false;
  }

  const before = html.substring(0, startIdx + startMarker.length);
  const after = html.substring(endIdx);

  html = before + '\n' + newContent + '\n            ' + after;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  Updated: ${filePath}`);
  return true;
}

// Main sync function
function syncProjects() {
  console.log('\\n=== Project Sync Script ===\\n');

  // Load data
  const data = loadProjects();
  const { projects, statusConfig } = data;

  console.log(`Loaded ${projects.length} projects from projects.json\\n`);

  // Filter projects for resume
  const resumeProjects = projects.filter(p => p.showInResume);
  console.log(`Resume projects: ${resumeProjects.length}`);

  // Filter projects for portfolio (featured only)
  const portfolioProjects = projects.filter(p => p.showInPortfolio && p.featured);
  console.log(`Portfolio featured projects: ${portfolioProjects.length}`);

  // Generate resume cards HTML
  const resumeCardsHtml = resumeProjects
    .map(p => generateResumeCard(p, statusConfig))
    .join('\\n');

  // Generate portfolio projects HTML
  const portfolioProjectsHtml = portfolioProjects
    .map((p, i) => generatePortfolioProject(p, i))
    .join('\\n');

  // Update legend counts
  const counts = generateLegendCounts(resumeProjects);

  console.log('\\nUpdating HTML files...');

  // Note: For safety, we're using markers in the HTML
  // Add these markers to your HTML files:
  // <!-- PROJECT_CARDS_START --> and <!-- PROJECT_CARDS_END -->
  // <!-- FEATURED_PROJECTS_START --> and <!-- FEATURED_PROJECTS_END -->

  // For now, just output what would be generated
  console.log('\\n--- Generated Resume Cards ---');
  console.log(`${resumeProjects.length} cards ready`);

  console.log('\\n--- Generated Portfolio Projects ---');
  console.log(`${portfolioProjects.length} featured projects ready`);

  console.log('\\n--- Legend Counts ---');
  console.log(`All: ${counts.all}, Live: ${counts.live}, Building: ${counts.building}, Planning: ${counts.planning}, Ideating: ${counts.ideating}`);

  // Update meta
  data.meta.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PROJECTS_JSON, JSON.stringify(data, null, 2), 'utf8');
  console.log('\\nUpdated lastUpdated in projects.json');

  console.log('\\n=== Sync Complete ===\\n');

  // Return data for programmatic use
  return {
    resumeCardsHtml,
    portfolioProjectsHtml,
    counts,
    projects: resumeProjects
  };
}

// Generate README for a project
function generateReadme(project) {
  const statusBadge = {
    live: '![Status](https://img.shields.io/badge/Status-Live-22C55E)',
    building: '![Status](https://img.shields.io/badge/Status-Building-F59E0B)',
    planning: '![Status](https://img.shields.io/badge/Status-Planning-3B82F6)',
    ideating: '![Status](https://img.shields.io/badge/Status-Ideating-A855F7)'
  };

  return `# ${project.name}

${statusBadge[project.status] || ''}

> ${project.tagline}

${project.longDescription || project.description}

## Tech Stack

${project.technologies.map(t => `- ${t}`).join('\\n')}

## Progress

${project.progress}% complete

---

*Part of the [Castronix Portfolio](https://castroarun.github.io/portfolio/)*
`;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Project Sync Script

Usage:
  node sync-projects.js          Run sync (dry run)
  node sync-projects.js --readme Generate README for a project
  node sync-projects.js --help   Show this help

Environment:
  Projects are read from: docs/projects.json
  HTML files updated: resume/index.html, index.html
`);
  } else if (args.includes('--readme')) {
    const projectId = args[args.indexOf('--readme') + 1];
    const data = loadProjects();
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      console.log(generateReadme(project));
    } else {
      console.log(`Project not found: ${projectId}`);
      console.log('Available:', data.projects.map(p => p.id).join(', '));
    }
  } else {
    syncProjects();
  }
}

module.exports = { syncProjects, loadProjects, generateReadme };
