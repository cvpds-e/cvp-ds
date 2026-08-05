import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Film, Filter, Grid3X3, List, Search, X } from 'lucide-react';
import { Modal } from './Modal';
import { Checkbox, CheckboxState } from './Checkbox';
import { IconButton } from './IconButton';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { TextButton } from './TextButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './ContentBrowserModal.css';

export interface ContentItem {
  id: string;
  title: string;
  year: string;
  genre?: string;
  rating?: string;
  provider?: string;
  thumbnail: string;
}

export interface ContentBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  items?: ContentItem[];
  selectedItems?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onConfirm?: (selectedIds: string[]) => void;
  filterOptions?: { genres?: string[]; years?: string[]; ratings?: string[]; providers?: string[] };
  loading?: boolean;
  pageSize?: number;
}

const validThumbnail = (value: string) => /^https?:\/\//.test(value?.trim() ?? '');
const unique = (values: Array<string | undefined>) => [...new Set(values.filter(Boolean) as string[])].sort();

export function ContentBrowserModal({
  isOpen,
  onClose,
  title = 'Browse content',
  subtitle = 'Select content to add to your editorial rail.',
  items = [],
  selectedItems,
  onSelectionChange,
  onConfirm,
  filterOptions = {},
  loading = false,
  pageSize = 12,
}: ContentBrowserModalProps) {
  const [internalSelection, setInternalSelection] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [provider, setProvider] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [page, setPage] = useState(1);

  const selection = selectedItems ?? internalSelection;
  const updateSelection = (next: string[]) => {
    if (selectedItems === undefined) setInternalSelection(next);
    onSelectionChange?.(next);
  };

  const options = {
    genres: filterOptions.genres ?? unique(items.map((item) => item.genre)),
    years: filterOptions.years ?? unique(items.map((item) => item.year)).reverse(),
    providers: filterOptions.providers ?? unique(items.map((item) => item.provider)),
  };

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return items
      .filter((item) => !query || `${item.title} ${item.year} ${item.genre ?? ''} ${item.provider ?? ''}`.toLocaleLowerCase().includes(query))
      .filter((item) => !genre || item.genre === genre)
      .filter((item) => !year || item.year === year)
      .filter((item) => !provider || item.provider === provider)
      .sort((a, b) => sortBy === 'year' ? b.year.localeCompare(a.year) : a.title.localeCompare(b.title));
  }, [genre, items, provider, searchQuery, sortBy, year]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pageItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  const selectedData = items.filter((item) => selection.includes(item.id));
  const pageSelectedCount = pageItems.filter((item) => selection.includes(item.id)).length;
  const allPageSelected = pageItems.length > 0 && pageSelectedCount === pageItems.length;
  const pageSelectionState: CheckboxState = pageSelectedCount > 0 && !allPageSelected ? 'indeterminate' : allPageSelected;
  const hasFilters = Boolean(searchQuery || genre || year || provider);

  useEffect(() => setPage(1), [genre, provider, searchQuery, sortBy, year]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const toggleItem = (id: string) => updateSelection(selection.includes(id) ? selection.filter((value) => value !== id) : [...selection, id]);
  const togglePage = (checked: CheckboxState) => {
    const pageIds = new Set(pageItems.map((item) => item.id));
    updateSelection(checked === true ? [...new Set([...selection, ...pageIds])] : selection.filter((id) => !pageIds.has(id)));
  };
  const clearFilters = () => { setSearchQuery(''); setGenre(''); setYear(''); setProvider(''); };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={subtitle}
      maxWidth="1100px"
      bodyClassName="cvp-content-browser__modal-body"
      className="cvp-content-browser__modal"
      footer={
        <div className="cvp-content-browser__footer">
          <div className="cvp-content-browser__footer-summary" aria-live="polite">
            <strong>{selection.length}</strong> selected
            <span aria-hidden="true">·</span>
            <span>{filteredItems.length} results</span>
          </div>
          <div className="cvp-content-browser__footer-actions">
            <OutlineButton onClick={onClose}>Cancel</OutlineButton>
            <PrimaryButton disabled={!selection.length} onClick={() => { onConfirm?.(selection); onClose(); }}>Add selected ({selection.length})</PrimaryButton>
          </div>
        </div>
      }
    >
      <div className="cvp-content-browser">
        <div className="cvp-content-browser__tools">
          <label className="cvp-content-browser__search">
            <Search size={16} aria-hidden="true" />
            <span className="cvp-visually-hidden">Search content</span>
            <input type="search" value={searchQuery} placeholder="Search title, genre or provider…" onChange={(event) => setSearchQuery(event.target.value)} />
          </label>
          <div className="cvp-content-browser__tool-actions">
            <div className="cvp-content-browser__view-switch" role="group" aria-label="Content view">
              <IconButton aria-label="Grid view" aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')}><Grid3X3 size={16} /></IconButton>
              <IconButton aria-label="List view" aria-pressed={viewMode === 'list'} onClick={() => setViewMode('list')}><List size={16} /></IconButton>
            </div>
            <OutlineButton aria-expanded={filtersOpen} aria-controls="content-browser-filters" onClick={() => setFiltersOpen((open) => !open)}><Filter size={15} /> Filters {hasFilters && <span className="cvp-content-browser__filter-dot" aria-label="Active filters" />}</OutlineButton>
          </div>
        </div>

        {filtersOpen && (
          <div id="content-browser-filters" className="cvp-content-browser__filters">
            <label><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'title' | 'year')}><option value="title">Title</option><option value="year">Newest year</option></select></label>
            <label><span>Genre</span><select value={genre} onChange={(event) => setGenre(event.target.value)}><option value="">All genres</option>{options.genres.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label><span>Year</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="">All years</option>{options.years.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label><span>Provider</span><select value={provider} onChange={(event) => setProvider(event.target.value)}><option value="">All providers</option>{options.providers.map((value) => <option key={value}>{value}</option>)}</select></label>
            <TextButton disabled={!hasFilters} onClick={clearFilters}>Clear filters</TextButton>
          </div>
        )}

        {selectedData.length > 0 && (
          <div className="cvp-content-browser__selection" aria-label="Selected content">
            <div className="cvp-content-browser__selection-heading"><strong>Selected</strong><span>{selectedData.length} items</span></div>
            <div className="cvp-content-browser__selection-list">
              {selectedData.map((item) => <span className="cvp-content-browser__selection-chip" key={item.id}>{item.title}<button type="button" aria-label={`Remove ${item.title}`} onClick={() => toggleItem(item.id)}><X size={13} /></button></span>)}
            </div>
          </div>
        )}

        <div className="cvp-content-browser__results-bar">
          <span>{loading ? 'Loading content…' : `${filteredItems.length} items`}</span>
          {pageItems.length > 0 && <Checkbox checked={pageSelectionState} onChange={togglePage} label="Select page" />}
        </div>

        <div className="cvp-content-browser__results">
          {loading ? (
            <div className="cvp-content-browser__state" role="status"><span className="cvp-content-browser__spinner" />Loading content…</div>
          ) : filteredItems.length === 0 ? (
            <div className="cvp-content-browser__state"><Search size={28} /><strong>{hasFilters ? 'No matching content' : 'No content available'}</strong><p>{hasFilters ? 'Adjust or clear your filters to see more results.' : 'Content will appear here when it becomes available.'}</p>{hasFilters && <OutlineButton onClick={clearFilters}>Clear filters</OutlineButton>}</div>
          ) : (
            <div className={`cvp-content-browser__items cvp-content-browser__items--${viewMode}`}>
              {pageItems.map((item) => {
                const selected = selection.includes(item.id);
                return (
                  <article className={`cvp-content-browser__item ${selected ? 'cvp-content-browser__item--selected' : ''}`} key={item.id}>
                    <button type="button" className="cvp-content-browser__item-target" aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Select'} ${item.title}`} onClick={() => toggleItem(item.id)}>
                      <span className="cvp-content-browser__poster">
                        {validThumbnail(item.thumbnail) ? <ImageWithFallback src={item.thumbnail} alt="" className="cvp-content-browser__image" /> : <span className="cvp-content-browser__placeholder"><Film size={28} /></span>}
                      </span>
                      <span className="cvp-content-browser__item-copy"><strong title={item.title}>{item.title}</strong><span>{[item.year, item.genre, item.provider].filter(Boolean).join(' · ')}</span></span>
                    </button>
                    <Checkbox className="cvp-content-browser__item-checkbox" checked={selected} aria-label={`Select ${item.title}`} onChange={() => toggleItem(item.id)} />
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {filteredItems.length > 0 && (
          <nav className="cvp-content-browser__pagination" aria-label="Content pages">
            <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft size={16} /></button>
            <span>Page {page} of {totalPages}</span>
            <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}><ChevronRight size={16} /></button>
          </nav>
        )}
      </div>
    </Modal>
  );
}
