import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ChoiceCardGroup } from './ChoiceCardGroup';

const options = [
  { value: 'generic', label: 'Generic', description: 'Manual content' },
  { value: 'personalized', label: 'Personalized', description: 'Algorithmic content' },
  { value: 'hybrid', label: 'Hybrid', description: 'Combined content', disabled: true },
];

describe('ChoiceCardGroup', () => {
  it('associates helper text and required state with the radio group', () => {
    render(<ChoiceCardGroup label="Rail type" helperText="Choose how content is selected." required options={options} />);

    const group = screen.getByRole('radiogroup', { name: 'Rail type' });
    expect(group).toHaveAccessibleDescription('Choose how content is selected.');
    expect(group).toHaveAttribute('aria-required', 'true');
  });

  it('reports pointer selection through radio semantics', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ChoiceCardGroup label="Rail type" options={options} defaultValue="generic" onChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: /Personalized/ }));

    expect(screen.getByRole('radio', { name: /Personalized/ })).toHaveAttribute('aria-checked', 'true');
    expect(onChange).toHaveBeenCalledWith('personalized');
  });

  it('moves with arrow keys and skips disabled options', async () => {
    const user = userEvent.setup();
    render(<ChoiceCardGroup label="Rail type" options={options} defaultValue="personalized" />);

    const personalized = screen.getByRole('radio', { name: /Personalized/ });
    personalized.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('radio', { name: /Generic/ })).toHaveFocus();
    expect(screen.getByRole('radio', { name: /Generic/ })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: /Hybrid/ })).toBeDisabled();
  });
});