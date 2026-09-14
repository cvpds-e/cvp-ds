#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import {
  classifyGap, createProvenance, getComponentContract, reportCompliance,
  searchComponents, searchPatterns, validateProvenance,
} from '../src/agent/tools/design-system-tools.mjs';

const [command, ...args] = process.argv.slice(2);
const option = (name) => { const index = args.indexOf(`--${name}`); return index >= 0 ? args[index + 1] : undefined; };
const positional = args.filter((value, index) => !value.startsWith('--') && !args[index - 1]?.startsWith('--')).join(' ');
const respond = (data, diagnostics = []) => {
  const ok = diagnostics.length === 0;
  process.stdout.write(`${JSON.stringify({ ok, data, diagnostics }, null, 2)}\n`);
  if (!ok) process.exitCode = 1;
};

try {
  if (command === 'search-components') respond(await searchComponents(positional || option('query') || ''));
  else if (command === 'search-patterns') respond(await searchPatterns(positional || option('query') || ''));
  else if (command === 'get-component') {
    const result = await getComponentContract(positional || option('id') || '');
    respond(result, result ? [] : ['Component not found']);
  } else if (command === 'classify-gap') respond(await classifyGap(positional || option('requirement') || ''));
  else if (command === 'create-provenance') {
    const approved = (option('approved') ?? '').split(',').filter(Boolean);
    const patterns = (option('patterns') ?? '').split(',').filter(Boolean);
    const gitCommit = option('commit') ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const { provenance, diagnostics } = await createProvenance({ approved, patterns, gitCommit });
    const output = option('output');
    if (output && diagnostics.length === 0) await writeFile(output, `${JSON.stringify(provenance, null, 2)}\n`, 'utf8');
    respond({ provenance, output }, diagnostics);
  } else if (command === 'validate-provenance') {
    const filename = positional || option('file');
    const document = JSON.parse(await readFile(filename, 'utf8'));
    const result = await validateProvenance(document);
    respond(result, result.diagnostics);
  } else if (command === 'report-compliance') {
    const result = await reportCompliance(positional || option('directory') || process.cwd());
    respond(result, result.diagnostics.map((item) => `${item.file}: ${item.message}`));
  } else {
    respond(null, ['Usage: design-system-agent <search-components|search-patterns|get-component|classify-gap|create-provenance|validate-provenance|report-compliance> [value]']);
  }
} catch (error) {
  respond(null, [error instanceof Error ? error.message : String(error)]);
}
