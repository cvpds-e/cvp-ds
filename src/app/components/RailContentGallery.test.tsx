import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RailContentGallery } from './RailContentGallery';

const items = [{ id: 'station-1', title: 'Sample station', year: 'Ch 101', thumbnail: 'https://example.test/poster.png' }];

beforeEach(() => vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} }));
afterEach(() => vi.unstubAllGlobals());

describe('RailContentGallery artwork', () => {
  it('preserves default poster rendering', () => {
    render(<RailContentGallery title="Editorial rail" items={items} />);
    expect(screen.getByAltText('')).toHaveAttribute('src', items[0].thumbnail);
    expect(screen.getByRole('region')).not.toHaveClass('cvp-rail-gallery--station');
  });
  it('renders station artwork inside the existing accessible target', async () => {
    const user = userEvent.setup();
    const open = vi.fn();
    render(<RailContentGallery title="Stations" items={items} mediaVariant="station" onItemClick={open} renderMedia={() => <svg role="img" aria-label="Sample station logo" />} />);
    expect(screen.getByRole('region')).toHaveClass('cvp-rail-gallery--station');
    expect(screen.getByRole('img', { name: 'Sample station logo' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Open Sample station' }));
    expect(open).toHaveBeenCalledWith(items[0]);
  });
  it('retains shared next/previous scroll navigation for station rails', async () => {
    const user = userEvent.setup();
    const { container } = render(<RailContentGallery title="Stations" items={items} mediaVariant="station" />);
    const scroller = container.querySelector('.cvp-rail-gallery__items');
    if (!scroller) throw new Error('Station gallery scroller is missing.');
    const scrollBy = vi.fn();
    Object.defineProperties(scroller, { scrollWidth: { value: 1000 }, clientWidth: { value: 400 }, scrollLeft: { value: 0, writable: true }, scrollBy: { value: scrollBy } });
    fireEvent.scroll(scroller);
    await user.click(screen.getByRole('button', { name: 'Next items' }));
    expect(scrollBy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });
});
