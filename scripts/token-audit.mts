#!/usr/bin/env npx tsx
/**
 * CVP Design System — Phase 0 Token Audit
 * Static analysis script: finds every design-token-like value across all source files.
 * Run: npx tsx scripts/token-audit.mts
 * Output: reports/token-audit-results.csv + console summary
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SOURCE_ROOTS = [
  path.join(PROJECT_ROOT, 'src'),
];

const ROOT_LEVEL_EXTRAS = [
  'src/styles/themes/default_shadcn_theme.css',
  '__figma__entrypoint__.ts',
  'vite.config.ts',
];

const INCLUDE_EXTENSIONS = new Set([
  '.css', '.scss', '.less',
  '.tsx', '.jsx', '.ts', '.mts', '.js', '.mjs',
  '.json', '.yaml', '.yml',
]);

const EXCLUDE_DIRS = new Set([
  'node_modules', 'dist', '.next', 'build', '.git',
]);

const EXCLUDE_FILE_RES = [
  /\.min\.(js|css)$/,
  /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|mp4|webm)$/,
];

// ---------------------------------------------------------------------------
// Patterns
// ---------------------------------------------------------------------------

// a) CSS custom property reference or definition (any --name occurrence)
const RE_CUSTOM_PROP = /--[\w-]+/g;

// b) Hex colour literals (3, 4, 6, or 8 hex digits)
const RE_HEX = /#[0-9a-fA-F]{3,8}\b/g;

// c) rgb/rgba/hsl/hsla/oklch function calls
const RE_COLOR_FUNC = /(?:rgba?|hsla?|oklch)\s*\([^)]*\)/g;

// d) color-mix() calls
const RE_COLOR_MIX = /color-mix\s*\([^)]*\)/g;

// e) var(--token, fallback) — captures token name + optional fallback
const RE_VAR = /var\(\s*(--[\w-]+)\s*(?:,\s*((?:[^)(]|\([^)]*\))+))?\)/g;

// b-extended: z-index literals
const RE_Z_INDEX = /(?:z-index|zIndex)\s*:\s*(\d+)/g;

// b-extended: hardcoded font/spacing literals
const RE_FONT_LITERAL = /(?:font-size|font-weight|line-height|letter-spacing|fontSize|fontWeight|lineHeight|letterSpacing)\s*:\s*([\d.]+(?:px|rem|em|%|pt)?)/g;

// b-extended: box-shadow literals
const RE_BOX_SHADOW = /box-shadow\s*:\s*[^;{}"'`\n]+/g;

// b-extended: cubic-bezier easing
const RE_EASING = /cubic-bezier\s*\([^)]*\)/g;

// b-extended: duration values
const RE_DURATION = /\b\d+(?:\.\d+)?ms\b|\b\d+(?:\.\d+)?s(?=[\s,;)\/])/g;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuditRow {
  filePath: string;
  lineNumber: number;
  category: 'a' | 'b' | 'c' | 'd' | 'e';
  matchedText: string;
  tokenName: string;
  fallbackValue: string;
}

// ---------------------------------------------------------------------------
// File walker
// ---------------------------------------------------------------------------

function walkDir(dir: string, files: string[] = []): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, files);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!INCLUDE_EXTENSIONS.has(ext)) continue;
      if (EXCLUDE_FILE_RES.some(re => re.test(entry.name))) continue;
      files.push(fullPath);
    }
  }
  return files;
}

function collectFiles(): string[] {
  const seen = new Set<string>();
  const files: string[] = [];

  for (const root of SOURCE_ROOTS) {
    if (!fs.existsSync(root)) continue;
    for (const f of walkDir(root)) {
      if (!seen.has(f)) { seen.add(f); files.push(f); }
    }
  }

  for (const name of ROOT_LEVEL_EXTRAS) {
    const p = path.join(PROJECT_ROOT, name);
    if (fs.existsSync(p) && !seen.has(p)) {
      seen.add(p);
      files.push(p);
    }
  }

  return files;
}

// ---------------------------------------------------------------------------
// Line number helper
// ---------------------------------------------------------------------------

function buildLineIndex(content: string): number[] {
  const offsets = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\n') offsets.push(i + 1);
  }
  return offsets;
}

function charOffsetToLine(lineIndex: number[], offset: number): number {
  let lo = 0, hi = lineIndex.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (lineIndex[mid] <= offset) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1; // 1-based
}

// ---------------------------------------------------------------------------
// Analyser
// ---------------------------------------------------------------------------

function analyseFile(filePath: string, projectRoot: string): AuditRow[] {
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return [];
  }
  if (content.includes('\0')) return []; // binary

  const rel = path.relative(projectRoot, filePath);
  const lineIndex = buildLineIndex(content);
  const rows: AuditRow[] = [];

  function addRow(
    offset: number,
    category: AuditRow['category'],
    matchedText: string,
    tokenName = '',
    fallbackValue = '',
  ) {
    rows.push({
      filePath: rel,
      lineNumber: charOffsetToLine(lineIndex, offset),
      category,
      matchedText,
      tokenName,
      fallbackValue,
    });
  }

  // ---- Category e: var(--token, fallback) first ----
  const varRanges: [number, number][] = [];
  RE_VAR.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = RE_VAR.exec(content)) !== null) {
    addRow(m.index, 'e', m[0], m[1], (m[2] ?? '').trim());
    varRanges.push([m.index, m.index + m[0].length]);
  }

  // ---- Category a: all --token occurrences not already captured in e ----
  RE_CUSTOM_PROP.lastIndex = 0;
  while ((m = RE_CUSTOM_PROP.exec(content)) !== null) {
    const inVar = varRanges.some(([s, e]) => m!.index >= s && m!.index < e);
    if (!inVar) addRow(m.index, 'a', m[0]);
  }

  // ---- Category b: hex colours ----
  RE_HEX.lastIndex = 0;
  while ((m = RE_HEX.exec(content)) !== null) {
    addRow(m.index, 'b', m[0]);
  }

  // ---- Category c: rgb/rgba/hsl/hsla/oklch ----
  RE_COLOR_FUNC.lastIndex = 0;
  while ((m = RE_COLOR_FUNC.exec(content)) !== null) {
    addRow(m.index, 'c', m[0]);
  }

  // ---- Category d: color-mix ----
  RE_COLOR_MIX.lastIndex = 0;
  while ((m = RE_COLOR_MIX.exec(content)) !== null) {
    addRow(m.index, 'd', m[0]);
  }

  // ---- Category b (extended): z-index literals ----
  RE_Z_INDEX.lastIndex = 0;
  while ((m = RE_Z_INDEX.exec(content)) !== null) {
    addRow(m.index, 'b', m[0]);
  }

  // ---- Category b (extended): font/spacing literals ----
  RE_FONT_LITERAL.lastIndex = 0;
  while ((m = RE_FONT_LITERAL.exec(content)) !== null) {
    addRow(m.index, 'b', m[0]);
  }

  // ---- Category b (extended): box-shadow literals ----
  RE_BOX_SHADOW.lastIndex = 0;
  while ((m = RE_BOX_SHADOW.exec(content)) !== null) {
    addRow(m.index, 'b', m[0].trim());
  }

  // ---- Category b (extended): cubic-bezier ----
  RE_EASING.lastIndex = 0;
  while ((m = RE_EASING.exec(content)) !== null) {
    addRow(m.index, 'b', m[0]);
  }

  // ---- Category b (extended): duration literals ----
  RE_DURATION.lastIndex = 0;
  while ((m = RE_DURATION.exec(content)) !== null) {
    addRow(m.index, 'b', m[0]);
  }

  return rows;
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

function csvEscape(value: unknown): string {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function writeCSV(rows: AuditRow[], outputPath: string) {
  const header = ['file_path', 'line_number', 'category', 'matched_text', 'token_name', 'fallback_value'];
  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push([
      csvEscape(row.filePath),
      csvEscape(row.lineNumber),
      csvEscape(row.category),
      csvEscape(row.matchedText),
      csvEscape(row.tokenName),
      csvEscape(row.fallbackValue),
    ].join(','));
  }
  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const projectRoot = PROJECT_ROOT;
  const outputCSV = path.join(projectRoot, 'reports', 'token-audit-results.csv');

  console.log('CVP Phase 0 Token Audit');
  console.log('='.repeat(50));
  console.log(`Project root : ${projectRoot}`);
  console.log(`Output file  : ${outputCSV}\n`);

  const allFiles = collectFiles();
  console.log(`Files found  : ${allFiles.length}\n`);

  const allRows: AuditRow[] = [];
  const zeroMatchFiles: string[] = [];
  const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0, e: 0 };

  for (const filePath of allFiles) {
    const rows = analyseFile(filePath, projectRoot);
    if (rows.length === 0) {
      zeroMatchFiles.push(path.relative(projectRoot, filePath));
    } else {
      for (const row of rows) {
        allRows.push(row);
        counts[row.category] = (counts[row.category] ?? 0) + 1;
      }
    }
  }

  // Sort by file path then line number
  allRows.sort((a, b) => {
    if (a.filePath < b.filePath) return -1;
    if (a.filePath > b.filePath) return 1;
    return a.lineNumber - b.lineNumber;
  });

  writeCSV(allRows, outputCSV);

  console.log('--- Results ---');
  console.log(`Total files scanned  : ${allFiles.length}`);
  console.log(`Total rows written   : ${allRows.length}`);
  console.log('\nMatch counts by category:');
  console.log(`  a  CSS custom property refs/defs (--token)   : ${counts.a}`);
  console.log(`  b  Hardcoded values (hex, z-index, font etc) : ${counts.b}`);
  console.log(`  c  Color functions (rgb/rgba/hsl/oklch)       : ${counts.c}`);
  console.log(`  d  color-mix() calls                         : ${counts.d}`);
  console.log(`  e  var(--token, fallback) with fallback       : ${counts.e}`);
  console.log(`\nFiles with zero matches (${zeroMatchFiles.length}):`);
  for (const f of zeroMatchFiles) console.log(`  ${f}`);
  console.log(`\nDone. CSV written to: ${outputCSV}`);
}

main();
