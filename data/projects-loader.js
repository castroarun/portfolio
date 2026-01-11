/**
 * Projects Loader - Shared data source for CV, Resume, and Portfolio
 * Loads projects from projects.json and renders them dynamically
 */

class ProjectsLoader {
  constructor() {
    this.projects = [];
    this.loaded = false;
  }

  async load() {
    if (this.loaded) return this.projects;

    try {
      // Determine the base path based on current location
      const basePath = this.getBasePath();
      const response = await fetch(`${basePath}data/projects.json`);
      const data = await response.json();
      this.projects = data.projects;
      this.loaded = true;
      return this.projects;
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }

  getBasePath() {
    const path = window.location.pathname;
    // Handle different page locations
    if (path.includes('/cv/') || path.includes('/resume/')) {
      return '../';
    }
    return './';
  }

  // Get all projects
  getAll() {
    return this.projects;
  }

  // Get featured projects
  getFeatured() {
    return this.projects.filter(p => p.featured);
  }

  // Get projects by category
  getByCategory(category) {
    return this.projects.filter(p => p.category === category);
  }

  // Get project by ID
  getById(id) {
    return this.projects.find(p => p.id === id);
  }

  // Render projects grid for CV (compact 3-column layout)
  renderCVGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = this.projects.map(project => {
      const statusHtml = project.statusText
        ? `<span style="color: ${project.statusColor}; font-size: 0.7rem;">(${project.statusText})</span>`
        : '';

      return `
        <div class="project-card">
          <p class="project-name">${project.name} ${statusHtml}</p>
          <p class="project-tech">${project.tech.join(', ')}</p>
          <p class="project-desc">${project.description}</p>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Render projects for Resume (detailed cards)
  renderResumeGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = this.projects.map(project => {
      const statusHtml = project.statusText
        ? `<span class="project-status" style="color: ${project.statusColor};">${project.statusText}</span>`
        : '';

      return `
        <div class="project-card" data-project="${project.id}">
          <div class="project-header">
            <h3 class="project-name">${project.name}</h3>
            ${statusHtml}
          </div>
          <div class="project-tech">${project.tech.join(' • ')}</div>
          <p class="project-desc">${project.description}</p>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  // Render projects for Portfolio (featured cards with images)
  renderPortfolioFeatured(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const featured = this.getFeatured();
    const html = featured.map(project => {
      const statusHtml = project.statusText
        ? `<span class="project-status-hint" style="color: ${project.statusColor};">(${project.statusText})</span>`
        : '';

      return `
        <div class="project-card">
          <div class="project-image">
            <img src="${project.image}" alt="${project.name}">
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.name} ${statusHtml}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">
              ${project.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }
}

// Export for use
const projectsLoader = new ProjectsLoader();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await projectsLoader.load();

  // Auto-render if containers exist
  if (document.getElementById('cv-projects-grid')) {
    projectsLoader.renderCVGrid('cv-projects-grid');
  }
  if (document.getElementById('resume-projects-grid')) {
    projectsLoader.renderResumeGrid('resume-projects-grid');
  }
  if (document.getElementById('portfolio-featured-grid')) {
    projectsLoader.renderPortfolioFeatured('portfolio-featured-grid');
  }
});
