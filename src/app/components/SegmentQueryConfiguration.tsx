import React, { useState } from 'react';
import { Plus, X, ArrowUpDown, SquareArrowOutUpRight } from 'lucide-react';
import { Modal } from './Modal';
import { Select } from './Select';
import { TextInput } from './TextInput';
import { PrimaryButton } from './PrimaryButton';
import { OutlineButton } from './OutlineButton';

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface LogicalOperator {
  id: string;
  type: 'AND' | 'OR';
}

export interface SegmentQueryConfig {
  sortBy: {
    field: string;
    direction: 'ASC' | 'DESC';
  };
  filters: FilterCondition[];
  logicalOperators: LogicalOperator[];
}

export interface SegmentQueryConfigurationProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should be closed */
  onClose: () => void;
  /** Initial configuration */
  initialConfig?: SegmentQueryConfig;
  /** Available fields for sorting and filtering */
  availableFields?: Array<{ value: string; label: string }>;
  /** Available operators */
  availableOperators?: Array<{ value: string; label: string }>;
  /** Callback when configuration is applied */
  onApply?: (config: SegmentQueryConfig) => void;
  /** Callback when configuration is cancelled */
  onCancel?: () => void;
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

export function SegmentQueryConfiguration({
  isOpen,
  onClose,
  initialConfig,
  availableFields = defaultFields,
  availableOperators = defaultOperators,
  onApply,
  onCancel
}: SegmentQueryConfigurationProps) {
  const [config, setConfig] = useState<SegmentQueryConfig>(
    initialConfig || {
      sortBy: { field: 'pubdate', direction: 'DESC' },
      filters: [],
      logicalOperators: []
    }
  );

  const handleSortFieldChange = (field: string) => {
    setConfig(prev => ({
      ...prev,
      sortBy: { ...prev.sortBy, field }
    }));
  };

  const handleSortDirectionToggle = () => {
    setConfig(prev => ({
      ...prev,
      sortBy: {
        ...prev.sortBy,
        direction: prev.sortBy.direction === 'ASC' ? 'DESC' : 'ASC'
      }
    }));
  };

  const addFilter = () => {
    const newFilterId = (config.filters.length + 1).toString();
    const newFilter: FilterCondition = {
      id: newFilterId,
      field: '',
      operator: 'equals',
      value: ''
    };

    // Add logical operator if there are existing filters
    const newLogicalOperators = [...config.logicalOperators];
    if (config.filters.length > 0) {
      newLogicalOperators.push({
        id: `op-${newFilterId}`,
        type: 'AND'
      });
    }

    setConfig(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter],
      logicalOperators: newLogicalOperators
    }));
  };

  const handleRemoveFilter = (filterId: string) => {
    const filterIndex = config.filters.findIndex(f => f.id === filterId);
    const newFilters = config.filters.filter(f => f.id !== filterId);
    const newLogicalOperators = [...config.logicalOperators];

    // Remove the corresponding logical operator
    if (filterIndex > 0) {
      // Remove the operator before this filter
      newLogicalOperators.splice(filterIndex - 1, 1);
    } else if (filterIndex === 0 && newLogicalOperators.length > 0) {
      // If removing the first filter and there are operators, remove the first operator
      newLogicalOperators.splice(0, 1);
    }

    setConfig(prev => ({
      ...prev,
      filters: newFilters,
      logicalOperators: newLogicalOperators
    }));
  };

  const handleFilterChange = (filterId: string, key: 'field' | 'operator' | 'value', value: string) => {
    setConfig(prev => ({
      ...prev,
      filters: prev.filters.map(f =>
        f.id === filterId ? { ...f, [key]: value } : f
      )
    }));
  };

  const handleToggleLogicalOperator = (index: number) => {
    setConfig(prev => ({
      ...prev,
      logicalOperators: prev.logicalOperators.map(op =>
        op.id === `op-${config.filters[index + 1].id}` ? { ...op, type: op.type === 'AND' ? 'OR' : 'AND' } : op
      )
    }));
  };

  const handleApply = () => {
    onApply?.(config);
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <>
      <style>{`
        .segment-query-config {
          /* Design System Tokens */
          --segment-query-config-spacing: var(--spacing-6);
          --segment-query-config-section-spacing: var(--spacing-8);
          --segment-query-config-filter-spacing: var(--spacing-4);
          --segment-query-config-filter-gap: var(--spacing-3);
          --segment-query-config-font-family: var(--font-family);
          
          /* Filter Row Tokens */
          --filter-row-bg: transparent;
          --filter-row-border: 1px solid var(--border-default);
          --filter-row-hover-border: 1px solid var(--border-focus);
          --filter-row-border-radius: var(--radius-md);
          --filter-row-padding: var(--spacing-4);
          --filter-row-gap: var(--spacing-3);
          
          /* Logical Operator Tokens */
          --logical-op-bg: transparent;
          --logical-op-hover-bg: var(--outline-btn-hover-bg);
          --logical-op-active-bg: var(--outline-btn-active-bg);
          --logical-op-text: var(--muted-foreground);
          --logical-op-hover-text: var(--foreground);
          --logical-op-active-text: var(--foreground);
          --logical-op-border: 1px solid var(--border-default);
          --logical-op-border-radius: var(--radius-sm);
          --logical-op-padding: 4px 10px;
          --logical-op-font-size: var(--type-scale-s-size);
          --logical-op-font-weight: var(--type-scale-s-medium-weight);
          
          /* Sort Direction Button Tokens */
          --sort-direction-bg: var(--outline-btn-bg);
          --sort-direction-hover-bg: var(--outline-btn-hover-bg);
          --sort-direction-text: var(--foreground);
          --sort-direction-border: 1px solid var(--border-default);
          --sort-direction-border-radius: var(--radius-md);
          --sort-direction-padding: 4px 10px;
          --sort-direction-transition: var(--btn-transition);
          
          /* Component Styles */
          font-family: var(--segment-query-config-font-family);
          padding: var(--segment-query-config-spacing);
        }

        /* Empty State Tokens */
        .segment-query-config__empty-state {
          border: 2px dashed var(--border-default);
          border-radius: var(--radius-md);
          padding: var(--spacing-12) var(--spacing-6);
          text-align: center;
          color: var(--muted-foreground);
          font-size: var(--type-scale-m-size);
          font-weight: var(--type-scale-m-weight);
          line-height: var(--type-scale-m-line-height);
          letter-spacing: var(--type-scale-m-letter-spacing);
          background: transparent;
        }

        .segment-query-config__empty-state-link {
          color: var(--cvp-color-text-link-default) !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 4px !important;
          transition: color 0.2s ease !important;
          font-weight: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
          vertical-align: baseline !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
          will-change: color !important;
        }

        .segment-query-config__empty-state-link:hover {
          color: var(--cvp-color-text-link-hover) !important;
          text-decoration: none !important;
          font-weight: inherit !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }

        .segment-query-config__empty-state-link:focus,
        .segment-query-config__empty-state-link:active {
          color: var(--cvp-color-text-link-hover) !important;
          text-decoration: none !important;
          font-weight: inherit !important;
          text-decoration-line: none !important;
          text-underline-offset: unset !important;
          text-decoration-thickness: 0 !important;
          outline: none !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: none !important;
        }

        .segment-query-config__empty-state-link:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: 2px;
          border-radius: 2px;
        }

        .segment-query-config__section {
          margin-bottom: var(--segment-query-config-section-spacing);
        }

        .segment-query-config__section:last-child {
          margin-bottom: 0;
        }

        .segment-query-config__section-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          color: var(--foreground);
          margin-bottom: var(--spacing-4);
        }

        .segment-query-config__filters-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--type-scale-l-weight);
          line-height: var(--type-scale-l-line-height);
          color: var(--foreground);
          margin-bottom: 0;
        }

        .segment-query-config__sort-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-3);
        }

        .segment-query-config__sort-field {
          flex: 1;
          max-width: 200px;
        }

        .segment-query-config__sort-direction {
          background: var(--sort-direction-bg);
          border: var(--sort-direction-border);
          border-radius: var(--sort-direction-border-radius);
          color: var(--sort-direction-text);
          padding: var(--sort-direction-padding);
          cursor: pointer;
          transition: var(--sort-direction-transition);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-medium-weight);
          justify-content: flex-start;
        }

        .segment-query-config__sort-direction:hover {
          background: var(--sort-direction-hover-bg);
        }

        .segment-query-config__sort-direction:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: 2px;
        }

        .segment-query-config__filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-4);
        }

        .segment-query-config__add-filter {
          background: var(--outline-btn-bg);
          border: 1px solid var(--outline-btn-border);
          border-radius: var(--btn-border-radius);
          color: var(--outline-btn-text);
          padding: var(--btn-padding);
          cursor: pointer;
          transition: var(--btn-transition);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: var(--btn-font-size);
          font-weight: var(--btn-font-weight);
        }

        .segment-query-config__add-filter:hover {
          background: var(--outline-btn-hover-bg);
          border-color: var(--outline-btn-hover-border);
        }

        .segment-query-config__add-filter:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: 2px;
        }

        .segment-query-config__filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .segment-query-config__filter-row {
          background: var(--filter-row-bg);
          border: var(--filter-row-border);
          border-radius: var(--filter-row-border-radius);
          padding: var(--filter-row-padding);
          display: flex;
          align-items: center;
          gap: var(--filter-row-gap);
          transition: border-color 0.2s ease;
        }

        .segment-query-config__filter-row:hover {
          border: var(--filter-row-hover-border);
        }

        .segment-query-config__filter-field {
          flex: 1;
          min-width: 120px;
        }

        .segment-query-config__filter-operator {
          flex: 1;
          min-width: 120px;
        }

        .segment-query-config__filter-value {
          flex: 2;
          min-width: 150px;
        }

        .segment-query-config__remove-filter {
          background: transparent;
          border: none;
          color: var(--cvp-color-text-danger);
          cursor: pointer;
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: var(--btn-transition);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .segment-query-config__remove-filter:hover {
          background: var(--cvp-color-state-error-bg);
        }

        .segment-query-config__remove-filter:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: 2px;
        }

        .segment-query-config__logical-operator {
          background: var(--logical-op-bg);
          border: var(--logical-op-border);
          border-radius: var(--logical-op-border-radius);
          color: var(--logical-op-text);
          padding: var(--logical-op-padding);
          cursor: pointer;
          transition: var(--btn-transition);
          font-size: var(--logical-op-font-size);
          font-weight: var(--logical-op-font-weight);
          align-self: flex-start;
          margin: var(--spacing-1) 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .segment-query-config__logical-operator:hover {
          background: var(--logical-op-hover-bg);
          color: var(--logical-op-hover-text);
        }

        .segment-query-config__logical-operator:active {
          background: var(--logical-op-active-bg);
          color: var(--logical-op-active-text);
        }

        .segment-query-config__logical-operator:focus-visible {
          outline: 2px solid var(--focus-ring);
          outline-offset: 2px;
        }

        /* Footer Actions - using Modal footer styling */
        .segment-query-config__footer-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .segment-query-config__footer-actions .primary-button,
        .segment-query-config__footer-actions .outline-button {
          min-width: 100px;
        }
      `}</style>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Segment Query Configuration"
        maxWidth="800px"
        footer={
          <div className="segment-query-config__footer-actions">
            <OutlineButton onClick={handleCancel}>
              Cancel
            </OutlineButton>
            <PrimaryButton onClick={handleApply}>
              Apply Query
            </PrimaryButton>
          </div>
        }
      >
        <div className="segment-query-config">
          {/* Sort By Section */}
          <div className="segment-query-config__section">
            <h3 className="segment-query-config__section-title">Sort By</h3>
            <div className="segment-query-config__sort-row">
              <div className="segment-query-config__sort-field">
                <Select
                  value={config.sortBy.field}
                  onChange={handleSortFieldChange}
                  options={availableFields}
                  placeholder="Select field"
                />
              </div>
              <button
                className="segment-query-config__sort-direction"
                onClick={handleSortDirectionToggle}
                type="button"
              >
                <ArrowUpDown size={14} />
                {config.sortBy.direction}
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="segment-query-config__section">
            <div className="segment-query-config__filters-header">
              <h3 className="segment-query-config__filters-title">Filters</h3>
              <button
                className="segment-query-config__add-filter"
                onClick={addFilter}
                type="button"
              >
                <Plus size={14} />
                Add Filter
              </button>
            </div>

            {config.filters.length === 0 ? (
              <div className="segment-query-config__empty-state">
                <div>No filters added yet. Click "Add Filter" to create your first filter.</div>
                <div style={{ marginTop: '8px' }}>
                  Visit our{' '}
                  <a 
                    href="#" 
                    className="segment-query-config__empty-state-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Technical Resource Center
                    <SquareArrowOutUpRight size={14} />
                  </a>
                  {' '}for more information about the available filters.
                </div>
              </div>
            ) : (
              <div className="segment-query-config__filter-group">
                {config.filters.map((filter, index) => (
                  <div key={filter.id}>
                    <div className="segment-query-config__filter-row">
                      <div className="segment-query-config__filter-field">
                        <Select
                          value={filter.field}
                          onChange={(value) => handleFilterChange(filter.id, 'field', value)}
                          options={availableFields}
                          placeholder="Select field"
                        />
                      </div>
                      <div className="segment-query-config__filter-operator">
                        <Select
                          value={filter.operator}
                          onChange={(value) => handleFilterChange(filter.id, 'operator', value)}
                          options={availableOperators}
                          placeholder="Operator"
                        />
                      </div>
                      <div className="segment-query-config__filter-value">
                        <TextInput
                          value={filter.value}
                          onChange={(value) => handleFilterChange(filter.id, 'value', value)}
                          placeholder="Value"
                        />
                      </div>
                      <button
                        className="segment-query-config__remove-filter"
                        onClick={() => handleRemoveFilter(filter.id)}
                        aria-label="Remove filter"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {index < config.filters.length - 1 && (
                      <button
                        className="segment-query-config__logical-operator"
                        onClick={() => handleToggleLogicalOperator(index)}
                        aria-label={`Toggle logical operator. Current: ${config.logicalOperators[index]?.type || 'AND'}`}
                      >
                        {config.logicalOperators[index]?.type || 'AND'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </Modal>
    </>
  );
}
