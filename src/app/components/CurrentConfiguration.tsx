import React from 'react';
import { Settings } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import type { SegmentQueryConfig } from './SegmentQueryConfiguration';

export interface CurrentConfigurationProps {
  /** Current query configuration */
  config: SegmentQueryConfig;
  /** Callback when configure button is clicked */
  onConfigure: () => void;
  /** Available fields for displaying labels */
  availableFields?: Array<{ value: string; label: string }>;
  /** Available operators for displaying labels */
  availableOperators?: Array<{ value: string; label: string }>;
}

const defaultFields = [
  { value: 'id', label: 'Id' },
  { value: 'pubdate', label: 'Pubdate' },
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'status', label: 'Status' },
  { value: 'category', label: 'Category' }
];

const defaultOperators = [
  { value: 'equals', label: 'equals' },
  { value: 'not_equals', label: 'not equals' },
  { value: 'contains', label: 'contains' },
  { value: 'not_contains', label: 'not contains' },
  { value: 'greater_than', label: 'greater than' },
  { value: 'less_than', label: 'less than' }
];

export function CurrentConfiguration({ 
  config, 
  onConfigure, 
  availableFields = defaultFields,
  availableOperators = defaultOperators 
}: CurrentConfigurationProps) {
  const getFieldLabel = (value: string) => {
    return availableFields.find(field => field.value === value)?.label || value;
  };

  const getOperatorLabel = (value: string) => {
    return availableOperators.find(op => op.value === value)?.label || value;
  };

  const activeFilters = config.filters.filter(filter => 
    filter.field && filter.operator && filter.value
  );

  return (
    <>
      <style>{`
        .current-configuration {
          /* Design System Tokens */
          --current-config-bg: var(--cvp-color-surface-subtle);
          --current-config-border-radius: 8px;
          --current-config-padding: var(--cvp-space-4);
          --current-config-font-family: var(--cvp-font-family-sans);
          
          /* Component Styles */
          background-color: var(--current-config-bg);
          border-radius: var(--current-config-border-radius);
          padding: var(--current-config-padding);
          font-family: var(--current-config-font-family);
        }

        .current-configuration__title {
          font-size: var(--cvp-font-size-sm);
          font-weight: var(--cvp-font-weight-medium);
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
          color: var(--cvp-color-text-primary);
          margin-bottom: var(--cvp-space-3);
          text-transform: uppercase;
        }

        .current-configuration__summary {
          display: flex;
          gap: var(--cvp-space-6);
          margin-bottom: var(--cvp-space-4);
        }

        .current-configuration__summary-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .current-configuration__summary-label {
          font-size: var(--cvp-font-size-sm);
          font-weight: var(--cvp-font-weight-regular);
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
          color: var(--cvp-color-text-muted);
        }

        .current-configuration__summary-value {
          font-size: var(--cvp-font-size-sm);
          font-weight: var(--cvp-font-weight-regular);
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
          color: var(--cvp-color-text-primary);
        }

        .current-configuration__sort-value {
          background: var(--current-config-summary-value-bg);
          border-radius: 4px;
          padding: 2px 8px;
          font-family: var(--cvp-font-family-mono);
        }

        .current-configuration__filters-count {
          background: var(--current-config-summary-value-bg);
          border-radius: 4px;
          padding: 2px 8px;
          font-family: var(--cvp-font-family-mono);
          font-size: var(--cvp-font-size-sm);
          font-weight: var(--cvp-font-weight-regular);
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
        }

        .current-configuration__active-filters {
          margin-bottom: var(--cvp-space-4);
        }

        .current-configuration__active-filters-title {
          font-size: var(--cvp-font-size-sm);
          font-weight: 500;
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
          color: var(--cvp-color-text-muted);
          margin-bottom: var(--cvp-space-2);
        }

        .current-configuration__filter-list {
          display: flex;
          flex-direction: column;
          gap: var(--cvp-space-1);
        }

        .current-configuration__filter-item {
          background: transparent;
          border: var(--cvp-border-control);
          border-radius: 4px;
          padding: 6px 12px;
          font-family: var(--cvp-font-family-sans);
          font-size: var(--cvp-font-size-sm);
          font-weight: var(--cvp-font-weight-regular);
          line-height: var(--cvp-line-height-snug);
          letter-spacing: var(--cvp-letter-spacing-normal);
          color: var(--cvp-color-text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .current-configuration__filter-field {
          font-weight: var(--cvp-font-weight-medium);
        }

        .current-configuration__filter-operator {
          font-style: italic;
          color: var(--cvp-color-text-muted);
        }

        .current-configuration__filter-value {
          font-family: var(--cvp-font-family-mono);
          color: var(--cvp-color-text-primary);
        }

        .current-configuration__logical-operator {
          background: transparent;
          color: var(--cvp-color-text-muted);
          font-size: var(--cvp-font-size-xs);
          font-weight: var(--cvp-font-weight-medium);
          padding: 2px 6px;
          border-radius: 2px;
          margin: 0 4px;
        }

        .current-configuration__configure-button {
          width: 100%;
        }

        .current-configuration__configure-button .primary-button {
          width: 100%;
          justify-content: center;
          gap: 6px;
        }
      `}</style>

      <div className="current-configuration">
        <h3 className="current-configuration__title">Current Configuration</h3>
        
        <div className="current-configuration__summary">
          <div className="current-configuration__summary-item">
            <span className="current-configuration__summary-label">Sort:</span>
            <span className="current-configuration__summary-value">
              <span className="current-configuration__sort-value">
                {getFieldLabel(config.sortBy.field)} ({config.sortBy.direction})
              </span>
            </span>
          </div>
          <div className="current-configuration__summary-item">
            <span className="current-configuration__summary-label">Filters:</span>
            <span className="current-configuration__summary-value">
              <span className="current-configuration__filters-count">
                {activeFilters.length} active
              </span>
            </span>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="current-configuration__active-filters">
            <div className="current-configuration__active-filters-title">
              ACTIVE FILTERS:
            </div>
            <div className="current-configuration__filter-list">
              {activeFilters.map((filter, index) => (
                <div key={filter.id}>
                  <div className="current-configuration__filter-item">
                    <span className="current-configuration__filter-field">
                      {getFieldLabel(filter.field)}
                    </span>
                    <span className="current-configuration__filter-operator">
                      {getOperatorLabel(filter.operator)}
                    </span>
                    <span className="current-configuration__filter-value">
                      "{filter.value}"
                    </span>
                  </div>
                  {index < activeFilters.length - 1 && (
                    <div style={{ alignSelf: 'flex-start' }}>
                      <span className="current-configuration__logical-operator">
                        {config.logicalOperators[index]?.type || 'AND'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="current-configuration__configure-button">
          <PrimaryButton onClick={onConfigure}>
            <Settings size={16} />
            Configure Segment Query
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
