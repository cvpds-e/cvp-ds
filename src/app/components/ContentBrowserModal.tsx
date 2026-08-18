import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Film, Filter, Grid3X3, List, Search } from 'lucide-react';
import { Modal } from './Modal';
import { Checkbox } from './Checkbox';
import { IconButton } from './IconButton';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import { TextButton } from './TextButton';
import { SearchField } from './SearchField';
import { Select } from './Select';
import { SortControl } from './SortControl';
import { MultiSelect } from './MultiSelect';
import { TagFilter } from './TagFilter';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './ContentBrowserModal.css';

export interface ContentItem {
  id: string;
  title: string;
  year: string;
  genre?: string;
  /** Canonical editorial programme type. Falls back to Movie for legacy catalog entries. */
  programType?: 'movie' | 'series';
  /** Canonical editorial tags. `genre` remains supported for legacy catalog entries. */
  tags?: string[];
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
  filterOptions?: {
    programTypes?: Array<'movie' | 'series'>;
    tags?: string[];
    years?: string[];
    /** Legacy compatibility input. New integrations should provide `tags`. */
    genres?: string[];
  };
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
  const [programTypes, setProgramTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'year'>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const selection = selectedItems ?? internalSelection;
  const updateSelection = (next: string[]) => {
    if (selectedItems === undefined) setInternalSelection(next);
    onSelectionChange?.(next);
  };

  const options = {
    programTypes: filterOptions.programTypes ?? ['movie', 'series'],
    tags: filterOptions.tags ?? filterOptions.genres ?? unique(items.flatMap((item) => item.tags?.length ? item.tags : [item.genre])),
    years: filterOptions.years ?? unique(items.map((item) => item.year)).reverse(),
  };

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return items
      .filter((item) => !query || `${item.title} ${item.year} ${item.programType ?? 'movie'} ${(item.tags?.length ? item.tags : [item.genre]).filter(Boolean).join(' ')}`.toLocaleLowerCase().includes(query))
      .filter((item) => !programTypes.length || programTypes.includes(item.programType ?? 'movie'))
      .filter((item) => !tags.length || tags.some((tag) => (item.tags?.length ? item.tags : [item.genre]).includes(tag)))
      .filter((item) => !year || item.year === year)
      .sort((a, b) => {
        const result = sortBy === 'year' ? a.year.localeCompare(b.year) : a.title.localeCompare(b.title);
        return sortDirection === 'asc' ? result : -result;
      });
  }, [items, programTypes, searchQuery, sortBy, sortDirection, tags, year]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pageItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);
  const hasFilters = Boolean(searchQuery || programTypes.length || tags.length || year);

  useEffect(() => setPage(1), [programTypes, searchQuery, sortBy, sortDirection, tags, year]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  const toggleItem = (id: string) => updateSelection(selection.includes(id) ? selection.filter((value) => value !== id) : [...selection, id]);
  const clearFilters = () => { setSearchQuery(''); setProgramTypes([]); setTags([]); setYear(''); };

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
          <div className="cvp-content-browser__footer-actions">
            <OutlineButton onClick={onClose}>Cancel</OutlineButton>
            <PrimaryButton disabled={!selection.length} onClick={() => { onConfirm?.(selection); onClose(); }}>Add selected ({selection.length})</PrimaryButton>
          </div>
        </div>
      }
    >
      <div className="cvp-content-browser">
        <div className="cvp-content-browser__tools">
          <SearchField className="cvp-content-browser__search" label="Search content" value={searchQuery} placeholder="Search title, tags or year…" onChange={(event) => setSearchQuery(event.target.value)} onClear={() => setSearchQuery('')} />
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
            <SortControl className="cvp-content-browser__filter-control cvp-content-browser__sort" value={sortBy} direction={sortDirection} onChange={(value) => setSortBy(value as 'title' | 'year')} onDirectionChange={setSortDirection} options={[{ value: 'title', label: 'Title' }, { value: 'year', label: 'Year' }]} />
            <TagFilter className="cvp-content-browser__filter-control" sections={[{ id: 'program-type', title: 'Program type', options: options.programTypes.map((value) => ({ id: value, label: value === 'movie' ? 'Movie' : 'Series' })) }]} selectedOptions={programTypes} onSelectionChange={setProgramTypes} />
            <MultiSelect className="cvp-content-browser__filter-control" label="Tags" options={options.tags.map((value) => ({ value, label: value }))} value={tags} onChange={setTags} allowCreate={false} placeholder="Select tags…" />
            <Select className="cvp-content-browser__filter-control" label="Year" value={year} onChange={setYear} placeholder="All years" options={options.years.map((value) => ({ value, label: value }))} />
            <TextButton disabled={!hasFilters} onClick={clearFilters}>Clear filters</TextButton>
          </div>
        )}

        <div className="cvp-content-browser__results-bar">
          {selection.length ? <div className="cvp-content-browser__selection-status" aria-live="polite"><span>{selection.length} selected</span><TextButton onClick={() => updateSelection([])}>Clear</TextButton></div> : <span aria-live="polite">{loading ? 'Loading content…' : `${filteredItems.length} items`}</span>}
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
                  <article className="cvp-content-browser__item" key={item.id}>
                    <button type="button" className="cvp-content-browser__item-target" aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Select'} ${item.title}`} onClick={() => toggleItem(item.id)}>
                      <span className="cvp-content-browser__poster">
                        {validThumbnail(item.thumbnail) ? <ImageWithFallback src={item.thumbnail} alt="" className="cvp-content-browser__image" /> : <span className="cvp-content-browser__placeholder"><Film size={28} /></span>}
                      </span>
                      <span className="cvp-content-browser__item-copy"><strong title={item.title}>{item.title}</strong><span>{[item.year, ...(item.tags?.length ? item.tags : [item.genre])].filter(Boolean).join(' · ')}</span></span>
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
