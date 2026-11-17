import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import registry from '../../agent/registry/components.json';
import { DESIGN_SYSTEM_CATALOG, FOUNDATION_PAGES, PRIMITIVE_PAGES, filterCatalog } from '../designSystemCatalog';
import { DesignSystemCatalogDocumentation } from './DesignSystemCatalogDocumentation';
import { DesignSystemNav } from './DesignSystemNav';
import { FOUNDATION_DETAILS } from './FoundationDocumentation';
import { PRIMITIVE_EXAMPLES, PrimitiveDocumentation } from './PrimitiveDocumentation';

describe('supported system catalogue', () => {
  it('lists every approved registry asset without duplicating routes', () => {
    const ids = DESIGN_SYSTEM_CATALOG.map(entry => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    const assets = new Set(DESIGN_SYSTEM_CATALOG.flatMap(entry => entry.assetIds ?? [entry.id]));
    const missing = registry.components.filter(entry => entry.lifecycle === 'approved' && !assets.has(entry.id));
    expect(missing.map(entry => entry.id)).toEqual([]);
    for (const entry of DESIGN_SYSTEM_CATALOG) {
      const asset = registry.components.find(asset => asset.id === (entry.assetIds?.[0] ?? entry.id));
      if (asset?.lifecycle === 'deferred' || asset?.lifecycle === 'deprecated') {
        expect(entry.availability).toBe(asset.lifecycle);
      }
    }
  });

  it('provides an individual live example for every promoted primitive and new foundation', () => {
    expect(PRIMITIVE_PAGES.every(entry => Object.hasOwn(PRIMITIVE_EXAMPLES, entry.id))).toBe(true);
    expect(FOUNDATION_PAGES.every(entry => Object.hasOwn(FOUNDATION_DETAILS, entry.id))).toBe(true);
  });

  it('searches capabilities without inventing synonym implementations', () => {
    expect(filterCatalog('divider').map(entry => entry.id)).toContain('separator');
    expect(filterCatalog('spinner').map(entry => entry.id)).toContain('loader');
    expect(filterCatalog('chip').map(entry => entry.id)).toContain('pills');
    expect(filterCatalog('upload').map(entry => entry.id)).toContain('file-input');
  });

  it('renders every catalogue destination as a normal navigable link', () => {
    render(<DesignSystemCatalogDocumentation />);
    const catalogue = screen.getByRole('region', { name: 'Design system catalogue' });
    const links = within(catalogue).getAllByRole('link');
    expect(links).toHaveLength(DESIGN_SYSTEM_CATALOG.length);
    for (const [index, entry] of DESIGN_SYSTEM_CATALOG.entries()) {
      const name = [entry.label, entry.availability, entry.description].filter(Boolean).join(' ');
      expect(links[index]).toHaveAccessibleName(name);
      expect(links[index]).toHaveAttribute('href', `?page=${entry.id}`);
    }
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search the complete catalogue' }), { target: { value: 'no-such-capability' } });
    expect(screen.getByRole('status')).toHaveTextContent(`0 of ${DESIGN_SYSTEM_CATALOG.length} entries`);
    expect(within(catalogue).queryAllByRole('link')).toHaveLength(0);
  });

  it('uses the same navigation entries, identifies the current page, and supports search Enter/Escape', () => {
    const onItemClick = vi.fn();
    render(<DesignSystemNav activeItem="radio-group" onItemClick={onItemClick} />);
    expect(screen.getByRole('button', { name: 'Radio Group' })).toHaveAttribute('aria-current', 'page');
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'divider' } });
    expect(screen.getByRole('button', { name: 'Separator' })).toBeVisible();
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(onItemClick).toHaveBeenLastCalledWith('separator');
    fireEvent.change(search, { target: { value: 'motion' } });
    fireEvent.keyDown(search, { key: 'Escape' });
    expect(search).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Text' })).toBeVisible();
  });

  it('restores the saved draft in the unsaved-changes example', () => {
    render(<PrimitiveDocumentation id="unsaved-changes-footer" />);
    const title = screen.getByRole('textbox', { name: 'Draft title' });
    fireEvent.change(title, { target: { value: 'Saved title' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.getByRole('status')).toHaveTextContent('Draft saved');
    fireEvent.change(title, { target: { value: 'Discard this edit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(title).toHaveValue('Saved title');
    expect(screen.getByRole('status')).toHaveTextContent('Changes discarded');
  });
});
