#!/usr/bin/env node
/**
 * Learned memory CLI — FTS5 store for agency learnings.
 * Saves synthesized findings from agent runs for future recall.
 *
 * Usage:
 *   learned.mjs save --query "question" --synthesis "full findings" --distilled "one-liner"
 *   learned.mjs search "query" [--limit 5]
 *   learned.mjs list [--limit 20]
 */

import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DB_PATH = join(PACKAGE_ROOT, 'memory.db');

const subcommand = process.argv[2];
const args = process.argv.slice(3);
const flags = {};
const positional = [];

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      flags[key] = args[++i];
    } else {
      flags[key] = true;
    }
  } else {
    positional.push(args[i]);
  }
}

if (!existsSync(DB_PATH)) {
  console.error(JSON.stringify({ error: 'memory.db not found' }));
  process.exit(1);
}

const db = new Database(DB_PATH);

// Ensure learned tables exist
db.exec([
  'CREATE TABLE IF NOT EXISTS learned (',
  '  id TEXT PRIMARY KEY,',
  '  query TEXT NOT NULL,',
  '  synthesis TEXT NOT NULL,',
  '  distilled TEXT NOT NULL,',
  "  agents TEXT DEFAULT '',",
  '  learned_at TEXT NOT NULL',
  ')',
].join('\n'));

const hasFts = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='learned_fts'").get();
if (!hasFts) {
  db.exec([
    'CREATE VIRTUAL TABLE learned_fts USING fts5(',
    '  id, query, synthesis, distilled,',
    "  tokenize='porter unicode61'",
    ')',
  ].join('\n'));
}

if (subcommand === 'save') {
  save();
} else if (subcommand === 'search') {
  searchLearned(positional.join(' '), parseInt(flags.limit) || 5);
} else if (subcommand === 'list') {
  listLearned(parseInt(flags.limit) || 20);
} else {
  console.log('Usage:\n  learned.mjs save --query "..." --synthesis "..." --distilled "..."\n  learned.mjs search "query" [--limit 5]\n  learned.mjs list [--limit 20]');
}

function save() {
  const query = flags.query;
  const synthesis = flags.synthesis;
  const distilled = flags.distilled;
  const agents = flags.agents || '';

  if (!query || !synthesis || !distilled) {
    console.error(JSON.stringify({ error: 'Required: --query, --synthesis, --distilled' }));
    process.exit(1);
  }

  const id = 'learned-' + Date.now().toString(36);
  const now = new Date().toISOString();

  db.prepare('INSERT INTO learned (id, query, synthesis, distilled, agents, learned_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, query, synthesis, distilled, agents, now);

  db.prepare('INSERT INTO learned_fts (id, query, synthesis, distilled) VALUES (?, ?, ?, ?)')
    .run(id, query, synthesis, distilled);

  console.log(JSON.stringify({ id, query: query.slice(0, 80), distilled: distilled.slice(0, 120), learned_at: now }));
}

function searchLearned(query, limit) {
  if (!query) {
    console.error(JSON.stringify({ error: 'Query required' }));
    process.exit(1);
  }

  const sanitized = query.replace(/['"]/g, ' ').trim();

  try {
    const results = db.prepare(
      'SELECT f.id, d.query, d.distilled, d.agents, d.learned_at, bm25(learned_fts) AS score ' +
      'FROM learned_fts f JOIN learned d ON f.id = d.id ' +
      'WHERE learned_fts MATCH ? ORDER BY score LIMIT ?'
    ).all(sanitized, limit);

    console.log(JSON.stringify({
      query, count: results.length,
      results: results.map(r => ({
        id: r.id, query: r.query, distilled: r.distilled,
        agents: r.agents, learned_at: r.learned_at,
        score: Math.abs(r.score).toFixed(4)
      }))
    }, null, 2));
  } catch {
    console.log(JSON.stringify({ query, count: 0, results: [] }));
  }
}

function listLearned(limit) {
  const results = db.prepare('SELECT id, query, distilled, agents, learned_at FROM learned ORDER BY learned_at DESC LIMIT ?').all(limit);
  console.log(JSON.stringify({ count: results.length, results }, null, 2));
}

db.close();
