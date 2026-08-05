import React, { useEffect, useState } from 'react';
import axe, { AxeResults } from 'axe-core';

type AuditSummary = {
  violations: Array<{ id: string; impact: string | null; nodes: string[] }>;
  incomplete: Array<{ id: string; impact: string | null; nodes: string[] }>;
  passes: number;
};

export function AccessibilityAuditProbe() {
  const [result, setResult] = useState<AuditSummary | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const results: AxeResults = await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      });
      const compact = (items: AxeResults['violations']) => items.map(item => ({
        id: item.id,
        impact: item.impact,
        nodes: item.nodes.map(node => node.target.join(' ')),
      }));
      setResult({ violations: compact(results.violations), incomplete: compact(results.incomplete), passes: results.passes.length });
    }, 350);
    return () => window.clearTimeout(timer);
  }, []);

  return <output id="cvp-a11y-audit" aria-hidden="true" data-status={result ? 'complete' : 'running'} style={{ position: 'fixed', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
    {result ? JSON.stringify(result) : 'running'}
  </output>;
}
