import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StationRailDetails } from './StationRailDetails';
import { defaultStationRail, readStationRails, saveStationRail, type StationRail } from './stationRails';

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  window.localStorage.clear();
  window.history.replaceState({}, '', '/?page=rail-details-full&railEntityType=Station');
});
afterEach(() => vi.unstubAllGlobals());

describe('StationRailDetails', () => {
  it.each([
    { contentQuery: { ...defaultStationRail.contentQuery, byLocationId: 'urn:theplatform:tv:location:london' } },
    { contentQuery: { ...defaultStationRail.contentQuery, byLanguage: 'en' } },
    { contentQuery: { ...defaultStationRail.contentQuery, byIsHD: 'false' } },
    { contentQuery: { ...defaultStationRail.contentQuery, byIsPayPerView: 'false' } },
    { contentQuery: { ...defaultStationRail.contentQuery, byListingTime: '1700000000~1800000000' } },
    { sortKey: 'title' },
    { sortDirection: 'desc' },
  ] satisfies Partial<StationRail>[])('shows Clear Query for active configuration %j', async (configuration) => {
    const user = userEvent.setup();
    saveStationRail({ ...defaultStationRail, ...configuration });
    render(<StationRailDetails />);
    await user.click(screen.getByRole('tab', { name: 'Content Query' }));
    expect(within(screen.getByRole('contentinfo', { name: 'Query actions' })).getByRole('button', { name: 'Clear Query' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Clear Query' }));
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByRole('button', { name: 'Clear Query' })).toBeVisible();
  });
  it('keeps Clear Query last in the footer and preserves unrelated draft edits', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Content Query' }));
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo', { name: 'Query actions' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Base', exact: true }));
    await user.type(screen.getByRole('textbox', { name: 'Rail name' }), ' edited');
    await user.click(screen.getByRole('button', { name: 'Add station' }));
    await user.click(screen.getByRole('button', { name: 'Add WNEWS 101' }));
    await user.click(screen.getByRole('tab', { name: 'Content Query' }));
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
    await user.type(screen.getByRole('textbox', { name: 'Listing time range' }), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Sort direction: ASC. Activate to switch.' }));
    const footer = screen.getByRole('contentinfo', { name: 'Unsaved changes' });
    expect(within(footer).getAllByRole('button').map((button) => button.textContent)).toEqual([' Save changes', 'Cancel', 'Clear Query']);
    expect(within(footer).getByRole('button', { name: 'Clear Query' })).toHaveClass('cvp-text-button--default');
    await user.click(within(footer).getByRole('button', { name: 'Clear Query' }));
    expect(screen.getByRole('textbox', { name: 'Listing time range' })).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Sort direction: ASC. Activate to switch.' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Remove slot 1' })).toBeVisible();
    expect(within(footer).getAllByRole('button').map((button) => button.textContent)).toEqual([' Save changes', 'Cancel']);
    await user.click(screen.getByRole('tab', { name: 'Base', exact: true }));
    expect(screen.getByRole('textbox', { name: 'Rail name' })).toHaveValue('Featured stations edited');
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
  });
  it('clears saved filters only in the draft until saved and lets Cancel restore them', async () => {
    const user = userEvent.setup();
    const configured = { ...defaultStationRail, contentQuery: { ...defaultStationRail.contentQuery, byLocationId: 'urn:theplatform:tv:location:london', byLanguage: 'en' as const, byIsHD: 'true' as const, byIsPayPerView: 'false' as const, byListingTime: '1700000000~1800000000' }, sortKey: 'title' as const, sortDirection: 'desc' as const };
    saveStationRail(configured);
    render(<StationRailDetails />);
    await user.click(screen.getByRole('tab', { name: 'Content Query' }));
    await user.click(screen.getByRole('button', { name: 'Clear Query' }));
    expect(readStationRails()[0]).toEqual(configured);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByRole('textbox', { name: 'Location URI' })).toHaveValue(configured.contentQuery.byLocationId);
    expect(screen.getByRole('textbox', { name: 'Listing time range' })).toHaveValue(configured.contentQuery.byListingTime);
    expect(screen.getByRole('button', { name: 'Sort direction: DESC. Activate to switch.' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Clear Query' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Clear Query' }));
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(readStationRails()[0]).toEqual({ ...configured, contentQuery: defaultStationRail.contentQuery, sortKey: 'channelNumber', sortDirection: 'asc' });
    expect(screen.queryByRole('contentinfo', { name: 'Unsaved changes' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear Query' })).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo', { name: 'Query actions' })).not.toBeInTheDocument();
  });
  it('uses the standard Settings heading, preview indicator and destructive actions', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    expect(screen.getByRole('heading', { name: 'Settings', level: 2 })).toBeVisible();
    expect(screen.getByText('Station', { exact: true })).toHaveClass('cvp-status-tag', 'rail-details__preview-tag');
    const deletion = screen.getByRole('button', { name: 'Delete rail', exact: true });
    expect(deletion).toHaveClass('cvp-text-button--secondary', 'rail-details__delete-action');
    await user.click(deletion);
    expect(within(screen.getByRole('dialog')).getByRole('button', { name: 'Delete rail', exact: true })).toHaveClass('cvp-text-button--secondary', 'rail-details__delete-action--confirm');
  });
  it('keeps unsaved input and reports a storage failure', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    await user.clear(screen.getByRole('textbox', { name: 'Rail name' }));
    await user.type(screen.getByRole('textbox', { name: 'Rail name' }), 'Unsaved station rail');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage quota exceeded'); });
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Storage quota exceeded');
    expect(screen.getByRole('textbox', { name: 'Rail name' })).toHaveValue('Unsaved station rail');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeVisible();
    expect(readStationRails()[0].name).toBe('Featured stations');
  });
  it('saves and restores base edits and keeps entity type immutable', async () => {
    const user = userEvent.setup();
    const view = render(<StationRailDetails />);
    for (const label of ['Rail entity type', 'Rail behavior']) {
      expect(screen.getByRole('textbox', { name: label })).toHaveAttribute('readonly');
      expect(screen.getByRole('textbox', { name: label })).toBeDisabled();
    }
    expect(screen.getAllByRole('img', { name: 'Read only' })).toHaveLength(4);
    const collection = screen.getByRole('combobox', { name: 'Rail collection' });
    expect(collection).toBeDisabled();
    expect(collection).not.toHaveAttribute('aria-required', 'true');
    const contentSlots = screen.getByRole('spinbutton', { name: 'Number of content slots' });
    expect(contentSlots).toBeDisabled();
    expect(contentSlots).toHaveAttribute('readonly');
    expect(contentSlots).not.toBeRequired();
    expect(screen.getByText('Rail collection', { exact: true })).toBeVisible();
    expect(screen.getByText('Number of content slots', { exact: true })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Increase Number of content slots' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrease Number of content slots' })).toBeDisabled();
    await user.clear(screen.getByRole('textbox', { name: 'Rail name' }));
    await user.type(screen.getByRole('textbox', { name: 'Rail name' }), 'My stations');
    await user.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.queryByRole('contentinfo', { name: 'Unsaved changes' })).not.toBeInTheDocument();
    expect(readStationRails()[0].name).toBe('My stations');
    view.unmount();
    render(<StationRailDetails />);
    expect(screen.getByRole('heading', { name: 'My stations', level: 1 })).toBeVisible();
    await user.type(screen.getByRole('textbox', { name: 'Rail name' }), ' changed');
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.getByRole('textbox', { name: 'Rail name' })).toHaveValue('My stations');
  });
  it('uses station logos in the shared horizontal gallery and opens station details', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    const preview = screen.getByRole('region', { name: 'Station rail preview' });
    expect(within(preview).getAllByRole('img', { name: 'World news sample logo' })).toHaveLength(2);
    expect(within(preview).getByRole('button', { name: 'Next items' })).toBeVisible();
    await user.click(within(preview).getAllByRole('button', { name: 'Open World news' })[0]);
    expect(screen.getByRole('dialog', { name: 'World news' })).toHaveTextContent('Sample station details');
    expect(within(screen.getByRole('dialog')).getByText('101')).toBeVisible();
  });
  it('adds, unpins, reorders, removes and cancels manual selections', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    await user.click(screen.getByRole('button', { name: 'Add station' }));
    await user.click(screen.getByRole('button', { name: 'Add WNEWS 101' }));
    expect(screen.getByRole('button', { name: 'Unpin slot 1' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Add station' }));
    await user.click(screen.getByRole('button', { name: 'Add SPORT 202' }));
    await user.click(screen.getByRole('button', { name: 'Move slot 2 up' }));
    const preview = screen.getByRole('region', { name: 'Station rail preview' });
    expect(within(preview).getAllByRole('article')[0]).toHaveTextContent('SPORT');
    await user.click(screen.getByRole('button', { name: 'Unpin slot 1' }));
    expect(screen.getByRole('button', { name: 'Pin slot 1' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Remove slot 2' }));
    expect(screen.queryByRole('button', { name: 'Remove slot 2' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('button', { name: 'Remove slot 1' })).not.toBeInTheDocument();
  });
  it('shows invalid GUID and listing-time errors without losing input', async () => {
    const user = userEvent.setup();
    render(<StationRailDetails />);
    await user.click(screen.getByRole('button', { name: 'Add station' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus());
    await user.type(screen.getByRole('textbox', { name: 'Station content GUID' }), 'invalid');
    await user.click(screen.getByRole('button', { name: 'Add by GUID' }));
    expect(screen.getByRole('heading', { name: 'Add station' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: 'Station content GUID' })).toHaveValue('invalid');
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: 'Close', exact: true }));
    await user.click(screen.getByRole('tab', { name: 'Content Query' }));
    await user.type(screen.getByRole('textbox', { name: 'Listing time range' }), 'invalid');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
  });
});
