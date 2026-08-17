import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Film, GripVertical, Pin, Plus } from 'lucide-react';
import { Checkbox } from './Checkbox';
import { IconButton } from './IconButton';
import { IconSmallButton } from './IconSmallButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import './RailContentGallery.css';

export interface RailContentItem {
  id: string;
  title: string;
  year: string;
  thumbnail: string;
  position?: number;
  metadata?: { category?: string; duration?: string; status?: 'active' | 'inactive' | 'pinned' };
}

export interface RailContentGalleryProps {
  title: string;
  items: RailContentItem[];
  variant?: 'management' | 'display' | 'display-grid' | 'display-grid-selectable';
  showItemCount?: boolean;
  itemCountPlacement?: 'heading' | 'navigation';
  showNavigation?: boolean;
  headerStatus?: string;
  headerDate?: string;
  onItemClick?: (item: RailContentItem) => void;
  onEdit?: (item: RailContentItem) => void;
  onPin?: (item: RailContentItem) => void;
  onDrag?: (itemId: string, newPosition: number) => void;
  onSelectionChange?: (selectedItems: string[]) => void;
  selectedItems?: string[];
  hideHeader?: boolean;
  onScrollStateChange?: (canLeft: boolean, canRight: boolean) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptySlotCount?: number;
  onAddToEmptySlot?: (position: number) => void;
}

export interface RailContentGalleryHandle { scrollLeft: () => void; scrollRight: () => void; }

const validThumbnail = (value: string) => /^https?:\/\//.test(value?.trim() ?? '');

export const RailContentGallery = forwardRef<RailContentGalleryHandle, RailContentGalleryProps>(function RailContentGallery({
  title, items, variant = 'display', showItemCount = true, itemCountPlacement = 'heading', showNavigation = true, headerStatus, headerDate, hideHeader = false,
  onScrollStateChange, onItemClick, onEdit, onPin, onDrag, onSelectionChange, selectedItems = [], loading = false,
  emptyMessage = 'No content has been added to this rail yet.', emptySlotCount = 0, onAddToEmptySlot,
}, ref) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [pinned, setPinned] = useState(() => new Set(items.filter((item) => item.metadata?.status === 'pinned').map((item) => item.id)));
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const grid = variant === 'display-grid' || variant === 'display-grid-selectable';
  const selectable = variant === 'display-grid-selectable';
  const management = variant === 'management';
  const hasRailItems = items.length > 0 || emptySlotCount > 0;
  const itemCount = <span className="cvp-rail-gallery__count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>;

  const updateScrollState = () => {
    const node = scroller.current;
    if (!node || grid) return;
    const nextLeft = node.scrollLeft > 1;
    const nextRight = node.scrollLeft < node.scrollWidth - node.clientWidth - 1;
    setCanLeft(nextLeft); setCanRight(nextRight); onScrollStateChange?.(nextLeft, nextRight);
  };
  const scroll = (direction: -1 | 1) => scroller.current?.scrollBy({ left: direction * Math.max(scroller.current.clientWidth * .75, 280), behavior: 'smooth' });
  useImperativeHandle(ref, () => ({ scrollLeft: () => scroll(-1), scrollRight: () => scroll(1) }));

  useEffect(() => {
    const node = scroller.current;
    if (!node || grid) return;
    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(node);
    return () => observer.disconnect();
  }, [items, emptySlotCount, grid]);

  const toggleSelection = (id: string) => onSelectionChange?.(selectedItems.includes(id) ? selectedItems.filter((value) => value !== id) : [...selectedItems, id]);
  const togglePin = (item: RailContentItem) => { setPinned((current) => { const next = new Set(current); next.has(item.id) ? next.delete(item.id) : next.add(item.id); return next; }); onPin?.(item); };

  return (
    <section className={`rail-content-gallery cvp-rail-gallery cvp-rail-gallery--${variant}`} aria-label={title}>
      {!hideHeader && <header className="cvp-rail-gallery__header"><div className="cvp-rail-gallery__heading"><h3>{title}</h3>{showItemCount && itemCountPlacement === 'heading' && itemCount}{headerStatus && <span className="cvp-rail-gallery__status">{headerStatus}</span>}{headerDate && <span className="cvp-rail-gallery__date">{headerDate}</span>}</div>{showNavigation && !grid && hasRailItems && <div className="cvp-rail-gallery__navigation" role="group" aria-label={`${title} navigation`}>{showItemCount && itemCountPlacement === 'navigation' && itemCount}<IconButton size="small" aria-label="Previous items" disabled={!canLeft} onClick={() => scroll(-1)}><ChevronLeft size={16} /></IconButton><IconButton size="small" aria-label="Next items" disabled={!canRight} onClick={() => scroll(1)}><ChevronRight size={16} /></IconButton></div>}</header>}

      {loading ? <div className="cvp-rail-gallery__state" role="status"><span className="cvp-rail-gallery__spinner" />Loading content…</div> : items.length === 0 && emptySlotCount > 0 ? <div ref={scroller} className="cvp-rail-gallery__items cvp-rail-gallery__items--rail cvp-rail-gallery__empty-slots" aria-label="Empty content slots" onScroll={updateScrollState}>{Array.from({ length: emptySlotCount }, (_, index) => <button key={index} className="cvp-rail-gallery__empty-slot" type="button" onClick={() => onAddToEmptySlot?.(index + 1)} aria-label={`Add content to slot ${index + 1}`}><span className="cvp-rail-gallery__empty-slot-media"><Plus size={16} aria-hidden="true" /><span className="cvp-rail-gallery__position">{index + 1}</span></span><span className="cvp-rail-gallery__empty-slot-label">Empty slot</span></button>)}</div> : items.length === 0 ? <div className="cvp-rail-gallery__state"><Film size={32} aria-hidden="true" /><strong>No content yet</strong><p>{emptyMessage}</p></div> : <div ref={scroller} className={`cvp-rail-gallery__items ${grid ? 'cvp-rail-gallery__items--grid' : 'cvp-rail-gallery__items--rail'}`} onScroll={updateScrollState}>
        {items.map((item, index) => {
          const isSelected = selectedItems.includes(item.id);
          const isPinned = pinned.has(item.id);
          return <article key={item.id} className={`cvp-rail-gallery__item ${isSelected ? 'cvp-rail-gallery__item--selected' : ''} ${draggedId === item.id ? 'cvp-rail-gallery__item--dragging' : ''}`} draggable={management} onDragStart={() => setDraggedId(item.id)} onDragEnd={() => setDraggedId(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (draggedId && draggedId !== item.id) onDrag?.(draggedId, index); setDraggedId(null); }}>
            <div className="cvp-rail-gallery__media">
              <button type="button" className="cvp-rail-gallery__target" aria-label={`${selectable ? (isSelected ? 'Remove' : 'Select') : 'Open'} ${item.title}`} aria-pressed={selectable ? isSelected : undefined} onClick={() => selectable ? toggleSelection(item.id) : onItemClick?.(item)}>
                {validThumbnail(item.thumbnail) ? <ImageWithFallback src={item.thumbnail} alt="" className="cvp-rail-gallery__image" /> : <span className="cvp-rail-gallery__placeholder"><Film size={28} aria-hidden="true" /></span>}
              </button>
              {management && <><span className="cvp-rail-gallery__position">{item.position ?? index + 1}</span><span className="cvp-rail-gallery__drag"><GripVertical size={15} aria-hidden="true" /></span><div className="cvp-rail-gallery__actions"><IconSmallButton aria-label={`Edit ${item.title}`} onClick={() => onEdit?.(item)}><Edit2 size={14} /></IconSmallButton><IconSmallButton aria-label={`${isPinned ? 'Unpin' : 'Pin'} ${item.title}`} aria-pressed={isPinned} onClick={() => togglePin(item)}><Pin size={14} /></IconSmallButton></div></>}
              {selectable && <Checkbox className="cvp-rail-gallery__checkbox" checked={isSelected} aria-label={`Select ${item.title}`} onChange={() => toggleSelection(item.id)} />}
              {isPinned && <span className="cvp-rail-gallery__pinned" role="img" aria-label="Pinned"><Pin size={12} aria-hidden="true" /></span>}
            </div>
            <div className="cvp-rail-gallery__copy"><strong title={item.title}>{item.title}</strong><span>{[item.year, item.metadata?.category, item.metadata?.duration].filter(Boolean).join(' · ')}</span></div>
          </article>;
        })}
      </div>}
    </section>
  );
});
