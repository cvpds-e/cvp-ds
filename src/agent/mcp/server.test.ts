import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const workspaceRoot = path.resolve(import.meta.dirname, '../../..');
const clients: Client[] = [];

async function connect() {
  const client = new Client({ name: 'cvp-mcp-test', version: '0.1.0' });
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: ['src/agent/mcp/server.mjs'],
    cwd: workspaceRoot,
    env: { CVP_MCP_WORKSPACE_ROOT: workspaceRoot },
    stderr: 'pipe',
  });
  await client.connect(transport);
  clients.push(client);
  return client;
}

afterEach(async () => {
  await Promise.all(clients.splice(0).map((client) => client.close()));
});

describe('CVP design-system MCP server', () => {
  it('advertises only the intended read-only tools', async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((tool) => tool.name)).toEqual([
      'search_components', 'search_patterns', 'get_component_contract',
      'classify_design_system_gap', 'validate_prototype_provenance', 'report_prototype_compliance',
    ]);
    expect(tools.every((tool) => tool.annotations?.readOnlyHint === true)).toBe(true);
  });

  it('returns structured component discovery results over stdio', async () => {
    const client = await connect();
    const response = await client.callTool({ name: 'search_components', arguments: { query: 'date filter', limit: 5 } });
    expect(response.isError).not.toBe(true);
    expect(response.structuredContent).toEqual({
      result: expect.arrayContaining([expect.objectContaining({ id: 'date-picker', lifecycle: 'approved' })]),
    });
  });

  it('rejects compliance scans outside the configured workspace', async () => {
    const client = await connect();
    const response = await client.callTool({ name: 'report_prototype_compliance', arguments: { targetDirectory: '..' } });
    expect(response.isError).toBe(true);
    expect(JSON.stringify(response.content)).toContain('configured workspace root');
  });
});
