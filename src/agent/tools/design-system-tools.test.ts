import { describe, expect, it } from 'vitest';
import {
  classifyGap, createProvenance, getComponentContract, reportCompliance,
  searchComponents, searchPatterns, validateProvenance,
} from './design-system-tools.mjs';

describe('design system discovery tools', () => {
  it('finds approved components by product vocabulary', async () => {
    const results = await searchComponents('filter a collection by date');
    expect(results.map((item) => item.id)).toEqual(expect.arrayContaining(['date-picker', 'filter']));
    expect(results.every((item) => item.lifecycle === 'approved')).toBe(true);
  });

  it('returns traceable component contracts', async () => {
    const contract = await getComponentContract('SegmentedControl');
    expect(contract).toMatchObject({ id: 'segmented', public: true });
    expect(contract?.source).toBe('src/app/components/Segmented.tsx');
  });

  it('finds an approved management composition', async () => {
    const results = await searchPatterns('search filter and edit records');
    expect(results[0]?.id).toBe('management-list-workspace');
  });

  it('classifies unsupported scheduling language as a gap', async () => {
    const result = await classifyGap('visual scheduling grid for channels and time slots');
    expect(result.coverage).toBe('gap');
    expect(result.unmatchedTerms).toContain('scheduling');
  });
});

describe('prototype governance tools', () => {
  it('creates and validates provenance for approved assets', async () => {
    const { provenance, diagnostics } = await createProvenance({
      approved: ['primary-button', 'text-input'],
      patterns: ['create-edit-modal'],
      gitCommit: 'abcdef1234567890',
    });
    expect(diagnostics).toEqual([]);
    await expect(validateProvenance(provenance)).resolves.toEqual({ valid: true, diagnostics: [] });
  });

  it('rejects a deferred asset represented as approved', async () => {
    const { diagnostics } = await createProvenance({ approved: ['toggle'], gitCommit: 'abcdef1' });
    expect(diagnostics).toContain('toggle is not an approved asset');
  });

  it('reports the prototype template as compliant', async () => {
    const result = await reportCompliance('templates/react-typescript');
    expect(result.compliant).toBe(true);
    expect(result.usedAssets).toEqual(['primary-button', 'text-input']);
  });
});
