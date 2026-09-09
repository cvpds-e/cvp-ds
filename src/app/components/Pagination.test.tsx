import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('announces the visible range and navigates to the next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalItems={45} pageSize={10} onPageChange={onPageChange} itemLabel="rails" />);

    expect(screen.getByText('Showing 11–20 of 45 rails')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('supports direct row navigation', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalItems={45} pageSize={10} onPageChange={onPageChange} />);

    await user.click(screen.getByRole('button', { name: 'Switch to row navigation' }));
    const input = screen.getByRole('textbox', { name: /Current row/ });
    await user.clear(input);
    await user.type(input, '24{Enter}');
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
