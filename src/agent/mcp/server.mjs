import { realpath } from 'node:fs/promises';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import {
  classifyGap,
  getComponentContract,
  reportCompliance,
  searchComponents,
  searchPatterns,
  validateProvenance,
} from '../tools/design-system-tools.mjs';

const serverVersion = '0.1.0';
const readOnlyAnnotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true };

function result(value) {
  return {
    content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
    structuredContent: { result: value },
  };
}

async function resolveWorkspaceTarget(targetDirectory, workspaceRoot) {
  const allowedRoot = await realpath(path.resolve(workspaceRoot));
  const target = await realpath(path.resolve(allowedRoot, targetDirectory));
  const relative = path.relative(allowedRoot, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('targetDirectory must resolve inside the configured workspace root');
  }
  return target;
}

export function createDesignSystemMcpServer({ workspaceRoot = process.env.CVP_MCP_WORKSPACE_ROOT ?? process.cwd() } = {}) {
  const server = new McpServer(
    { name: 'cvp-design-system', version: serverVersion },
    { capabilities: { tools: {} }, instructions: 'Use approved CVP assets first. Classify unsupported requirements before generating local or candidate UI.' },
  );

  server.registerTool('search_components', {
    title: 'Search approved components',
    description: 'Find approved CVP components by product language, intent, alias, family, or tag.',
    inputSchema: z.object({ query: z.string().min(1), limit: z.number().int().min(1).max(25).default(10) }),
    annotations: readOnlyAnnotations,
  }, async ({ query, limit }) => result(await searchComponents(query, { limit })));

  server.registerTool('search_patterns', {
    title: 'Search approved patterns',
    description: 'Find approved CVP composition patterns by intent and constraints.',
    inputSchema: z.object({ query: z.string().min(1), limit: z.number().int().min(1).max(25).default(10) }),
    annotations: readOnlyAnnotations,
  }, async ({ query, limit }) => result(await searchPatterns(query, { limit })));

  server.registerTool('get_component_contract', {
    title: 'Get component contract',
    description: 'Return lifecycle, source, usage, fixture, and pattern metadata for one CVP component.',
    inputSchema: z.object({ identifier: z.string().min(1) }),
    annotations: readOnlyAnnotations,
  }, async ({ identifier }) => result(await getComponentContract(identifier) ?? { found: false, identifier }));

  server.registerTool('classify_design_system_gap', {
    title: 'Classify a design-system requirement',
    description: 'Classify a UI requirement as covered, partial, or a gap before generation.',
    inputSchema: z.object({ requirement: z.string().min(1) }),
    annotations: readOnlyAnnotations,
  }, async ({ requirement }) => result(await classifyGap(requirement)));

  server.registerTool('validate_prototype_provenance', {
    title: 'Validate prototype provenance',
    description: 'Validate an in-memory CVP prototype provenance document against its schema and registries.',
    inputSchema: z.object({ document: z.record(z.string(), z.unknown()) }),
    annotations: readOnlyAnnotations,
  }, async ({ document }) => result(await validateProvenance(document)));

  server.registerTool('report_prototype_compliance', {
    title: 'Report prototype compliance',
    description: 'Inspect a prototype directory for approved imports, token use, and provenance. The target must remain inside the configured workspace root.',
    inputSchema: z.object({ targetDirectory: z.string().min(1) }),
    annotations: readOnlyAnnotations,
  }, async ({ targetDirectory }) => {
    const target = await resolveWorkspaceTarget(targetDirectory, workspaceRoot);
    return result(await reportCompliance(target));
  });

  return server;
}

export function runDesignSystemMcpServer(options) {
  return serveStdio(() => createDesignSystemMcpServer(options), {
    onerror: (error) => console.error('[cvp-design-system-mcp]', error),
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  runDesignSystemMcpServer();
}
