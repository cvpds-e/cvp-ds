import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { PersonalizerFilterBuilder, PersonalizerFilterClause } from './PersonalizerFilterBuilder';

function BuilderHarness() {
  const [clauses, setClauses] = useState<PersonalizerFilterClause[]>([{ id: 'content-type', field: 'content-type', operator: 'in', values: ['movie'] }]);
  return <PersonalizerFilterBuilder clauses={clauses} onChange={setClauses} />;
}

function RuntimeHarness() {
  const [clauses, setClauses] = useState<PersonalizerFilterClause[]>([{ id: 'runtime', field: 'runtime', operator: 'gte', values: ['90'] }]);
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

  it('uses API comparison operators and an integer value for runtime', async () => {
    const user = userEvent.setup();
    render(<RuntimeHarness />);

    expect(screen.getByRole('spinbutton', { name: 'Value (minutes)' })).toHaveValue(90);
    await user.click(screen.getByRole('combobox', { name: 'Operator' }));
    expect(screen.getByRole('option', { name: 'Greater than' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Greater than or equal' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Less than' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'Less than or equal' })).toBeVisible();
    expect(screen.queryByRole('option', { name: /NOT IN/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Less than' }));
    expect(screen.getByText('Less than', { selector: 'strong' })).toBeVisible();
  });
});