import React from 'react';
import './Skeleton.css';

type SkeletonRadius = 'sm' | 'md' | 'lg' | 'pill';

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: string | number;
  height?: string | number;
  radius?: SkeletonRadius;
}

const cssSize = (value: string | number) => typeof value === 'number' ? `${value}px` : value;

/** A non-semantic visual placeholder for content that is actively loading. */
export function Skeleton({ width, height, radius = 'sm', className = '', style, ...props }: SkeletonProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={`cvp-skeleton cvp-skeleton--${radius} ${className}`.trim()}
      style={{
        ...style,
        ...(width !== undefined ? { width: cssSize(width) } : {}),
        ...(height !== undefined ? { height: cssSize(height) } : {}),
      }}
    />
  );
}

export interface SkeletonTableRowsProps {
  columns: number;
  rows?: number;
  loadingLabel?: string;
}

/** Loading rows for the shared Table component. */
export function SkeletonTableRows({ columns, rows = 5, loadingLabel = 'Loading table data' }: SkeletonTableRowsProps) {
  return <>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <tr key={rowIndex} className="cvp-skeleton-table__row">
        {Array.from({ length: columns }, (_, columnIndex) => (
          <td key={columnIndex} className="cvp-table__cell cvp-skeleton-table__cell">
            {rowIndex === 0 && columnIndex === 0 && <span className="cvp-skeleton__sr-only" role="status">{loadingLabel}</span>}
            <Skeleton className={columnIndex === 0 ? 'cvp-skeleton-table__primary' : ''} height="var(--cvp-skeleton-line-height)" />
          </td>
        ))}
      </tr>
    ))}
  </>;
}

export interface SkeletonRailCardsProps {
  count?: number;
  layout?: 'rail' | 'grid';
  compact?: boolean;
}

/** Loading cards for content rails, galleries, and browse results. */
export function SkeletonRailCards({ count = 6, layout = 'rail', compact = false }: SkeletonRailCardsProps) {
  return (
    <div className={`cvp-skeleton-rail-cards cvp-skeleton-rail-cards--${layout} ${compact ? 'cvp-skeleton-rail-cards--compact' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="cvp-skeleton-rail-cards__card" key={index}>
          <Skeleton className="cvp-skeleton-rail-cards__media" radius="md" />
          <div className="cvp-skeleton-rail-cards__copy">
            <Skeleton width="72%" height="var(--cvp-skeleton-line-height)" />
            <Skeleton width="48%" height="var(--cvp-skeleton-line-height)" />
          </div>
        </div>
      ))}
    </div>
  );
}
