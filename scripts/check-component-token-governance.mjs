import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const exists = async (relativePath) => access(path.join(root, relativePath)).then(() => true, () => false);
const registry = await readJson('src/agent/registry/components.json');
const tokenRegistry = await readJson('src/styles/token-registry.json');
const knownTokens = new Set(tokenRegistry.tokens.map((token) => token.name));
const errors = [];
let checkedFiles = 0;

for (const component of registry.components.filter((entry) => entry.lifecycle === 'approved' && entry.classification === 'component')) {
  const cssPath = component.source.replace(/\.tsx$/, '.css');
  if (!(await exists(cssPath))) continue;
  checkedFiles += 1;
  const css = await readFile(path.join(root, cssPath), 'utf8');
  const executableCss = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const source = await readFile(path.join(root, component.source), 'utf8');
  const localTokens = new Set([
    ...[...executableCss.matchAll(/(--cvp-[\w-]+)\s*:/g)].map((match) => match[1]),
    ...[...source.matchAll(/["'](--cvp-[\w-]+)["']\s*:/g)].map((match) => match[1])
  ]);

  const rawColors = [...executableCss.matchAll(/(?:#[0-9a-f]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\()/gi)];
  for (const match of rawColors) errors.push(`${cssPath}:${lineAt(css, match.index)} raw color value ${match[0]}`);

  for (const match of executableCss.matchAll(/var\(\s*(--[\w-]+)/g)) {
    const token = match[1];
    if (!token.startsWith('--cvp-')) {
      errors.push(`${cssPath}:${lineAt(css, match.index)} legacy or local token reference ${token}`);
    } else if (!knownTokens.has(token) && !localTokens.has(token)) {
      errors.push(`${cssPath}:${lineAt(css, match.index)} unregistered token reference ${token}`);
    }
  }
}

for (const tokenFile of ['src/styles/tokens/cvp-primitives.css', 'src/styles/tokens/cvp-semantic-tokens.css', 'src/styles/tokens/cvp-component-tokens.css']) {
  const css = await readFile(path.join(root, tokenFile), 'utf8');
  const executableCss = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const match of executableCss.matchAll(/var\(\s*(--cvp-[\w-]*[\w])/g)) {
    if (!knownTokens.has(match[1])) errors.push(`${tokenFile}:${lineAt(css, match.index)} unresolved token dependency ${match[1]}`);
  }
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

if (errors.length) {
  console.error(`Component token governance failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Component token governance passed: ${checkedFiles} approved component stylesheets checked against ${knownTokens.size} registered tokens.`);
