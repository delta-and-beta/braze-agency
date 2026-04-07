#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const AGENCY_NAME = 'braze';
const SETTINGS_PATH = join(homedir(), '.claude', 'settings.json');

const command = process.argv[2] || 'register';
const flags = process.argv.slice(3);

switch (command) {
  case 'register':
    register();
    break;
  case 'unregister':
    unregister();
    break;
  case 'status':
    status();
    break;
  case 'search':
    execFileSync('node', [join(__dirname, 'search.mjs'), ...flags], { stdio: 'inherit' });
    break;
  case 'learn':
    execFileSync('node', [join(__dirname, 'learned.mjs'), 'save', ...flags], { stdio: 'inherit' });
    break;
  case 'recall':
    execFileSync('node', [join(__dirname, 'learned.mjs'), 'search', ...flags], { stdio: 'inherit' });
    break;
  case 'learned':
    execFileSync('node', [join(__dirname, 'learned.mjs'), 'list', ...flags], { stdio: 'inherit' });
    break;
  default:
    console.log(`
${AGENCY_NAME}-agency — Braze specialist agents for Claude Code

Commands:
  register    Register plugin with Claude Code
  unregister  Remove plugin from Claude Code
  status      Show registration and content status
  search      Search the knowledge base
  learn       Save a learned insight (query + synthesis)
  recall      Search prior learnings for a query
  learned     List all learned insights

Usage:
  ${AGENCY_NAME}-agency search "your query"
  ${AGENCY_NAME}-agency search "query" --topic --limit 10
  ${AGENCY_NAME}-agency learn --query "question" --synthesis "findings" --distilled "one-liner"
  ${AGENCY_NAME}-agency recall "query"
  ${AGENCY_NAME}-agency learned

Install via Homebrew:
  brew install ${AGENCY_NAME}-agency    # installs + registers automatically
  brew uninstall ${AGENCY_NAME}-agency  # removes + unregisters
`);
}

function readSettings() {
  if (!existsSync(SETTINGS_PATH)) return {};
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function writeSettings(settings) {
  mkdirSync(dirname(SETTINGS_PATH), { recursive: true });
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n');
}

function register() {
  console.log(`Registering ${AGENCY_NAME}-agency with Claude Code...\n`);

  // Use claude CLI to register via marketplace (proper agent + skill + command discovery)
  try {
    execFileSync('claude', ['plugin', 'marketplace', 'add', PACKAGE_ROOT], { stdio: 'pipe' });
    console.log(`  ✓ Marketplace added`);
  } catch (e) {
    // Already added or claude not available
    if (String(e).includes('already')) {
      console.log(`  ✓ Marketplace already added`);
    } else {
      console.error(`  ✗ Failed to add marketplace (is claude CLI installed?)`);
      console.error(`    Run manually: claude plugin marketplace add ${PACKAGE_ROOT}`);
    }
  }

  try {
    execFileSync('claude', ['plugin', 'install', `${AGENCY_NAME}@${AGENCY_NAME}-agency`], { stdio: 'pipe' });
    console.log(`  ✓ Plugin installed`);
  } catch (e) {
    if (String(e).includes('already')) {
      console.log(`  ✓ Plugin already installed`);
    } else {
      console.error(`  ✗ Failed to install plugin`);
      console.error(`    Run manually: claude plugin install ${AGENCY_NAME}@${AGENCY_NAME}-agency`);
    }
  }

  // Count what's available
  const agentsDir = join(PACKAGE_ROOT, 'agents');
  const agents = existsSync(agentsDir)
    ? readdirSync(agentsDir).filter(f => f.endsWith('.md'))
    : [];

  console.log(`
✓ ${AGENCY_NAME}-agency registered!

  Plugin:  ${PACKAGE_ROOT}
  Agents:  ${agents.length}
  Skill:   /${AGENCY_NAME}
  Search:  ${AGENCY_NAME}-agency search "query"

  Restart Claude Code to activate.
`);
}

function unregister() {
  console.log(`Unregistering ${AGENCY_NAME}-agency from Claude Code...\n`);

  const settings = readSettings();
  if (settings.plugins) {
    const before = settings.plugins.length;
    settings.plugins = settings.plugins.filter(p => p !== PACKAGE_ROOT);
    if (settings.plugins.length < before) {
      writeSettings(settings);
      console.log(`  ✓ Removed from ${SETTINGS_PATH}`);
    } else {
      console.log(`  ✓ Not registered (nothing to remove)`);
    }
  } else {
    console.log(`  ✓ Not registered (nothing to remove)`);
  }

  console.log(`\n✓ ${AGENCY_NAME}-agency unregistered.`);
}

function status() {
  console.log(`${AGENCY_NAME}-agency status:\n`);

  // Registration
  const settings = readSettings();
  const isRegistered = (settings.plugins || []).includes(PACKAGE_ROOT);
  console.log('  Registered: ' + (isRegistered ? '✓ yes' : '✗ no (run: ' + AGENCY_NAME + '-agency register)'));
  console.log(`  Plugin:     ${PACKAGE_ROOT}`);

  // Agents
  const agentsDir = join(PACKAGE_ROOT, 'agents');
  const agents = existsSync(agentsDir)
    ? readdirSync(agentsDir).filter(f => f.endsWith('.md'))
    : [];
  console.log(`  Agents:     ${agents.length}`);
  for (const a of agents) console.log(`    ✓ ${AGENCY_NAME}:${a.replace('.md', '')}`);

  // Skills
  const skillsDir = join(PACKAGE_ROOT, 'skills');
  const skillCount = existsSync(skillsDir)
    ? readdirSync(skillsDir).filter(d => existsSync(join(skillsDir, d, 'SKILL.md'))).length
    : 0;
  console.log(`  Skills:     ${skillCount}`);

  // Search
  const searchPath = join(__dirname, 'search.mjs');
  console.log(`  Search:     ${existsSync(searchPath) ? '✓ CLI' : '✗ missing'}`);

  // Memory
  const memoryPath = join(PACKAGE_ROOT, 'memory.db');
  if (existsSync(memoryPath)) {
    const size = Math.round(statSync(memoryPath).size / 1024 / 1024);
    console.log(`  Memory:     ✓ ${size}MB`);
  } else {
    console.log(`  Memory:     ✗ missing`);
  }
}
