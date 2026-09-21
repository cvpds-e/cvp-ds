import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';
import { Select } from './Select';

describe('Select', () => {
  it('layers its portaled popup above a containing modal', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Modal isOpen onClose={() => undefined} title="Create rail"><Select label="Rail collection" options={[{ value: 'home', label: 'Home' }]} onChange={onChange} /></Modal>);

    await user.click(screen.getByRole('combobox', { name: 'Rail collection' }));
    const listbox = screen.getByRole('listbox', { name: 'Rail collection' });
    expect(listbox.parentElement).toHaveClass('cvp-select__popup--modal');

    await user.click(screen.getByRole('option', { name: 'Home' }));
    expect(onChange).toHaveBeenCalledWith('home');
  });
});