#!/usr/bin/env node

import { existsSync, mkdirSync, symlinkSync, readdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const AGENCY_NAME = 'braze';
const CLAUDE_AGENTS_DIR = join(homedir(), '.claude', 'agents');
const CLAUDE_COMMANDS_DIR = join(homedir(), '.claude', 'commands');

const command = process.argv[2] || 'install';
const flags = process.argv.slice(3);

switch (command) {
  case 'install':
    install();
    break;
  case 'uninstall':
    uninstall();
    break;
  case 'status':
    status();
    break;
  default:
    console.log(`
braze-agency — Braze platform specialist agents for Claude Code

Commands:
  install     Install agents, search CLI, and /${AGENCY_NAME} skill
  uninstall   Remove agents and skill
  status      Show installation status

Options:
  --model <model>   Set agent model: opus, sonnet, haiku, inherit (default: inherit)

Usage:
  npx braze-agency install
  npx braze-agency install --model opus
  npx braze-agency uninstall
  npx braze-agency status
`);
}

function getModelFlag() {
  const idx = flags.indexOf('--model');
  if (idx !== -1 && flags[idx + 1]) {
    const model = flags[idx + 1];
    if (['opus', 'sonnet', 'haiku', 'inherit'].includes(model)) return model;
    console.error(`Invalid model: ${model}. Use opus, sonnet, haiku, or inherit.`);
    process.exit(1);
  }
  return null;
}

function resolveModel() {
  return getModelFlag() || 'inherit';
}

function install() {
  const model = resolveModel();
  console.log('Installing braze-agency...\n');
  console.log(`  Model: ${model === 'inherit' ? 'inherit (follows your active model)' : model}`);

  // Step 1: Install agents to ~/.claude/agents/
  mkdirSync(CLAUDE_AGENTS_DIR, { recursive: true });
  const agentsDir = join(PACKAGE_ROOT, 'agents');
  const agents = readdirSync(agentsDir).filter(f => f.endsWith('.md'));

  for (const file of agents) {
    const linkPath = join(CLAUDE_AGENTS_DIR, `${AGENCY_NAME}-${file}`);
    const sourcePath = join(agentsDir, file);

    if (model !== 'inherit') {
      let content = readFileSync(sourcePath, 'utf-8');
      content = content.replace(/^model: .+$/m, `model: ${model}`);
      if (existsSync(linkPath)) rmSync(linkPath, { force: true });
      writeFileSync(linkPath, content);
    } else {
      if (existsSync(linkPath)) rmSync(linkPath, { force: true });
      symlinkSync(sourcePath, linkPath);
    }
  }
  console.log(`  ✓ ${agents.length} agents installed`);

  // Step 2: Symlink /{name} skill to ~/.claude/commands/
  const commandSource = join(PACKAGE_ROOT, 'commands', AGENCY_NAME);
  if (existsSync(commandSource)) {
    mkdirSync(CLAUDE_COMMANDS_DIR, { recursive: true });
    const commandLink = join(CLAUDE_COMMANDS_DIR, AGENCY_NAME);
    if (existsSync(commandLink)) rmSync(commandLink, { recursive: true, force: true });
    symlinkSync(commandSource, commandLink);
    console.log(`  ✓ /${AGENCY_NAME} skill installed`);
  }

  // Step 3: Remove old MCP server if registered (migration from MCP to CLI)
  try {
    execFileSync('claude', ['mcp', 'remove', `${AGENCY_NAME}-agency`], { stdio: 'pipe' });
    console.log(`  ✓ Removed old MCP server (replaced by CLI search)`);
  } catch {
    // Not registered — that's fine
  }

  console.log(`
✓ braze-agency installed!

  Agents:  ${agents.map(f => AGENCY_NAME + '-' + f.replace('.md', '')).join(', ')}
  Skill:   /${AGENCY_NAME} (search + dispatch)
  Search:  node ${join(PACKAGE_ROOT, 'bin', 'search.mjs')} "query"
  Model:   ${model === 'inherit' ? 'inherit (uses your active model)' : model}

  Restart Claude Code to activate.
`);
}

function uninstall() {
  console.log('Uninstalling braze-agency...\n');

  // Remove agents
  if (existsSync(CLAUDE_AGENTS_DIR)) {
    const files = readdirSync(CLAUDE_AGENTS_DIR)
      .filter(f => f.startsWith(`${AGENCY_NAME}-`) && f.endsWith('.md'));
    for (const file of files) {
      rmSync(join(CLAUDE_AGENTS_DIR, file), { force: true });
    }
    console.log(`  ✓ ${files.length} agents removed`);
  }

  // Remove skill
  const commandLink = join(CLAUDE_COMMANDS_DIR, AGENCY_NAME);
  if (existsSync(commandLink)) {
    rmSync(commandLink, { recursive: true, force: true });
    console.log(`  ✓ /${AGENCY_NAME} skill removed`);
  }

  // Remove MCP if still registered
  try {
    execFileSync('claude', ['mcp', 'remove', `${AGENCY_NAME}-agency`], { stdio: 'pipe' });
    console.log(`  ✓ MCP server removed`);
  } catch { /* not registered */ }

  console.log('\n✓ braze-agency uninstalled.');
}

function status() {
  console.log('braze-agency status:\n');

  // Agents
  const linkedAgents = existsSync(CLAUDE_AGENTS_DIR)
    ? readdirSync(CLAUDE_AGENTS_DIR).filter(f => f.startsWith(`${AGENCY_NAME}-`))
    : [];
  console.log(`  Agents:  ${linkedAgents.length} installed`);
  if (linkedAgents.length > 0) {
    const first = join(CLAUDE_AGENTS_DIR, linkedAgents[0]);
    try {
      const content = readFileSync(first, 'utf-8');
      const modelMatch = content.match(/^model: (.+)$/m);
      if (modelMatch) console.log(`  Model:   ${modelMatch[1]}`);
    } catch { /* broken symlink */ }
  }
  for (const a of linkedAgents) console.log(`    ✓ ${a.replace('.md', '')}`);

  // Skill
  const hasSkill = existsSync(join(CLAUDE_COMMANDS_DIR, AGENCY_NAME));
  console.log(`  Skill:   ${hasSkill ? `✓ /${AGENCY_NAME}` : '✗ not installed'}`);

  // Search
  const searchPath = join(PACKAGE_ROOT, 'bin', 'search.mjs');
  console.log(`  Search:  ${existsSync(searchPath) ? '✓ CLI' : '✗ missing'}`);

  // Knowledge
  const memoryPath = join(PACKAGE_ROOT, 'memory.db');
  console.log(`  Memory:  ${existsSync(memoryPath) ? '✓ ' + Math.round(require('fs').statSync(memoryPath).size / 1024 / 1024) + 'MB' : '✗ missing'}`);
  const skillsDir = join(PACKAGE_ROOT, 'skills');
  const skillCount = existsSync(skillsDir) ? readdirSync(skillsDir).length : 0;
  console.log(`  Skills:  ${skillCount}`);
}
