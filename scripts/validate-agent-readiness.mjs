import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = process.cwd();
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const exists = async (relativePath) => access(path.join(root, relativePath)).then(() => true, () => false);
const errors = [];
const lifecycles = new Set(['approved', 'candidate', 'local', 'deferred', 'deprecated', 'internal']);
const classifications = new Set(['component', 'pattern', 'page', 'utility']);

const registry = await readJson('src/agent/registry/components.json');
const patterns = await readJson('src/agent/registry/patterns.json');
const fixtures = await readJson('src/agent/registry/fixtures.json');
const specifications = await readJson('src/agent/registry/component-specifications.json');
const provenance = await readJson('src/agent/schemas/prototype-provenance.schema.json');
const candidateSchema = await readJson('src/agent/schemas/candidate-component.schema.json');
const componentRegistrySchema = await readJson('src/agent/schemas/component-registry.schema.json');
const patternRegistrySchema = await readJson('src/agent/schemas/pattern-registry.schema.json');
const fixtureRegistrySchema = await readJson('src/agent/schemas/fixture-registry.schema.json');
const componentSpecificationRegistrySchema = await readJson('src/agent/schemas/component-specification-registry.schema.json');
const templateProvenance = await readJson('templates/react-typescript/cvp-provenance.json');
const publicExports = await readFile(path.join(root, 'src/design-system/index.ts'), 'utf8');
const ids = new Set();
const names = new Set();

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);
const validateDocument = (name, schema, document) => {
  const validate = ajv.compile(schema);
  if (!validate(document)) {
    for (const issue of validate.errors ?? []) errors.push(`${name}${issue.instancePath || '/'} ${issue.message}`);
  }
};

validateDocument('component registry', componentRegistrySchema, registry);
validateDocument('pattern registry', patternRegistrySchema, patterns);
validateDocument('fixture registry', fixtureRegistrySchema, fixtures);
validateDocument('component specification registry', componentSpecificationRegistrySchema, specifications);
ajv.compile(provenance);
ajv.compile(candidateSchema);
validateDocument('prototype template provenance', provenance, templateProvenance);

for (const component of registry.components ?? []) {
  if (!component.id || ids.has(component.id)) errors.push(`Duplicate or missing component id: ${component.id ?? '<missing>'}`);
  if (!component.name || names.has(component.name)) errors.push(`Duplicate or missing component name: ${component.name ?? '<missing>'}`);
  ids.add(component.id);
  names.add(component.name);
  if (!lifecycles.has(component.lifecycle)) errors.push(`${component.id}: invalid lifecycle ${component.lifecycle}`);
  if (!classifications.has(component.classification)) errors.push(`${component.id}: invalid classification ${component.classification}`);
  if (!component.source || !(await exists(component.source))) errors.push(`${component.id}: missing source ${component.source ?? '<missing>'}`);
  if (component.documentation && !(await exists(component.documentation))) errors.push(`${component.id}: missing documentation ${component.documentation}`);
  if (!(await exists(`docs/component-specifications/${component.id}.md`))) errors.push(`${component.id}: missing component specification stub`);
  if (!Array.isArray(component.tags) || component.tags.length === 0) errors.push(`${component.id}: discovery tags are required`);
  if (!Array.isArray(component.accessibility) || component.accessibility.length === 0) errors.push(`${component.id}: accessibility contract is required`);
  if (component.replacement && !registry.components.some((entry) => entry.id === component.replacement)) errors.push(`${component.id}: unknown replacement ${component.replacement}`);
  if (component.lifecycle === 'approved' && component.classification === 'component') {
    const exportPattern = new RegExp(`\\b${component.name}\\b`);
    if (!exportPattern.test(publicExports)) errors.push(`${component.id}: approved component is missing from public exports`);
  }
}

const ignoredSourceNames = new Set([
  'AccessibilityAuditProbe', 'ComponentDocumentation', 'ComponentTokenContract', 'CurrentConfiguration',
  'DisabledStateDemo', 'HeaderNavigationDocUtils', 'HeaderNavigationSampleData', 'HeaderNavigationVariants',
  'TableSampleData', 'ThemeSwitcher', 'TreeGroup', 'TreeGroupHeader', 'TreeItem', 'TreeNode'
]);
const sourceFiles = await readdir(path.join(root, 'src/app/components'));
for (const filename of sourceFiles.filter((name) => name.endsWith('.tsx') && !name.endsWith('.test.tsx') && !name.includes('Documentation') && !name.includes('FoundationPreview') && !name.includes('Specifications') && !name.includes('Overview') && !ignoredSourceNames.has(name.slice(0, -4)))) {
  const name = filename.slice(0, -4);
  if (!names.has(name)) errors.push(`Unregistered component implementation: ${filename}`);
}

const patternIds = new Set();
for (const pattern of patterns.patterns ?? []) {
  if (!pattern.id || patternIds.has(pattern.id)) errors.push(`Duplicate or missing pattern id: ${pattern.id ?? '<missing>'}`);
  patternIds.add(pattern.id);
  if (!lifecycles.has(pattern.lifecycle)) errors.push(`${pattern.id}: invalid lifecycle ${pattern.lifecycle}`);
  for (const dependency of [...(pattern.required ?? []), ...(pattern.optional ?? [])]) {
    if (!ids.has(dependency)) errors.push(`${pattern.id}: unknown component dependency ${dependency}`);
  }
  if (pattern.reference && !ids.has(pattern.reference)) errors.push(`${pattern.id}: unknown reference ${pattern.reference}`);
}

for (const fixture of fixtures.fixtures ?? []) {
  if (!ids.has(fixture.assetId)) errors.push(`${fixture.id}: unknown fixture asset ${fixture.assetId}`);
}
const specificationIds = new Set();
for (const specification of specifications.specifications ?? []) {
  if (specificationIds.has(specification.assetId)) errors.push(`Duplicate component specification: ${specification.assetId}`);
  specificationIds.add(specification.assetId);
  const asset = registry.components.find((entry) => entry.id === specification.assetId);
  if (!asset) errors.push(`${specification.assetId}: specification references an unknown asset`);
  if (!(await exists(specification.markdown))) errors.push(`${specification.assetId}: missing specification Markdown ${specification.markdown}`);
  if (asset?.tokenPrefix && specification.tokens?.prefix !== asset.tokenPrefix) errors.push(`${specification.assetId}: specification token prefix does not match registry`);
}
for (const assetId of templateProvenance.assets?.approved ?? []) {
  const asset = registry.components.find((entry) => entry.id === assetId);
  if (!asset || asset.lifecycle !== 'approved') errors.push(`Prototype template references non-approved asset ${assetId}`);
}

if (provenance.type !== 'object' || !provenance.properties?.designSystem || !provenance.properties?.assets || !provenance.properties?.validation) {
  errors.push('Prototype provenance schema is missing required top-level contracts');
}
if (candidateSchema.type !== 'object' || !candidateSchema.properties?.alternativesConsidered || !candidateSchema.properties?.accessibility || !candidateSchema.properties?.review) {
  errors.push('Candidate component schema is missing required review contracts');
}

if (errors.length) {
  console.error(`Agent readiness validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Agent readiness validation passed: ${registry.components.length} assets, ${patterns.patterns.length} patterns, ${fixtures.fixtures.length} fixtures, ${specifications.specifications.length} component specifications, 6 valid JSON schemas.`);
