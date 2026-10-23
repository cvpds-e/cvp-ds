import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PersonalizedRailDetails } from './PersonalizedRailDetails';

vi.mock('./RailContentGallery', () => ({ RailContentGallery: () => <div /> }));

describe('PersonalizedRailDetails', () => {
  it('starts with an empty personalizer configuration state', async () => {
    const user = userEvent.setup();
    render(<PersonalizedRailDetails />);

    expect(screen.getByText('No personalizer configuration is assigned. Create one in Personalizer configurations to power this rail.')).toBeVisible();

    await user.click(screen.getByRole('tab', { name: 'Personalizer configurations' }));

    expect(screen.getByRole('heading', { name: 'Build your first personalizer' })).toBeVisible();
    expect(screen.getByText('Choose a recommendation strategy and tune content filters for this rail.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'New configuration' }));
    expect(screen.getByRole('textbox', { name: 'Configuration name' })).toBeVisible();
    expect(screen.queryByText('Edit configuration parameters')).not.toBeInTheDocument();
  });
});