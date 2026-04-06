#!/usr/bin/env node
/**
 * Agency search CLI — FTS5 full-text search against memory.db
 * No model loading needed. Pure SQLite. Instant results.
 *
 * Usage:
 *   node search.mjs "push notifications" --table topics --limit 5
 *   node search.mjs "SDK setup" --table skills
 *   node search.mjs "webhook" --topic   (shortcut for --table topics)
 *   node search.mjs --list-skills
 *   node search.mjs --get-topic push-notifications-rich
 */

import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DB_PATH = join(PACKAGE_ROOT, 'memory.db');

// Parse args
const args = process.argv.slice(2);
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

// Commands
if (flags['list-skills']) {
  listSkills();
} else if (flags['get-topic']) {
  getTopic(flags['get-topic']);
} else if (positional.length > 0) {
  search(positional.join(' '), flags.table || (flags.topic ? 'topics' : 'skills'), parseInt(flags.limit) || 5);
} else {
  console.log(`Usage:
  search "query"                    Search skills (default)
  search "query" --table topics     Search topics
  search "query" --topic            Shortcut for --table topics
  search "query" --limit 10         Max results (default: 5)
  search --list-skills              List all skills
  search --get-topic <id>           Read a topic file`);
}

function search(query, table, limit) {
  if (!existsSync(DB_PATH)) {
    console.error(JSON.stringify({ error: 'memory.db not found' }));
    process.exit(1);
  }

  const db = new Database(DB_PATH, { readonly: true });

  try {
    // FTS5 search — no model loading needed
    const ftsTable = `${table}_fts`;
    const dataTable = table;

    // Escape FTS5 special chars and build query
    const sanitized = query.replace(/['"]/g, ' ').trim();

    let sql, results;

    if (table === 'skills') {
      sql = `
        SELECT f.id, d.role, d.summary,
               bm25(skills_fts) AS score
        FROM skills_fts f
        JOIN skills d ON f.id = d.id
        WHERE skills_fts MATCH ?
        ORDER BY score
        LIMIT ?
      `;
      results = db.prepare(sql).all(sanitized, limit);

      console.log(JSON.stringify({
        query,
        table,
        count: results.length,
        results: results.map(r => ({
          id: r.id,
          role: r.role,
          summary: r.summary,
          score: Math.abs(r.score).toFixed(4),
        })),
      }, null, 2));
    } else {
      sql = `
        SELECT f.id, d.title, d.skill_id,
               bm25(topics_fts) AS score
        FROM topics_fts f
        JOIN topics d ON f.id = d.id
        WHERE topics_fts MATCH ?
        ORDER BY score
        LIMIT ?
      `;
      results = db.prepare(sql).all(sanitized, limit);

      console.log(JSON.stringify({
        query,
        table,
        count: results.length,
        results: results.map(r => ({
          id: r.id,
          title: r.title,
          skill_id: r.skill_id,
          score: Math.abs(r.score).toFixed(4),
        })),
      }, null, 2));
    }
  } catch (err) {
    // FTS5 syntax error — try simpler query
    try {
      const words = query.split(/\s+/).filter(w => w.length > 2);
      const simpleQuery = words.join(' OR ');

      if (table === 'skills') {
        const results = db.prepare(`
          SELECT f.id, d.role, d.summary, bm25(skills_fts) AS score
          FROM skills_fts f JOIN skills d ON f.id = d.id
          WHERE skills_fts MATCH ? ORDER BY score LIMIT ?
        `).all(simpleQuery, limit);
        console.log(JSON.stringify({ query, table, count: results.length, results: results.map(r => ({ ...r, score: Math.abs(r.score).toFixed(4) })) }, null, 2));
      } else {
        const results = db.prepare(`
          SELECT f.id, d.title, d.skill_id, bm25(topics_fts) AS score
          FROM topics_fts f JOIN topics d ON f.id = d.id
          WHERE topics_fts MATCH ? ORDER BY score LIMIT ?
        `).all(simpleQuery, limit);
        console.log(JSON.stringify({ query, table, count: results.length, results: results.map(r => ({ ...r, score: Math.abs(r.score).toFixed(4) })) }, null, 2));
      }
    } catch {
      console.error(JSON.stringify({ error: String(err), query }));
      process.exit(1);
    }
  } finally {
    db.close();
  }
}

function listSkills() {
  const skillsDir = join(PACKAGE_ROOT, 'skills');
  if (!existsSync(skillsDir)) {
    console.error(JSON.stringify({ error: 'skills/ directory not found' }));
    process.exit(1);
  }

  const skills = [];
  for (const dir of readdirSync(skillsDir)) {
    const skillPath = join(skillsDir, dir, 'SKILL.md');
    if (!existsSync(skillPath)) continue;
    const content = readFileSync(skillPath, 'utf-8');
    const nameMatch = content.match(/^name:\s*(.+)$/m);
    const descMatch = content.match(/^description:\s*(.+)$/m);
    skills.push({
      id: dir,
      name: nameMatch?.[1]?.trim() || dir,
      description: descMatch?.[1]?.trim() || '',
    });
  }

  console.log(JSON.stringify({ count: skills.length, skills }, null, 2));
}

function getTopic(topicId) {
  const skillsDir = join(PACKAGE_ROOT, 'skills');
  for (const skill of readdirSync(skillsDir)) {
    const refPath = join(skillsDir, skill, 'references', `${topicId}.md`);
    if (existsSync(refPath)) {
      process.stdout.write(readFileSync(refPath, 'utf-8'));
      return;
    }
  }
  console.error(JSON.stringify({ error: `Topic "${topicId}" not found` }));
  process.exit(1);
}
