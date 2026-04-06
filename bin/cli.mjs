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
  install     Install agents and register MCP server
  uninstall   Remove agents and MCP registration
  status      Show installation status

Options:
  --model <model>   Set agent model: opus, sonnet, haiku, inherit (default: inherit)

Usage:
  npx braze-agency install                  # uses model: inherit (follows your plan)
  npx braze-agency install --model opus     # forces opus (Pro/Max plans)
  npx braze-agency install --model sonnet   # forces sonnet (all plans)
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

function detectPlan() {
  // Try to detect Claude plan from the CLI
  try {
    const output = execFileSync('claude', ['--version'], { encoding: 'utf-8', timeout: 5000 });
    // Claude Code doesn't expose plan info via CLI currently
    // Return null to fall back to inherit
    return null;
  } catch {
    return null;
  }
}

function resolveModel() {
  const explicit = getModelFlag();
  if (explicit) return explicit;

  // Default: inherit (agent uses whatever model the conversation is using)
  // This respects all plan types automatically
  return 'inherit';
}

function install() {
  const model = resolveModel();
  console.log('Installing braze-agency...\n');
  console.log(`  Model: ${model === 'inherit' ? 'inherit (follows your active model)' : model}`);

  // Step 1: Symlink agents to ~/.claude/agents/ with model override
  mkdirSync(CLAUDE_AGENTS_DIR, { recursive: true });
  const agentsDir = join(PACKAGE_ROOT, 'agents');
  const agents = readdirSync(agentsDir).filter(f => f.endsWith('.md'));

  for (const file of agents) {
    const linkPath = join(CLAUDE_AGENTS_DIR, `${AGENCY_NAME}-${file}`);
    const sourcePath = join(agentsDir, file);

    if (model !== 'inherit') {
      // Copy (not symlink) and override the model in frontmatter
      let content = readFileSync(sourcePath, 'utf-8');
      content = content.replace(/^model: .+$/m, `model: ${model}`);
      if (existsSync(linkPath)) rmSync(linkPath, { force: true });
      writeFileSync(linkPath, content);
    } else {
      // Symlink — agent file already has model: inherit
      if (existsSync(linkPath)) rmSync(linkPath, { force: true });
      symlinkSync(sourcePath, linkPath);
    }
  }
  console.log(`  ✓ ${agents.length} agents installed to ~/.claude/agents/`);

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
  Model:  ${model === 'inherit' ? 'inherit (uses your active model — works on any plan)' : model}
  MCP:    braze-agency (semantic search across 166 skills, 1,304 topics)

  Restart Claude Code to activate.

  Tip: To switch models later, re-run:
    npx braze-agency install --model sonnet
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
    // Already removed
  }

  console.log('\n✓ braze-agency uninstalled.');
}

function status() {
  console.log('braze-agency status:\n');

  const linkedAgents = existsSync(CLAUDE_AGENTS_DIR)
    ? readdirSync(CLAUDE_AGENTS_DIR).filter(f => f.startsWith(`${AGENCY_NAME}-`))
    : [];
  console.log(`  Agents:  ${linkedAgents.length} installed`);

  // Show model of first agent
  if (linkedAgents.length > 0) {
    const first = join(CLAUDE_AGENTS_DIR, linkedAgents[0]);
    try {
      const content = readFileSync(first, 'utf-8');
      const modelMatch = content.match(/^model: (.+)$/m);
      if (modelMatch) console.log(`  Model:   ${modelMatch[1]}`);
    } catch { /* symlink might be broken */ }
  }

  for (const a of linkedAgents) console.log(`    ✓ ${a.replace('.md', '')}`);

  const memoryPath = join(PACKAGE_ROOT, 'memory.db');
  console.log(`  Memory:  ${existsSync(memoryPath) ? '✓ 15MB (bge-m3, 1024-dim)' : '✗ missing'}`);

  const skillsDir = join(PACKAGE_ROOT, 'skills');
  const skillCount = existsSync(skillsDir) ? readdirSync(skillsDir).length : 0;
  console.log(`  Skills:  ${skillCount}`);
  console.log(`  Topics:  1,304`);
}
