#!/usr/bin/env node
/**
 * Project Sync Script v2
 *
 * Reads project data from each project's .project.json file
 * and aggregates into the portfolio.
 *
 * Source: Each project folder has .project.json + assets/screenshot.png
 * Target: docs/projects.json, resume/index.html, index.html
 *
 * Usage: node scripts/sync-projects.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const PROJECTS_ROOT = 'C:\\Users\\Castro\\Documents\\Projects';
const PORTFOLIO_ROOT = path.join(PROJECTS_ROOT, 'castronix-portfolio');
const PROJECTS_JSON = path.join(PORTFOLIO_ROOT, 'docs', 'projects.json');
const ASSETS_DIR = path.join(PORTFOLIO_ROOT, 'assets', 'projects');

// Known project folders (mapped from projects.json localPath)
const PROJECT_FOLDERS = [
  { id: 'reppit', folder: 'strength_profile_tracker' },
  { id: 'noteapp', folder: 'noteApp' },
  { id: 'primmo', folder: 'PRIMMO' },
  { id: 'portfolio', folder: 'castronix-portfolio' },
  { id: 'portfolio-optimizer', folder: 'quantflow' },
  { id: 'backtest-pro', folder: 'Covered_Calls' },
  // Projects without local folders
  { id: 'spotify-songs', folder: null },
  { id: 'space-race-ml', folder: null }
];

// Load existing projects.json as fallback
function loadExistingProjects() {
  try {
    return JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'));
  } catch (e) {
    return { projects: [], statusConfig: {} };
  }
}

// Read .project.json from a project folder
function readProjectConfig(folderName) {
  if (!folderName) return null;

  const projectPath = path.join(PROJECTS_ROOT, folderName, '.project.json');
  try {
    if (fs.existsSync(projectPath)) {
      return JSON.parse(fs.readFileSync(projectPath, 'utf8'));
    }
  } catch (e) {
    console.log(`  Warning: Could not read ${projectPath}`);
  }
  return null;
}

// Copy screenshot from project to portfolio assets
function copyScreenshot(folderName, projectId) {
  if (!folderName) return false;

  const possiblePaths = [
    path.join(PROJECTS_ROOT, folderName, 'assets', 'screenshot.png'),
    path.join(PROJECTS_ROOT, folderName, 'assets', 'preview.png'),
    path.join(PROJECTS_ROOT, folderName, 'screenshot.png'),
    path.join(PROJECTS_ROOT, folderName, 'docs', 'screenshot.png')
  ];

  for (const srcPath of possiblePaths) {
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(ASSETS_DIR, `${projectId}.png`);
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  Copied: ${srcPath} -> ${destPath}`);
        return true;
      } catch (e) {
        console.log(`  Error copying ${srcPath}: ${e.message}`);
      }
    }
  }
  return false;
}

// Merge project config with existing data
function mergeProjectData(existing, fromFolder) {
  if (!fromFolder) return existing;

  return {
    ...existing,
    name: fromFolder.name || existing.name,
    tagline: fromFolder.tagline || existing.tagline,
    description: fromFolder.description || existing.description,
    status: fromFolder.status || existing.status,
    progress: fromFolder.progress ?? existing.progress,
    technologies: fromFolder.technologies || existing.technologies,
    category: fromFolder.category || existing.category,
    featured: fromFolder.featured ?? existing.featured,
    githubRepo: fromFolder.githubRepo || existing.githubRepo
  };
}

// Main sync function
function syncProjects() {
  console.log('\n=== Project Sync Script v2 ===\n');
  console.log('Reading from project folders...\n');

  // Load existing data
  const existingData = loadExistingProjects();
  const existingProjects = existingData.projects || [];

  // Create lookup map
  const projectMap = {};
  existingProjects.forEach(p => { projectMap[p.id] = p; });

  // Process each project folder
  let updated = 0;
  let screenshots = 0;

  for (const { id, folder } of PROJECT_FOLDERS) {
    const existing = projectMap[id];
    if (!existing) {
      console.log(`  Skipping ${id}: not in projects.json`);
      continue;
    }

    console.log(`Processing: ${id} (${folder || 'no local folder'})`);

    // Read .project.json if exists
    const folderConfig = readProjectConfig(folder);
    if (folderConfig) {
      projectMap[id] = mergeProjectData(existing, folderConfig);
      updated++;
      console.log(`  Updated from .project.json`);
    }

    // Copy screenshot if exists
    if (copyScreenshot(folder, id)) {
      screenshots++;
    }
  }

  // Update projects.json
  existingData.projects = Object.values(projectMap);
  existingData.meta = existingData.meta || {};
  existingData.meta.lastUpdated = new Date().toISOString().split('T')[0];
  existingData.meta.lastSync = new Date().toISOString();

  fs.writeFileSync(PROJECTS_JSON, JSON.stringify(existingData, null, 2), 'utf8');

  // Summary
  console.log('\n--- Sync Summary ---');
  console.log(`Projects processed: ${PROJECT_FOLDERS.length}`);
  console.log(`Updated from .project.json: ${updated}`);
  console.log(`Screenshots copied: ${screenshots}`);
  console.log(`\nUpdated: docs/projects.json`);
  console.log('\n=== Sync Complete ===\n');

  return existingData;
}

// Initialize .project.json in a project folder
function initProject(folderName) {
  const projectPath = path.join(PROJECTS_ROOT, folderName);
  const configPath = path.join(projectPath, '.project.json');

  if (!fs.existsSync(projectPath)) {
    console.log(`Error: Folder not found: ${projectPath}`);
    return;
  }

  if (fs.existsSync(configPath)) {
    console.log(`Already exists: ${configPath}`);
    return;
  }

  const template = {
    id: folderName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: folderName,
    tagline: "Short tagline",
    description: "Project description for portfolio",
    status: "building",
    progress: 0,
    technologies: [],
    category: "web-app",
    featured: false,
    screenshot: "assets/screenshot.png",
    githubRepo: null
  };

  fs.writeFileSync(configPath, JSON.stringify(template, null, 2), 'utf8');
  console.log(`Created: ${configPath}`);
  console.log('Edit this file to update your portfolio!');
}

// List projects and their sync status
function listProjects() {
  console.log('\n=== Project Sync Status ===\n');
  console.log('ID'.padEnd(20) + 'Folder'.padEnd(25) + '.project.json'.padEnd(15) + 'Screenshot');
  console.log('-'.repeat(75));

  for (const { id, folder } of PROJECT_FOLDERS) {
    const hasConfig = folder && fs.existsSync(path.join(PROJECTS_ROOT, folder, '.project.json'));
    const hasScreenshot = folder && (
      fs.existsSync(path.join(PROJECTS_ROOT, folder, 'assets', 'screenshot.png')) ||
      fs.existsSync(path.join(PROJECTS_ROOT, folder, 'screenshot.png'))
    );

    console.log(
      id.padEnd(20) +
      (folder || '(none)').padEnd(25) +
      (hasConfig ? 'Yes' : 'No').padEnd(15) +
      (hasScreenshot ? 'Yes' : 'No')
    );
  }
  console.log('');
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === '--help' || command === '-h') {
    console.log(`
Project Sync Script v2

Usage:
  node sync-projects.js              Sync all projects to portfolio
  node sync-projects.js --list       Show sync status of all projects
  node sync-projects.js --init NAME  Initialize .project.json in a folder
  node sync-projects.js --help       Show this help

How it works:
  1. Each project folder can have a .project.json file
  2. This script reads those files and updates docs/projects.json
  3. Screenshots are copied from project folders to assets/projects/

Project folder locations:
  ${PROJECTS_ROOT}\\{folder}\\.project.json
  ${PROJECTS_ROOT}\\{folder}\\assets\\screenshot.png
`);
  } else if (command === '--list' || command === '-l') {
    listProjects();
  } else if (command === '--init' || command === '-i') {
    const folderName = args[1];
    if (!folderName) {
      console.log('Usage: node sync-projects.js --init FOLDER_NAME');
    } else {
      initProject(folderName);
    }
  } else {
    syncProjects();
  }
}

module.exports = { syncProjects, initProject, listProjects };
