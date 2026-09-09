import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('exposes dialog semantics and closes with Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Create rail" description="Configure the new rail."><button>Continue</button></Modal>);

    const dialog = screen.getByRole('dialog', { name: 'Create rail' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription('Configure the new rail.');
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps focus inside the open dialog', async () => {
    const user = userEvent.setup();
    render(<Modal isOpen onClose={() => undefined} title="Edit rail" footer={<button>Save</button>}><button>Cancel</button></Modal>);

    const close = screen.getByRole('button', { name: 'Close dialog' });
    await waitFor(() => expect(close).toHaveFocus());
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
  });
});
