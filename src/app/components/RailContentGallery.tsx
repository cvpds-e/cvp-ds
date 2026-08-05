import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ChevronLeft, ChevronRight, Edit2, Pin, GripVertical, Film, Info, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { IconButton } from './IconButton';
import { IconSmallButton } from './IconSmallButton';

export interface RailContentItem {
  id: string;
  title: string;
  year: string;
  thumbnail: string;
  position?: number;
  metadata?: {
    category?: string;
    duration?: string;
    status?: 'active' | 'inactive' | 'pinned';
  };
}

export interface RailContentGalleryProps {
  /** Gallery title */
  title: string;
  /** Array of content items to display */
  items: RailContentItem[];
  /** Gallery variant - management for full controls, display for simplified view, display-grid for vertical grid, display-grid-selectable for vertical grid with checkboxes */
  variant?: 'management' | 'display' | 'display-grid' | 'display-grid-selectable';
  /** Show item count in header */
  showItemCount?: boolean;
  /** Show navigation arrows */
  showNavigation?: boolean;
  /** Editorial status or additional info in header */
  headerStatus?: string;
  /** Header date */
  headerDate?: string;
  /** Callback when an item is clicked */
  onItemClick?: (item: RailContentItem) => void;
  /** Callback when edit action is triggered (management variant only) */
  onEdit?: (item: RailContentItem) => void;
  /** Callback when pin action is triggered (management variant only) */
  onPin?: (item: RailContentItem) => void;
  /** Callback when item is dragged (management variant only) */
  onDrag?: (itemId: string, newPosition: number) => void;
  /** Callback when item selection changes (display-grid-selectable variant only) */
  onSelectionChange?: (selectedItems: string[]) => void;
  /** Selected item IDs (display-grid-selectable variant only) */
  selectedItems?: string[];
  /** Hide the built-in header row (title + controls) */
  hideHeader?: boolean;
  /** Called whenever scroll-ability changes, so a parent can render its own controls */
  onScrollStateChange?: (canLeft: boolean, canRight: boolean) => void;
}

export interface RailContentGalleryHandle {
  scrollLeft: () => void;
  scrollRight: () => void;
}

export const RailContentGallery = forwardRef<RailContentGalleryHandle, RailContentGalleryProps>(function RailContentGallery({
  title,
  items,
  variant = 'display',
  showItemCount = true,
  showNavigation = true,
  headerStatus,
  headerDate,
  hideHeader = false,
  onScrollStateChange,
  onItemClick,
  onEdit,
  onPin,
  onDrag,
  onSelectionChange,
  selectedItems = []
}, ref) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [overriddenItems, setOverriddenItems] = useState<Set<string>>(new Set());
  const [pinnedItems, setPinnedItems] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const itemWidth = 136; // Item width (120px) + gap (16px) - same for all variants
    const scrollAmount = itemWidth * 3; // Scroll 3 items at a time

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleItemSelection = (itemId: string) => {
    if (variant !== 'display-grid-selectable') return;
    
    const isSelected = selectedItems.includes(itemId);
    let newSelection: string[];
    
    if (isSelected) {
      newSelection = selectedItems.filter(id => id !== itemId);
    } else {
      newSelection = [...selectedItems, itemId];
    }
    
    onSelectionChange?.(newSelection);
  };

  const handleScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    setScrollPosition(scrollLeft);
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  };

  const handleItemAction = (action: 'click' | 'edit' | 'pin', item: RailContentItem) => {
    switch (action) {
      case 'click':
        onItemClick?.(item);
        break;
      case 'edit':
        // Add item to overridden items set when edit is clicked
        setOverriddenItems(prev => new Set([...prev, item.id]));
        onEdit?.(item);
        break;
      case 'pin':
        // Toggle pin state internally for immediate visual feedback
        setPinnedItems(prev => {
          const newPinnedItems = new Set(prev);
          if (newPinnedItems.has(item.id)) {
            newPinnedItems.delete(item.id);
          } else {
            newPinnedItems.add(item.id);
          }
          return newPinnedItems;
        });
        onPin?.(item);
        break;
    }
  };

  // Helper function to check if an item is pinned (either internally or via metadata)
  const isItemPinned = (item: RailContentItem) => {
    return pinnedItems.has(item.id) || item.metadata?.status === 'pinned';
  };

  useImperativeHandle(ref, () => ({
    scrollLeft: () => handleScroll('left'),
    scrollRight: () => handleScroll('right'),
  }));

  // Notify parent of scroll state changes
  useEffect(() => {
    onScrollStateChange?.(canScrollLeft, canScrollRight);
  }, [canScrollLeft, canScrollRight]);

  // Initialize scroll state and set up ResizeObserver
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScrollUpdate();
    }, 100);

    const container = scrollContainerRef.current;
    if (!container) return () => clearTimeout(timer);

    const resizeObserver = new ResizeObserver(() => {
      handleScrollUpdate();
    });

    resizeObserver.observe(container);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [items]);

  return (
    <>
      <style>{`
        .rail-content-gallery {
          /* Design System Tokens */
          --rail-gallery-bg: transparent;
          --rail-gallery-padding: 0;
          --rail-gallery-font-family: var(--font-family);

          /* Header Tokens */
          --rail-gallery-header-padding: 0 0 var(--spacing-4) 0;
          --rail-gallery-header-gap: var(--spacing-4);
          --rail-gallery-title-font-size: var(--type-scale-m-size);
          --rail-gallery-title-font-weight: var(--type-scale-m-weight);
          --rail-gallery-title-line-height: var(--type-scale-m-line-height);
          --rail-gallery-title-color: var(--foreground);
          --rail-gallery-count-font-size: var(--type-scale-s-size);
          --rail-gallery-count-font-family: var(--font-family-mono);
          --rail-gallery-count-font-weight: 400;
          --rail-gallery-count-line-height: 20px;
          --rail-gallery-count-letter-spacing: 0.1px;
          --rail-gallery-count-color: var(--muted-foreground);
          --rail-gallery-status-font-size: var(--type-scale-s-size);
          --rail-gallery-status-color: var(--muted-foreground);

          /* Container Tokens */
          --rail-gallery-container-max-width: 1000px;
          --rail-gallery-container-gap: var(--spacing-4);
          --rail-gallery-container-padding: 0 var(--spacing-1);
          --rail-gallery-scroll-behavior: smooth;

          /* Grid Tokens */
          --rail-gallery-grid-columns: repeat(auto-fill, minmax(120px, 1fr));
          --rail-gallery-grid-gap: var(--spacing-4);
          --rail-gallery-grid-max-height: 400px;

          /* Item Tokens - All variants use same size as management */
          --rail-gallery-item-management-width: 120px;
          --rail-gallery-item-display-width: 120px;
          --rail-gallery-item-bg: transparent;
          --rail-gallery-item-border-radius: var(--radius-md);
          --rail-gallery-item-transition: all 0.2s ease;
          --rail-gallery-item-hover-transform: translateY(-2px);
          --rail-gallery-item-focus-outline: 2px solid var(--focus-ring);
          --rail-gallery-item-focus-outline-offset: 2px;

          /* Image Tokens */
          --rail-gallery-image-aspect-ratio: 2/3;
          --rail-gallery-image-border-radius: var(--radius-md);
          --rail-gallery-image-bg: var(--muted);

          /* Placeholder Tokens */
          --rail-gallery-placeholder-bg: #2e2e30;
          --rail-gallery-placeholder-icon-color: #6b6b6b;
          --rail-gallery-placeholder-icon-size: 28px;

          /* Empty State Tokens */
          --rail-gallery-empty-state-padding: 48px 24px;
          --rail-gallery-empty-state-bg: transparent;
          --rail-gallery-empty-state-border: 1px dashed rgba(255, 255, 255, 0.1);
          --rail-gallery-empty-state-border-radius: var(--radius-md);
          --rail-gallery-empty-state-icon-size: 48px;
          --rail-gallery-empty-state-icon-color: #6b6b78;
          --rail-gallery-empty-state-text-color: #9b9ba5;
          --rail-gallery-empty-state-text-size: var(--type-scale-m-size);
          --rail-gallery-empty-state-text-weight: var(--type-scale-m-weight);
          --rail-gallery-empty-state-gap: 16px;

          /* Position Number Tokens */
          --rail-gallery-position-size: 24px;
          --rail-gallery-position-bg: rgba(0, 0, 0, 0.8);
          --rail-gallery-position-color: #fff;
          --rail-gallery-position-font-size: var(--type-scale-s-size);
          --rail-gallery-position-font-weight: var(--font-weight-medium);
          --rail-gallery-position-border-radius: 4px;

          /* Action Controls Tokens */
          --rail-gallery-action-spacing: var(--spacing-1);

          /* Selection Checkbox Tokens */
          --rail-gallery-checkbox-size: 24px;
          --rail-gallery-checkbox-bg: rgba(0, 0, 0, 0.8);
          --rail-gallery-checkbox-border: 1px solid rgba(255, 255, 255, 0.3);
          --rail-gallery-checkbox-selected-bg: #3d63dd;
          --rail-gallery-checkbox-selected-border: var(--border-focus);
          --rail-gallery-checkbox-hover-bg: rgba(61, 99, 221, 0.1);
          --rail-gallery-checkbox-border-radius: 4px;

          /* Content Tokens */
          --rail-gallery-content-padding: var(--spacing-3) 0 0 0;
          --rail-gallery-content-gap: var(--spacing-1);

          /* Title Tokens */
          --rail-gallery-item-title-font-size: var(--type-scale-s-size);
          --rail-gallery-item-title-font-weight: var(--type-scale-s-medium-weight);
          --rail-gallery-item-title-line-height: var(--type-scale-s-line-height);
          --rail-gallery-item-title-color: var(--foreground);

          /* Year Tokens */
          --rail-gallery-item-year-font-size: var(--type-scale-s-size);
          --rail-gallery-item-year-font-weight: var(--type-scale-s-weight);
          --rail-gallery-item-year-line-height: var(--type-scale-s-line-height);
          --rail-gallery-item-year-color: var(--muted-foreground);

          /* Navigation Tokens */
          --rail-gallery-nav-spacing: var(--spacing-2);

          /* Component Styles */
          background: var(--rail-gallery-bg);
          padding: var(--rail-gallery-padding);
          font-family: var(--rail-gallery-font-family);
          min-width: 0;
          width: 100%;
        }

        .rail-content-gallery__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--rail-gallery-header-padding);
          gap: var(--rail-gallery-header-gap);
          width: 100%;
          max-width: var(--rail-gallery-container-max-width);
          min-width: 0;
          box-sizing: border-box;
        }

        .rail-content-gallery__title-section {
          display: flex;
          align-items: center;
          align-self: stretch;
          gap: var(--rail-gallery-header-gap);
        }

        .rail-content-gallery__title {
          font-size: 14px;
          font-weight: var(--rail-gallery-title-font-weight);
          line-height: 20px;
          color: var(--rail-gallery-title-color);
          margin: 0;
          display: flex;
          align-items: center;
        }

        .rail-content-gallery__count {
          font-family: var(--rail-gallery-count-font-family);
          font-size: var(--rail-gallery-count-font-size);
          font-weight: var(--rail-gallery-count-font-weight);
          line-height: var(--rail-gallery-count-line-height);
          letter-spacing: var(--rail-gallery-count-letter-spacing);
          color: var(--rail-gallery-count-color);
          background: var(--secondary);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
        }

        .rail-content-gallery__status-section {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .rail-content-gallery__status {
          font-size: var(--rail-gallery-status-font-size);
          color: var(--rail-gallery-status-color);
          background: var(--color-blue-800);
          color: var(--color-blue-200);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          font-weight: var(--font-weight-medium);
        }

        .rail-content-gallery__date {
          font-size: var(--rail-gallery-status-font-size);
          color: var(--rail-gallery-status-color);
        }

        .rail-content-gallery__navigation {
          display: flex;
          gap: var(--rail-gallery-nav-spacing);
          align-items: center;
        }



        .rail-content-gallery__container {
          position: relative;
          width: 100%;
          max-width: var(--rail-gallery-container-max-width);
        }

        .rail-content-gallery__container--grid {
          max-height: var(--rail-gallery-grid-max-height);
          overflow-y: auto;
        }

        .rail-content-gallery__rail {
          display: flex;
          gap: var(--rail-gallery-container-gap);
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: var(--rail-gallery-scroll-behavior);
          padding: var(--rail-gallery-container-padding);
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
        }

        .rail-content-gallery__rail::-webkit-scrollbar {
          height: 10px;
        }

        .rail-content-gallery__rail::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }

        .rail-content-gallery__rail::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rail-content-gallery__rail::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.6);
        }

        .rail-content-gallery__grid {
          display: grid;
          grid-template-columns: var(--rail-gallery-grid-columns);
          gap: var(--rail-gallery-grid-gap);
          padding: var(--rail-gallery-container-padding);
          overflow-y: auto;
          max-height: var(--rail-gallery-grid-max-height);
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
        }

        .rail-content-gallery__grid::-webkit-scrollbar {
          width: 10px;
        }

        .rail-content-gallery__grid::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }

        .rail-content-gallery__grid::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .rail-content-gallery__grid::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.6);
        }

        .rail-content-gallery__item {
          background: var(--rail-gallery-item-bg);
          border-radius: var(--rail-gallery-item-border-radius);
          transition: var(--rail-gallery-item-transition);
          cursor: pointer;
          outline: none;
          flex-shrink: 0;
          position: relative;
        }

        .rail-content-gallery__item:hover {
          transform: var(--rail-gallery-item-hover-transform);
        }

        .rail-content-gallery__item:focus-visible {
          outline: var(--rail-gallery-item-focus-outline);
          outline-offset: var(--rail-gallery-item-focus-outline-offset);
        }

        .rail-content-gallery__item--management {
          width: var(--rail-gallery-item-management-width);
        }

        .rail-content-gallery__item--display {
          width: var(--rail-gallery-item-display-width);
        }

        .rail-content-gallery__item--display-grid,
        .rail-content-gallery__item--display-grid-selectable {
          width: 100%;
        }

        .rail-content-gallery__item-image-container {
          position: relative;
          border-radius: var(--rail-gallery-image-border-radius);
          overflow: hidden;
          background: var(--rail-gallery-image-bg);
          aspect-ratio: var(--rail-gallery-image-aspect-ratio);
        }

        .rail-content-gallery__item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .rail-content-gallery__placeholder {
          width: 100%;
          height: 100%;
          background: var(--rail-gallery-placeholder-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--rail-gallery-image-border-radius);
        }

        .rail-content-gallery__placeholder-icon {
          color: var(--rail-gallery-placeholder-icon-color);
          opacity: 0.8;
        }

        .rail-content-gallery__item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rail-content-gallery__item:hover .rail-content-gallery__item-overlay {
          opacity: 1;
        }

        .rail-content-gallery__item-overlay-icon {
          color: #fff;
          opacity: 0.8;
        }

        .rail-content-gallery__position-number {
          position: absolute;
          bottom: var(--spacing-2);
          left: var(--spacing-2);
          width: var(--rail-gallery-position-size);
          height: var(--rail-gallery-position-size);
          background: var(--rail-gallery-position-bg);
          color: var(--rail-gallery-position-color);
          border-radius: var(--rail-gallery-position-border-radius);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--rail-gallery-position-font-size);
          font-weight: var(--rail-gallery-position-font-weight);
          z-index: 2;
        }

        .rail-content-gallery__position-number--override {
          background: #f59e0bf2;
          border: 1px solid var(--color-warning-border);
        }

        .rail-content-gallery__actions {
          position: absolute;
          top: var(--spacing-2);
          right: var(--spacing-2);
          display: flex;
          flex-direction: column;
          gap: var(--rail-gallery-action-spacing);
          z-index: 2;
        }

        .rail-content-gallery__action-button {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .rail-content-gallery__item:hover .rail-content-gallery__action-button {
          opacity: 1;
        }

        .rail-content-gallery__action-button:focus-visible {
          opacity: 1;
        }

        .rail-content-gallery__action-button--active {
          background-color: #10B981 !important;
          opacity: 1;
        }

        .rail-content-gallery__action-button--active:hover {
          background-color: #059669 !important;
        }

        .rail-content-gallery__action-button--active svg {
          color: #fff !important;
        }

        .rail-content-gallery__drag-handle {
          position: absolute;
          top: var(--spacing-2);
          left: var(--spacing-2);
          opacity: 0;
          cursor: grab;
          transition: opacity 0.2s ease;
          z-index: 2;
        }

        .rail-content-gallery__item:hover .rail-content-gallery__drag-handle {
          opacity: 1;
        }

        .rail-content-gallery__drag-handle:active {
          cursor: grabbing;
        }

        .rail-content-gallery__item-content {
          padding: var(--rail-gallery-content-padding);
          display: flex;
          flex-direction: column;
          gap: var(--rail-gallery-content-gap);
        }

        .rail-content-gallery__item-title {
          font-size: var(--rail-gallery-item-title-font-size);
          font-weight: var(--rail-gallery-item-title-font-weight);
          line-height: var(--rail-gallery-item-title-line-height);
          color: var(--rail-gallery-item-title-color);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .rail-content-gallery__item-year {
          font-size: var(--rail-gallery-item-year-font-size);
          font-weight: var(--rail-gallery-item-year-font-weight);
          line-height: var(--rail-gallery-item-year-line-height);
          color: var(--rail-gallery-item-year-color);
          margin: 0;
        }

        .rail-content-gallery__selection-checkbox {
          position: absolute;
          top: var(--spacing-2);
          left: var(--spacing-2);
          width: var(--rail-gallery-checkbox-size);
          height: var(--rail-gallery-checkbox-size);
          background: var(--rail-gallery-checkbox-bg);
          border: var(--rail-gallery-checkbox-border);
          border-radius: var(--rail-gallery-checkbox-border-radius);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 2;
        }

        .rail-content-gallery__item:hover .rail-content-gallery__selection-checkbox {
          opacity: 1;
        }

        .rail-content-gallery__selection-checkbox:hover {
          background: var(--rail-gallery-checkbox-hover-bg);
        }

        .rail-content-gallery__selection-checkbox--selected {
          background: var(--rail-gallery-checkbox-selected-bg);
          border-color: var(--rail-gallery-checkbox-selected-border);
          opacity: 1;
        }

        .rail-content-gallery__selection-checkbox--selected:hover {
          background: var(--rail-gallery-checkbox-selected-bg);
        }

        .rail-content-gallery__selection-icon {
          color: #fff;
          opacity: 0.9;
        }

        .rail-content-gallery__override-tag {
          position: absolute;
          bottom: 8px;
          right: 8px;
          color: #fff;
          font-family: var(--font-family);
          backdrop-filter: blur(8px);
          text-transform: uppercase;
          letter-spacing: .5px;
          white-space: nowrap;
          background: #f59e0bf2;
          border: 1px solid var(--color-warning-border);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 9px;
          font-weight: 700;
          line-height: 1;
          box-shadow: 0 2px 6px #00000080;
          z-index: 3;
        }

        .rail-content-gallery__empty-state {
          padding: var(--rail-gallery-empty-state-padding);
          background: var(--rail-gallery-empty-state-bg);
          border: var(--rail-gallery-empty-state-border);
          border-radius: var(--rail-gallery-empty-state-border-radius);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--rail-gallery-empty-state-gap);
          min-height: 200px;
        }

        .rail-content-gallery__empty-state-icon {
          color: var(--rail-gallery-empty-state-icon-color);
          opacity: 0.6;
        }

        .rail-content-gallery__empty-state-text {
          color: var(--rail-gallery-empty-state-text-color);
          font-size: var(--rail-gallery-empty-state-text-size);
          font-weight: var(--rail-gallery-empty-state-text-weight);
          text-align: center;
        }
      `}</style>

      <div className="rail-content-gallery">
        {!hideHeader && <div className="rail-content-gallery__header">
          <div className="rail-content-gallery__title-section">
            <h1 className="rail-content-gallery__title">{title}</h1>
          </div>
          
          <div className="rail-content-gallery__status-section">
            {variant === 'management' && headerStatus && (
              <span className="rail-content-gallery__status">{headerStatus}</span>
            )}
            {variant === 'management' && headerDate && (
              <span className="rail-content-gallery__date">{headerDate}</span>
            )}
            
            {showItemCount && (
              <span className="rail-content-gallery__count">
                {items.length} item{items.length !== 1 ? 's' : ''}
              </span>
            )}
            
            {showNavigation && (variant === 'management' || variant === 'display') && (
              <div className="rail-content-gallery__navigation">
                {variant === 'management' && (
                  <IconButton
                    aria-label="Rail info"
                  >
                    <Info size={16} strokeWidth={2} />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </IconButton>
                <IconButton
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </IconButton>
              </div>
            )}
          </div>
        </div>}

        <div className={`rail-content-gallery__container ${
          (variant === 'display-grid' || variant === 'display-grid-selectable') ? 'rail-content-gallery__container--grid' : ''
        }`}>
          {(variant === 'display-grid' || variant === 'display-grid-selectable') ? (
            <div className="rail-content-gallery__grid">
            {items.length === 0 ? (
              <div className="rail-content-gallery__empty-state">
                <Film size={48} className="rail-content-gallery__empty-state-icon" />
                <p className="rail-content-gallery__empty-state-text">No content in this rail</p>
              </div>
            ) : (
              items.map((item, index) => (
              <div
                key={item.id}
                className={`rail-content-gallery__item rail-content-gallery__item--${variant}`}
                onClick={(e) => {
                  if (variant === 'display-grid-selectable') {
                    e.preventDefault();
                    handleItemSelection(item.id);
                  } else {
                    handleItemAction('click', item);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (variant === 'display-grid-selectable') {
                      handleItemSelection(item.id);
                    } else {
                      handleItemAction('click', item);
                    }
                  }
                }}
              >
                <div className="rail-content-gallery__item-image-container">
                  {item.thumbnail ? (
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={`${item.title} (${item.year})`}
                      className="rail-content-gallery__item-image"
                    />
                  ) : (
                    <div className="rail-content-gallery__placeholder">
                      <Film size={28} className="rail-content-gallery__placeholder-icon" />
                    </div>
                  )}

                  {/* Selection checkbox for display-grid-selectable variant */}
                  {variant === 'display-grid-selectable' && (
                    <div 
                      className={`rail-content-gallery__selection-checkbox ${
                        selectedItems.includes(item.id) ? 'rail-content-gallery__selection-checkbox--selected' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemSelection(item.id);
                      }}
                    >
                      {selectedItems.includes(item.id) && (
                        <Check size={14} className="rail-content-gallery__selection-icon" />
                      )}
                    </div>
                  )}

                  {/* Management variant controls */}
                  {variant === 'management' && (
                    <>
                      {/* Position number */}
                      <div className={`rail-content-gallery__position-number ${
                        overriddenItems.has(item.id) ? 'rail-content-gallery__position-number--override' : ''
                      }`}>
                        {item.position || index + 1}
                      </div>

                      {/* Action buttons */}
                      <div className="rail-content-gallery__actions">
                        <IconSmallButton
                          className={`rail-content-gallery__action-button ${
                            isItemPinned(item) ? 'rail-content-gallery__action-button--active' : ''
                          }`}
                          variant="rail-gallery"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemAction('pin', item);
                          }}
                          aria-label={`${isItemPinned(item) ? 'Unpin' : 'Pin'} ${item.title}`}
                        >
                          <Pin size={14} />
                        </IconSmallButton>
                        <IconSmallButton
                          className="rail-content-gallery__action-button"
                          variant="rail-gallery"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemAction('edit', item);
                          }}
                          aria-label={`Edit ${item.title}`}
                        >
                          <Edit2 size={14} />
                        </IconSmallButton>
                      </div>

                      {/* Drag handle */}
                      <IconSmallButton
                        className="rail-content-gallery__drag-handle"
                        variant="rail-gallery"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', item.id);
                        }}
                        aria-label={`Drag to reorder ${item.title}`}
                      >
                        <GripVertical size={14} />
                      </IconSmallButton>

                      {/* Override tag */}
                      {overriddenItems.has(item.id) && (
                        <div className="rail-content-gallery__override-tag">
                          Override
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="rail-content-gallery__item-content">
                  <h3 className="rail-content-gallery__item-title">{item.title}</h3>
                  <p className="rail-content-gallery__item-year">{item.year}</p>
                </div>
              </div>
            )))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="rail-content-gallery__rail"
              onScroll={handleScrollUpdate}
            >
              {items.length === 0 ? (
                <div className="rail-content-gallery__empty-state" style={{ width: '100%' }}>
                  <Film size={48} className="rail-content-gallery__empty-state-icon" />
                  <p className="rail-content-gallery__empty-state-text">No content in this rail</p>
                </div>
              ) : (
                items.map((item, index) => (
                <div
                  key={item.id}
                  className={`rail-content-gallery__item rail-content-gallery__item--${variant}`}
                  onClick={() => handleItemAction('click', item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemAction('click', item);
                    }
                  }}
                >
                  <div className="rail-content-gallery__item-image-container">
                    {item.thumbnail ? (
                      <ImageWithFallback
                        src={item.thumbnail}
                        alt={`${item.title} (${item.year})`}
                        className="rail-content-gallery__item-image"
                      />
                    ) : (
                      <div className="rail-content-gallery__placeholder">
                        <Film size={28} className="rail-content-gallery__placeholder-icon" />
                      </div>
                    )}

                    {/* Management variant controls */}
                    {variant === 'management' && (
                      <>
                        {/* Position number */}
                        <div className={`rail-content-gallery__position-number ${
                          overriddenItems.has(item.id) ? 'rail-content-gallery__position-number--override' : ''
                        }`}>
                          {item.position || index + 1}
                        </div>

                        {/* Action buttons */}
                        <div className="rail-content-gallery__actions">
                          <IconSmallButton
                            className={`rail-content-gallery__action-button ${
                              isItemPinned(item) ? 'rail-content-gallery__action-button--active' : ''
                            }`}
                            variant="rail-gallery"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemAction('pin', item);
                            }}
                            aria-label={`${isItemPinned(item) ? 'Unpin' : 'Pin'} ${item.title}`}
                          >
                            <Pin size={14} />
                          </IconSmallButton>
                          <IconSmallButton
                            className="rail-content-gallery__action-button"
                            variant="rail-gallery"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemAction('edit', item);
                            }}
                            aria-label={`Edit ${item.title}`}
                          >
                            <Edit2 size={14} />
                          </IconSmallButton>
                        </div>

                        {/* Drag handle */}
                        <IconSmallButton
                          className="rail-content-gallery__drag-handle"
                          variant="rail-gallery"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', item.id);
                          }}
                          aria-label={`Drag to reorder ${item.title}`}
                        >
                          <GripVertical size={14} />
                        </IconSmallButton>

                        {/* Override tag */}
                        {overriddenItems.has(item.id) && (
                          <div className="rail-content-gallery__override-tag">
                            Override
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="rail-content-gallery__item-content">
                    <h3 className="rail-content-gallery__item-title">{item.title}</h3>
                    <p className="rail-content-gallery__item-year">{item.year}</p>
                  </div>
                </div>
              )))}
            </div>
          )}
        </div>
      </div>
    </>
  );
});