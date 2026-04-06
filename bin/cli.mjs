#!/usr/bin/env node

import { existsSync, mkdirSync, symlinkSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const AGENCY_NAME = 'braze';
const CLAUDE_AGENTS_DIR = join(homedir(), '.claude', 'agents');

const command = process.argv[2] || 'install';

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
  install     Install agents and register MCP server
  uninstall   Remove agents and MCP registration
  status      Show installation status

Usage:
  npx @anthropic-apps/braze-agency install
  npx @anthropic-apps/braze-agency uninstall
  npx @anthropic-apps/braze-agency status
`);
}

function install() {
  console.log('Installing braze-agency...\n');

  // Step 1: Symlink agents to ~/.claude/agents/
  mkdirSync(CLAUDE_AGENTS_DIR, { recursive: true });
  const agentsDir = join(PACKAGE_ROOT, 'agents');
  const agents = readdirSync(agentsDir).filter(f => f.endsWith('.md'));

  for (const file of agents) {
    const linkPath = join(CLAUDE_AGENTS_DIR, `${AGENCY_NAME}-${file}`);
    const targetPath = join(agentsDir, file);
    if (existsSync(linkPath)) rmSync(linkPath, { force: true });
    symlinkSync(targetPath, linkPath);
  }
  console.log(`  ✓ ${agents.length} agents linked to ~/.claude/agents/`);

  // Step 2: Register MCP server with Claude Code
  const mcpPath = join(PACKAGE_ROOT, 'bin', 'mcp.mjs');
  try {
    execFileSync('claude', [
      'mcp', 'add', '--scope', 'user', '--transport', 'stdio',
      'braze-agency', '--', 'node', mcpPath
    ], { stdio: 'pipe' });
    console.log('  ✓ MCP server registered (braze-agency)');
  } catch {
    console.log('  ⚠ Could not auto-register MCP server.');
    console.log(`    Run: claude mcp add --scope user --transport stdio braze-agency -- node ${mcpPath}`);
  }

  console.log(`
✓ braze-agency installed!

  Agents: ${agents.map(f => AGENCY_NAME + '-' + f.replace('.md', '')).join(', ')}
  MCP:    braze-agency (semantic search across 166 skills, 1,304 topics)

  Restart Claude Code to activate.
`);
}

function uninstall() {
  console.log('Uninstalling braze-agency...\n');

  if (existsSync(CLAUDE_AGENTS_DIR)) {
    const files = readdirSync(CLAUDE_AGENTS_DIR)
      .filter(f => f.startsWith(`${AGENCY_NAME}-`) && f.endsWith('.md'));
    for (const file of files) {
      rmSync(join(CLAUDE_AGENTS_DIR, file), { force: true });
    }
    console.log(`  ✓ ${files.length} agents removed`);
  }

  try {
    execFileSync('claude', ['mcp', 'remove', 'braze-agency'], { stdio: 'pipe' });
    console.log('  ✓ MCP server unregistered');
  } catch {
    // Already removed or not registered
  }

  console.log('\n✓ braze-agency uninstalled.');
}

function status() {
  console.log('braze-agency status:\n');

  const linkedAgents = existsSync(CLAUDE_AGENTS_DIR)
    ? readdirSync(CLAUDE_AGENTS_DIR).filter(f => f.startsWith(`${AGENCY_NAME}-`))
    : [];
  console.log(`  Agents:  ${linkedAgents.length} installed`);
  for (const a of linkedAgents) console.log(`    ✓ ${a.replace('.md', '')}`);

  const memoryPath = join(PACKAGE_ROOT, 'memory.db');
  console.log(`  Memory:  ${existsSync(memoryPath) ? '✓ 15MB (bge-m3, 1024-dim)' : '✗ missing'}`);

  const skillsDir = join(PACKAGE_ROOT, 'skills');
  const skillCount = existsSync(skillsDir) ? readdirSync(skillsDir).length : 0;
  console.log(`  Skills:  ${skillCount}`);
  console.log(`  Topics:  1,304`);
}
