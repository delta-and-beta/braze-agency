#!/usr/bin/env node
/**
 * braze-agency MCP server — provides semantic search over Braze knowledge base.
 * Standalone: no Nick dependency. Just SQLite + sqlite-vec + embedder.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import { z } from 'zod';
import { pipeline } from '@xenova/transformers';
import { join, dirname } from 'node:path';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, '..');
const DB_PATH = join(PACKAGE_ROOT, 'memory.db');

// Lazy embedder
let embedPipeline = null;
async function embed(text) {
  if (!embedPipeline) {
    embedPipeline = await pipeline('feature-extraction', 'Xenova/bge-m3');
  }
  const result = await embedPipeline(text, { pooling: 'mean', normalize: true });
  return Array.from(result.data);
}

function serializeVector(vec) {
  return Buffer.from(new Float32Array(vec).buffer);
}

// DB connection
let db = null;
function getDb() {
  if (!db) {
    if (!existsSync(DB_PATH)) throw new Error(`memory.db not found at ${DB_PATH}`);
    db = new Database(DB_PATH, { readonly: true });
    sqliteVec.load(db);
  }
  return db;
}

// Create server
const server = new McpServer({ name: 'braze-agency', version: '1.0.0' });

server.tool(
  'braze_search',
  'Search Braze knowledge base by semantic similarity. Returns ranked results from skills or topics.',
  {
    query: z.string().describe('The search query'),
    table: z.enum(['skills', 'topics']).default('skills').describe('Search skills or topics'),
    limit: z.number().min(1).max(20).default(5).describe('Max results'),
  },
  async ({ query, table, limit }) => {
    try {
      const database = getDb();
      const queryVector = await embed(query);

      const sql = `
        SELECT v.id, v.distance, d.*
        FROM ${table}_vec v
        JOIN ${table} d ON v.id = d.id
        WHERE v.embedding MATCH ?
          AND k = ?
        ORDER BY v.distance
      `;

      const results = database.prepare(sql).all(serializeVector(queryVector), limit);

      const formatted = results.map(r => ({
        id: r.id,
        score: (1 - r.distance).toFixed(4),
        ...(table === 'skills'
          ? { role: r.role, summary: r.summary }
          : { skill_id: r.skill_id, title: r.title }),
      }));

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ query, table, count: formatted.length, results: formatted }, null, 2),
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ error: String(error), query }),
        }],
      };
    }
  }
);

server.tool(
  'braze_get_topic',
  'Read a specific topic reference file from the Braze knowledge base.',
  {
    topic_id: z.string().describe('Topic ID (filename without .md)'),
  },
  async ({ topic_id }) => {
    const skillsDir = join(PACKAGE_ROOT, 'skills');
    for (const skill of readdirSync(skillsDir)) {
      const refPath = join(skillsDir, skill, 'references', `${topic_id}.md`);
      if (existsSync(refPath)) {
        return {
          content: [{ type: 'text', text: readFileSync(refPath, 'utf-8') }],
        };
      }
    }
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: `Topic "${topic_id}" not found` }) }],
    };
  }
);

server.tool(
  'braze_list_skills',
  'List all available Braze skills with their descriptions.',
  {},
  async () => {
    const skillsDir = join(PACKAGE_ROOT, 'skills');
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
    return {
      content: [{ type: 'text', text: JSON.stringify({ count: skills.length, skills }, null, 2) }],
    };
  }
);

// Run
const transport = new StdioServerTransport();
await server.connect(transport);
