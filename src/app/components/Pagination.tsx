import React, { useEffect, useState } from 'react';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { TextButton } from './TextButton';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  itemLabel?: string;
  className?: string;
}

/**
 * A compact, controlled page navigator for dense operational collections.
 * It owns page navigation only; filtering and rows-per-page stay with its parent.
 */
export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = 'items',
  className = '',
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const [pageValue, setPageValue] = useState(String(safePage));
  const [navigationUnit, setNavigationUnit] = useState<'page' | 'row'>('page');
  const navigationDisabled = !onPageChange;
  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const lastItem = Math.min(safePage * pageSize, totalItems);
  const [rowValue, setRowValue] = useState(String(firstItem));
  const isPageNavigation = navigationUnit === 'page';
  const unitTotal = isPageNavigation ? totalPages : Math.max(totalItems, 1);
  const navigationValue = isPageNavigation ? pageValue : rowValue;
  const currentUnit = Math.min(Math.max(Number(navigationValue) || 1, 1), unitTotal);

  useEffect(() => setPageValue(String(safePage)), [safePage]);
  useEffect(() => {
    if (!isPageNavigation) setRowValue((current) => Number(current) < firstItem || Number(current) > lastItem ? String(firstItem) : current);
  }, [firstItem, isPageNavigation, lastItem]);

  const commitNavigation = () => {
    const nextValue = Number(navigationValue);
    if (!Number.isInteger(nextValue)) {
      isPageNavigation ? setPageValue(String(safePage)) : setRowValue(String(firstItem));
      return;
    }
    goToUnit(nextValue);
  };

  const goToUnit = (value: number) => {
    const nextValue = Math.min(Math.max(value, 1), unitTotal);
    if (!isPageNavigation) setRowValue(String(nextValue));
    else setPageValue(String(nextValue));
    const nextPage = isPageNavigation ? nextValue : Math.ceil(nextValue / pageSize);
    if (nextPage !== safePage) onPageChange?.(nextPage);
  };

  const toggleNavigationUnit = () => {
    setNavigationUnit((current) => {
      const next = current === 'page' ? 'row' : 'page';
      if (next === 'row') setRowValue(String(firstItem));
      else setPageValue(String(safePage));
      return next;
    });
  };

  return (
    <nav className={`cvp-pagination ${className}`.trim()} aria-label={`${itemLabel} pagination`}>
      <p className="cvp-pagination__summary" aria-live="polite">
        {totalItems ? `Showing ${firstItem}–${lastItem} of ${totalItems} ${itemLabel}` : `No ${itemLabel}`}
      </p>
      <div className="cvp-pagination__controls">
        <button className="cvp-pagination__button" type="button" aria-label={`First ${navigationUnit}`} disabled={navigationDisabled || currentUnit === 1} onClick={() => goToUnit(1)}><ChevronsLeft aria-hidden="true" /></button>
        <button className="cvp-pagination__button" type="button" aria-label={`Previous ${navigationUnit}`} disabled={navigationDisabled || currentUnit === 1} onClick={() => goToUnit(currentUnit - 1)}><ChevronLeft aria-hidden="true" /></button>
        <TextButton variant="contextual" className="cvp-pagination__mode-toggle" aria-label={`Switch to ${isPageNavigation ? 'row' : 'page'} navigation`} onClick={toggleNavigationUnit}>{isPageNavigation ? 'Page' : 'Row'}</TextButton>
        <label className="cvp-pagination__page-field">
          <span className="cvp-visually-hidden">Current {navigationUnit}</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={navigationValue}
            readOnly={navigationDisabled}
            aria-label={`Current ${navigationUnit}, ${currentUnit} of ${unitTotal}`}
            onChange={(event) => (isPageNavigation ? setPageValue : setRowValue)(event.target.value.replace(/[^0-9]/g, ''))}
            onBlur={commitNavigation}
            onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); if (event.key === 'Escape') { (isPageNavigation ? setPageValue : setRowValue)(String(isPageNavigation ? safePage : firstItem)); event.currentTarget.blur(); } }}
          />
        </label>
        <span className="cvp-pagination__page-count"><span>of</span><span>{unitTotal}</span></span>
        <button className="cvp-pagination__button" type="button" aria-label={`Next ${navigationUnit}`} disabled={navigationDisabled || currentUnit === unitTotal} onClick={() => goToUnit(currentUnit + 1)}><ChevronRight aria-hidden="true" /></button>
        <button className="cvp-pagination__button" type="button" aria-label={`Last ${navigationUnit}`} disabled={navigationDisabled || currentUnit === unitTotal} onClick={() => goToUnit(unitTotal)}><ChevronsRight aria-hidden="true" /></button>
      </div>
    </nav>
  );
}
