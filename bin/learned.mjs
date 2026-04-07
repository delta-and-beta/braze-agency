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
  "  keywords TEXT DEFAULT '',",
  '  learned_at TEXT NOT NULL',
  ')',
].join('\n'));

// Add keywords column if missing (migration for existing DBs)
try { db.exec("ALTER TABLE learned ADD COLUMN keywords TEXT DEFAULT ''"); } catch { /* column already exists */ }

const hasFts = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='learned_fts'").get();
if (!hasFts) {
  db.exec([
    'CREATE VIRTUAL TABLE learned_fts USING fts5(',
    '  id, query, synthesis, distilled, keywords,',
    "  tokenize='porter unicode61'",
    ')',
  ].join('\n'));
} else {
  // Check if keywords column exists in FTS — rebuild if not
  const ftsInfo = db.prepare("SELECT * FROM learned_fts LIMIT 0").columns();
  const hasKeywordsCol = ftsInfo.some(c => c.name === 'keywords');
  if (!hasKeywordsCol) {
    db.exec('DROP TABLE learned_fts');
    db.exec([
      'CREATE VIRTUAL TABLE learned_fts USING fts5(',
      '  id, query, synthesis, distilled, keywords,',
      "  tokenize='porter unicode61'",
      ')',
    ].join('\n'));
    // Re-index existing rows with empty keywords
    const rows = db.prepare('SELECT id, query, synthesis, distilled, keywords FROM learned').all();
    const insert = db.prepare('INSERT INTO learned_fts (id, query, synthesis, distilled, keywords) VALUES (?, ?, ?, ?, ?)');
    for (const r of rows) {
      insert.run(r.id, r.query, r.synthesis, r.distilled, r.keywords || '');
    }
  }
}

/**
 * Extract keywords from synthesis text.
 * Pulls distinct words >= 4 chars, lowercased, deduped against query + distilled
 * to surface terms that only appear in the full synthesis body.
 */
function extractKeywords(synthesis, query, distilled) {
  const existing = new Set(
    `${query} ${distilled}`.toLowerCase().split(/\W+/).filter(w => w.length >= 3)
  );
  const words = synthesis.toLowerCase().split(/\W+/).filter(w => w.length >= 4);
  const freq = {};
  for (const w of words) {
    if (!existing.has(w)) freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([w]) => w)
    .join(' ');
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
  // Accept explicit keywords or auto-generate from synthesis
  const keywords = flags.keywords || extractKeywords(synthesis, query, distilled);

  if (!query || !synthesis || !distilled) {
    console.error(JSON.stringify({ error: 'Required: --query, --synthesis, --distilled' }));
    process.exit(1);
  }

  const id = 'learned-' + Date.now().toString(36);
  const now = new Date().toISOString();

  db.prepare('INSERT INTO learned (id, query, synthesis, distilled, agents, keywords, learned_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(id, query, synthesis, distilled, agents, keywords, now);

  db.prepare('INSERT INTO learned_fts (id, query, synthesis, distilled, keywords) VALUES (?, ?, ?, ?, ?)')
    .run(id, query, synthesis, distilled, keywords);

  console.log(JSON.stringify({ id, query: query.slice(0, 80), distilled: distilled.slice(0, 120), keywords: keywords.slice(0, 120), learned_at: now }));
}

function searchLearned(query, limit) {
  if (!query) {
    console.error(JSON.stringify({ error: 'Query required' }));
    process.exit(1);
  }

  // Normalize: strip quotes, split on whitespace + hyphens (matching unicode61 tokenizer)
  const sanitized = query.replace(/['"]/g, ' ').trim();
  const tokens = sanitized.split(/[\s\-]+/).filter(w => w.length >= 2);
  // Try AND first (precise), fall back to OR (broad) if no results
  const andQuery = tokens.join(' ');
  const orQuery = tokens.join(' OR ');

  const stmt = db.prepare(
    'SELECT f.id, d.query, d.distilled, d.agents, d.keywords, d.learned_at, bm25(learned_fts) AS score ' +
    'FROM learned_fts f JOIN learned d ON f.id = d.id ' +
    'WHERE learned_fts MATCH ? ORDER BY score LIMIT ?'
  );

  try {
    // Try AND first for precise matches
    let results = stmt.all(andQuery, limit);
    let mode = 'AND';

    // Fall back to OR if AND returns nothing
    if (results.length === 0 && tokens.length > 1) {
      results = stmt.all(orQuery, limit);
      mode = 'OR';
    }

    console.log(JSON.stringify({
      query, mode, count: results.length,
      results: results.map(r => ({
        id: r.id, query: r.query, distilled: r.distilled,
        agents: r.agents, learned_at: r.learned_at,
        keywords: r.keywords ? r.keywords.slice(0, 80) : '',
        score: Math.abs(r.score).toFixed(4)
      }))
    }, null, 2));
  } catch {
    console.log(JSON.stringify({ query, count: 0, results: [] }));
  }
}

function listLearned(limit) {
  const results = db.prepare('SELECT id, query, distilled, agents, keywords, learned_at FROM learned ORDER BY learned_at DESC LIMIT ?').all(limit);
  console.log(JSON.stringify({
    count: results.length,
    results: results.map(r => ({
      ...r,
      keywords: r.keywords ? r.keywords.slice(0, 80) : ''
    }))
  }, null, 2));
}

db.close();
