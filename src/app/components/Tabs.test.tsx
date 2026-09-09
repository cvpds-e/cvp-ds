import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'details', label: 'Details', content: 'Details panel' },
  { id: 'content', label: 'Content', content: 'Content panel' },
  { id: 'disabled', label: 'Disabled', content: 'Disabled panel', disabled: true },
];

describe('Tabs', () => {
  it('moves and activates with horizontal arrow keys', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<Tabs tabs={tabs} onTabChange={onTabChange} />);

    const details = screen.getByRole('tab', { name: 'Details' });
    const content = screen.getByRole('tab', { name: 'Content' });
    details.focus();
    await user.keyboard('{ArrowRight}');

    expect(content).toHaveFocus();
    expect(content).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Content' })).toBeVisible();
    expect(onTabChange).toHaveBeenCalledWith('content');
  });

  it('skips disabled tabs and wraps focus', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} defaultTab="content" />);

    const content = screen.getByRole('tab', { name: 'Content' });
    content.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Details' })).toHaveFocus();
  });
});
