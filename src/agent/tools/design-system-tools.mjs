import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const moduleRoot = path.resolve(import.meta.dirname, '../../..');
const stopWords = new Set([
  'a', 'an', 'and', 'for', 'from', 'in', 'into', 'of', 'on', 'or', 'the', 'to', 'with',
  'add', 'build', 'create', 'make', 'manage', 'show', 'use', 'interface', 'page', 'screen', 'ui'
]);

const normalize = (value) => String(value).toLocaleLowerCase().replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[^a-z0-9]+/g, ' ').trim();
const terms = (value) => [...new Set(normalize(value).split(/\s+/).filter((term) => term && !stopWords.has(term)))];
const includesTerm = (haystack, term) => haystack.has(term) || [...haystack].some((word) => word.startsWith(term) || term.startsWith(word));

export async function loadAgentData(root = moduleRoot) {
  const load = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
  const [components, patterns, fixtures, provenanceSchema] = await Promise.all([
    load('src/agent/registry/components.json'),
    load('src/agent/registry/patterns.json'),
    load('src/agent/registry/fixtures.json'),
    load('src/agent/schemas/prototype-provenance.schema.json'),
  ]);
  return { root, components, patterns, fixtures, provenanceSchema };
}

function searchableComponent(component) {
  return terms([component.id, component.name, component.family, ...(component.aliases ?? []), ...component.tags].join(' '));
}

function searchablePattern(pattern) {
  return terms([pattern.id, pattern.name, ...pattern.intents, ...pattern.constraints].join(' '));
}

function rank(query, records, getTerms) {
  const queryTerms = terms(query);
  return records.map((record) => {
    const vocabulary = new Set(getTerms(record));
    const matchedTerms = queryTerms.filter((term) => includesTerm(vocabulary, term));
    const exactName = normalize(record.name) === normalize(query) || normalize(record.id) === normalize(query);
    const score = exactName ? 100 : matchedTerms.length * 10 + matchedTerms.length / Math.max(queryTerms.length, 1);
    return { record, score, matchedTerms, queryTerms };
  }).filter((result) => result.score > 0).sort((a, b) => b.score - a.score || a.record.name.localeCompare(b.record.name));
}

export async function searchComponents(query, { lifecycle = ['approved'], limit = 10, root } = {}) {
  const data = await loadAgentData(root);
  const allowed = new Set(Array.isArray(lifecycle) ? lifecycle : [lifecycle]);
  return rank(query, data.components.components.filter((item) => allowed.has(item.lifecycle)), searchableComponent)
    .slice(0, limit)
    .map(({ record, score, matchedTerms }) => ({ ...record, score, matchedTerms }));
}

export async function searchPatterns(query, { lifecycle = ['approved'], limit = 10, root } = {}) {
  const data = await loadAgentData(root);
  const allowed = new Set(Array.isArray(lifecycle) ? lifecycle : [lifecycle]);
  return rank(query, data.patterns.patterns.filter((item) => allowed.has(item.lifecycle)), searchablePattern)
    .slice(0, limit)
    .map(({ record, score, matchedTerms }) => ({ ...record, score, matchedTerms }));
}

export async function getComponentContract(identifier, { root } = {}) {
  const data = await loadAgentData(root);
  const normalized = normalize(identifier);
  const component = data.components.components.find((item) =>
    normalize(item.id) === normalized || normalize(item.name) === normalized || (item.aliases ?? []).some((alias) => normalize(alias) === normalized));
  if (!component) return null;
  return {
    ...component,
    public: component.lifecycle === 'approved' && component.classification === 'component',
    fixtures: data.fixtures.fixtures.filter((fixture) => fixture.assetId === component.id),
    usedByPatterns: data.patterns.patterns.filter((pattern) => [...pattern.required, ...(pattern.optional ?? [])].includes(component.id)).map((pattern) => pattern.id),
  };
}

export async function classifyGap(requirement, { root } = {}) {
  const data = await loadAgentData(root);
  const queryTerms = terms(requirement);
  const components = await searchComponents(requirement, { root, lifecycle: ['approved'], limit: 8 });
  const patterns = await searchPatterns(requirement, { root, lifecycle: ['approved'], limit: 5 });
  const matched = new Set([...components, ...patterns].flatMap((item) => item.matchedTerms));
  const unmatchedTerms = queryTerms.filter((term) => !matched.has(term));
  const coverageRatio = queryTerms.length ? (queryTerms.length - unmatchedTerms.length) / queryTerms.length : 0;
  const hasStrongPattern = Boolean(patterns[0] && patterns[0].matchedTerms.length >= 2);
  const coverage = hasStrongPattern && coverageRatio >= 0.75 ? 'covered' : coverageRatio >= 0.45 ? 'partial' : 'gap';
  return {
    requirement,
    coverage,
    coverageRatio: Number(coverageRatio.toFixed(2)),
    components: components.map(({ id, name, lifecycle, matchedTerms }) => ({ id, name, lifecycle, matchedTerms })),
    patterns: patterns.map(({ id, name, lifecycle, matchedTerms, required, optional = [] }) => ({ id, name, lifecycle, matchedTerms, required, optional })),
    unmatchedTerms,
    recommendation: coverage === 'covered'
      ? 'Compose from the matched approved pattern and components.'
      : coverage === 'partial'
        ? 'Compose the covered portion and classify the unmatched requirement as candidate or local before generating it.'
        : 'No sufficiently supported approved composition was found; prepare a gap decision before generating reusable UI.',
  };
}

export async function createProvenance({ approved = [], candidates = [], local = [], patterns = [], gitCommit, packageVersion = '0.0.1', generator } = {}, { root } = {}) {
  const data = await loadAgentData(root);
  const known = new Map(data.components.components.map((item) => [item.id, item]));
  const diagnostics = [];
  for (const id of approved) if (known.get(id)?.lifecycle !== 'approved') diagnostics.push(`${id} is not an approved asset`);
  for (const id of patterns) if (!data.patterns.patterns.some((item) => item.id === id && item.lifecycle === 'approved')) diagnostics.push(`${id} is not an approved pattern`);
  if (!gitCommit) diagnostics.push('gitCommit is required');
  const provenance = {
    schemaVersion: '1.0.0',
    designSystem: { packageVersion, registryVersion: data.components.version, gitCommit: gitCommit ?? '' },
    assets: { approved: [...new Set(approved)], candidates: [...new Set(candidates)], local: [...new Set(local)], patterns: [...new Set(patterns)] },
    exceptions: [],
    validation: [{ command: 'npm run build', status: 'not-run' }, { command: 'npm run verify:agent', status: 'not-run' }],
    ...(generator ? { generator } : {}),
  };
  return { provenance, diagnostics };
}

export async function validateProvenance(document, { root } = {}) {
  const data = await loadAgentData(root);
  const ajv = new Ajv({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(data.provenanceSchema);
  const diagnostics = [];
  if (!validate(document)) diagnostics.push(...(validate.errors ?? []).map((issue) => `${issue.instancePath || '/'} ${issue.message}`));
  const known = new Map(data.components.components.map((item) => [item.id, item]));
  for (const id of document?.assets?.approved ?? []) if (known.get(id)?.lifecycle !== 'approved') diagnostics.push(`${id} is not an approved asset`);
  for (const id of document?.assets?.patterns ?? []) if (!data.patterns.patterns.some((item) => item.id === id && item.lifecycle === 'approved')) diagnostics.push(`${id} is not an approved pattern`);
  return { valid: diagnostics.length === 0, diagnostics };
}

export async function reportCompliance(targetDirectory, { root } = {}) {
  const data = await loadAgentData(root);
  const directory = path.resolve(targetDirectory);
  const files = await walk(directory);
  const diagnostics = [];
  const usedAssets = new Set();
  const approvedNames = new Map(data.components.components.filter((item) => item.lifecycle === 'approved' && item.classification === 'component').map((item) => [item.name, item.id]));

  for (const filename of files.filter((file) => /\.(tsx?|jsx?)$/.test(file))) {
    const source = await readFile(filename, 'utf8');
    for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']@cvp\/design-system["']/g)) {
      for (const specifier of match[1].split(',').map((part) => part.trim().split(/\s+as\s+/)[0]).filter(Boolean)) {
        if (approvedNames.has(specifier)) usedAssets.add(approvedNames.get(specifier));
        else diagnostics.push({ severity: 'error', file: path.relative(directory, filename), rule: 'unapproved-import', message: `${specifier} is not an approved public component` });
      }
    }
  }
  for (const filename of files.filter((file) => file.endsWith('.css'))) {
    const css = (await readFile(filename, 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
    if (/(?:#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\()/i.test(css)) diagnostics.push({ severity: 'error', file: path.relative(directory, filename), rule: 'raw-color', message: 'Raw color values must be replaced with approved tokens' });
    for (const match of css.matchAll(/var\(\s*(--[\w-]+)/g)) if (!match[1].startsWith('--cvp-')) diagnostics.push({ severity: 'error', file: path.relative(directory, filename), rule: 'legacy-token', message: `Legacy token ${match[1]} is not allowed` });
  }
  const provenancePath = path.join(directory, 'cvp-provenance.json');
  try {
    const provenance = JSON.parse(await readFile(provenancePath, 'utf8'));
    const result = await validateProvenance(provenance, { root });
    diagnostics.push(...result.diagnostics.map((message) => ({ severity: 'error', file: 'cvp-provenance.json', rule: 'provenance', message })));
    for (const asset of usedAssets) if (!provenance.assets.approved.includes(asset)) diagnostics.push({ severity: 'error', file: 'cvp-provenance.json', rule: 'missing-provenance', message: `${asset} is imported but not recorded` });
  } catch (error) {
    diagnostics.push({ severity: 'error', file: 'cvp-provenance.json', rule: 'missing-provenance', message: error.code === 'ENOENT' ? 'Prototype provenance is required' : 'Prototype provenance is not valid JSON' });
  }
  return { compliant: !diagnostics.some((item) => item.severity === 'error'), target: directory, usedAssets: [...usedAssets].sort(), diagnostics };
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['node_modules', 'dist', '.git', 'test-results'].includes(entry.name)) continue;
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(resolved));
    else files.push(resolved);
  }
  return files;
}
