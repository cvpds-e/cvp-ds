import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { PersonalizerFilterBuilder, PersonalizerFilterClause } from './PersonalizerFilterBuilder';

function BuilderHarness() {
  const [clauses, setClauses] = useState<PersonalizerFilterClause[]>([{ id: 'content-type', field: 'content-type', operator: 'IN', values: ['movie'] }]);
  return <PersonalizerFilterBuilder clauses={clauses} onChange={setClauses} />;
}

describe('PersonalizerFilterBuilder', () => {
  it('supports negated membership and adding another filter', async () => {
    const user = userEvent.setup();
    render(<BuilderHarness />);

    await user.click(screen.getByRole('combobox', { name: 'Operator' }));
    await user.click(screen.getByRole('option', { name: 'NOT IN · excludes any' }));
    expect(screen.getByText('Exclude', { selector: 'strong' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Add filter' }));
    expect(screen.getByRole('article', { name: 'Filter 2' })).toBeVisible();
    expect(screen.getAllByRole('combobox', { name: 'Operator' })).toHaveLength(2);
  });
});