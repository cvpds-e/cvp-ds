import React, { useState } from 'react';
import { Select, SelectOption } from './Select';
import { X, GripVertical, Plus } from 'lucide-react';

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FilterGroupProps {
  /** Initial conditions */
  conditions?: FilterCondition[];
  /** Available field options */
  fieldOptions?: SelectOption[];
  /** Callback when conditions change */
  onChange?: (conditions: FilterCondition[]) => void;
  /** Logical operator between conditions (AND/OR) */
  logicalOperator?: 'AND' | 'OR';
  /** Callback when logical operator changes */
  onLogicalOperatorChange?: (operator: 'AND' | 'OR') => void;
  /** Show add group button */
  showAddGroup?: boolean;
  /** Callback when add group is clicked */
  onAddGroup?: () => void;
  /** Additional CSS class name */
  className?: string;
}

export function FilterGroup({
  conditions: initialConditions = [],
  fieldOptions = [
    { value: 'genre', label: 'Genre' },
    { value: 'release_year', label: 'Release Year' },
    { value: 'rating', label: 'Rating' },
    { value: 'director', label: 'Director' },
  ],
  onChange,
  logicalOperator = 'AND',
  onLogicalOperatorChange,
  showAddGroup = true,
  onAddGroup,
  className = '',
}: FilterGroupProps) {
  const [conditions, setConditions] = useState<FilterCondition[]>(
    initialConditions.length > 0
      ? initialConditions
      : [{ id: '1', field: 'genre', operator: 'contains', value: '' }]
  );

  const operatorOptions: SelectOption[] = [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'greater_or_equal', label: 'Greater or Equal' },
    { value: 'less_or_equal', label: 'Less or Equal' },
  ];

  const logicalOperatorOptions: SelectOption[] = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
  ];

  const handleAddCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: 'genre',
      operator: 'contains',
      value: '',
    };
    const newConditions = [...conditions, newCondition];
    setConditions(newConditions);
    onChange?.(newConditions);
  };

  const handleRemoveCondition = (id: string) => {
    if (conditions.length === 1) return; // Keep at least one condition
    const newConditions = conditions.filter((c) => c.id !== id);
    setConditions(newConditions);
    onChange?.(newConditions);
  };

  const handleUpdateCondition = (id: string, updates: Partial<FilterCondition>) => {
    const newConditions = conditions.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    setConditions(newConditions);
    onChange?.(newConditions);
  };

  return (
    <>
      <style>{`
        .filter-group {
          /* Design System Tokens */
          --filter-group-bg: #1a1a1f;
          --filter-group-border: 1px solid var(--border-default);
          --filter-group-border-radius: 8px;
          --filter-group-padding: 16px;
          --filter-group-gap: 12px;

          /* Component Styles */
          background-color: var(--filter-group-bg);
          border: var(--filter-group-border);
          border-radius: var(--filter-group-border-radius);
          padding: var(--filter-group-padding);
          display: flex;
          flex-direction: column;
          gap: var(--filter-group-gap);
          box-sizing: border-box;
        }

        /* Light theme overrides */
        [data-theme="light"] .filter-group {
          --filter-group-bg: #f8f9fa;
          --filter-group-border: 1px solid var(--border-default);
        }

        .filter-group__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .filter-group__title {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: #b4b4ba;
          margin: 0;
        }

        [data-theme="light"] .filter-group__title {
          color: #6b7280;
        }

        .filter-group__operator-select {
          width: 100px;
        }

        .filter-group__operator-button {
          /* Design System Tokens - matching Segment Query Configuration */
          --logical-op-bg: transparent;
          --logical-op-hover-bg: var(--outline-btn-hover-bg, rgba(255, 255, 255, 0.05));
          --logical-op-active-bg: var(--outline-btn-active-bg, rgba(255, 255, 255, 0.1));
          --logical-op-text: var(--muted-foreground);
          --logical-op-hover-text: var(--foreground);
          --logical-op-active-text: var(--foreground);
          --logical-op-border: 1px solid var(--border-default);
          --logical-op-border-radius: var(--radius-sm, 4px);
          --logical-op-padding: 4px 10px;
          --logical-op-font-size: var(--type-scale-s-size, 13px);
          --logical-op-font-weight: var(--type-scale-s-medium-weight, 500);

          background: var(--logical-op-bg);
          border: var(--logical-op-border);
          border-radius: var(--logical-op-border-radius);
          color: var(--logical-op-text);
          padding: var(--logical-op-padding);
          cursor: pointer;
          transition: var(--btn-transition, all 0.2s cubic-bezier(0.4, 0, 0.2, 1));
          font-size: var(--logical-op-font-size);
          font-weight: var(--logical-op-font-weight);
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 28px;
          box-sizing: border-box;
        }

        .filter-group__operator-button:hover {
          background: var(--logical-op-hover-bg);
          color: var(--logical-op-hover-text);
        }

        .filter-group__operator-button:active {
          background: var(--logical-op-active-bg);
          color: var(--logical-op-active-text);
        }

        .filter-group__operator-button:focus-visible {
          outline: 2px solid var(--focus-ring, var(--border-focus));
          outline-offset: 2px;
        }

        .filter-group__conditions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .filter-condition {
          /* Design System Tokens */
          --filter-condition-bg: #14141a;
          --filter-condition-border: 1px solid var(--border-default);
          --filter-condition-border-radius: 6px;
          --filter-condition-padding: 12px;
          --filter-condition-gap: 8px;

          background-color: var(--filter-condition-bg);
          border: var(--filter-condition-border);
          border-radius: var(--filter-condition-border-radius);
          padding: var(--filter-condition-padding);
          display: flex;
          flex-direction: column;
          gap: var(--filter-condition-gap);
          position: relative;
          box-sizing: border-box;
        }

        [data-theme="light"] .filter-condition {
          --filter-condition-bg: #ffffff;
          --filter-condition-border: 1px solid var(--border-default);
        }

        .filter-condition__header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .filter-condition__drag-handle {
          color: #6b6b78;
          cursor: grab;
          flex-shrink: 0;
        }

        [data-theme="light"] .filter-condition__drag-handle {
          color: #9ca3af;
        }

        .filter-condition__drag-handle:active {
          cursor: grabbing;
        }

        .filter-condition__label {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.15px;
          color: #9b9ba5;
          flex: 1;
        }

        [data-theme="light"] .filter-condition__label {
          color: #6b7280;
        }

        .filter-condition__remove {
          background: none;
          border: none;
          color: #6b6b78;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        [data-theme="light"] .filter-condition__remove {
          color: #6b7280;
        }

        .filter-condition__remove:hover {
          background-color: rgba(111, 139, 230, 0.08);
          color: var(--border-focus);
        }

        .filter-condition__remove:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }

        .filter-condition__fields {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-condition__input {
          /* Design System Tokens - Typescale M Regular */
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0.15px;

          /* Input Styles */
          background-color: #212123;
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 8px 12px;
          color: #ffffff;
          width: 100%;
          box-sizing: border-box;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-theme="light"] .filter-condition__input {
          background-color: #ffffff;
          border: 1px solid var(--border-strong);
          color: #111827;
        }

        .filter-condition__input::placeholder {
          color: #6b6b78;
        }

        [data-theme="light"] .filter-condition__input::placeholder {
          color: #9ca3af;
        }

        .filter-condition__input:hover {
          border-color: var(--border-focus);
        }

        .filter-condition__input:focus {
          outline: none;
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
          padding: 7px 11px; /* Adjust for 2px border */
        }

        [data-theme="light"] .filter-condition__input:focus {
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
        }

        .filter-condition__input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          color: #A1A1A8;
        }

        [data-theme="light"] .filter-condition__input:disabled {
          color: #9ca3af;
        }

        .filter-group__actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 4px;
        }

        .filter-group__action-button {
          /* Design System Tokens */
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 20px;

          background: none;
          border: 1px dashed var(--border-strong);
          border-radius: 4px;
          color: #b4b4ba;
          padding: 10px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          box-sizing: border-box;
        }

        [data-theme="light"] .filter-group__action-button {
          border-color: var(--border-strong);
          color: #374151;
        }

        .filter-group__action-button:hover {
          border-color: var(--border-focus);
          border-style: solid;
          color: var(--border-focus);
          background-color: rgba(111, 139, 230, 0.04);
        }

        .filter-group__action-button:focus-visible {
          outline: none;
          border: 2px solid var(--border-focus);
          box-shadow: 0 0 0 3px rgba(111, 139, 230, 0.25);
          padding: 9px 15px; /* Adjust for 2px border */
        }

        .filter-group__action-button-icon {
          width: 16px;
          height: 16px;
        }
      `}</style>

      <div className={`filter-group ${className}`}>
        <div className="filter-group__header">
          <h3 className="filter-group__title">Filter Group</h3>
          <button
            className="filter-group__operator-button"
            onClick={() => onLogicalOperatorChange?.(logicalOperator === 'AND' ? 'OR' : 'AND')}
            type="button"
            aria-label={`Toggle logical operator. Currently: ${logicalOperator}`}
          >
            {logicalOperator}
          </button>
        </div>

        <div className="filter-group__conditions">
          {conditions.map((condition, index) => (
            <div key={condition.id} className="filter-condition">
              <div className="filter-condition__header">
                <GripVertical size={16} className="filter-condition__drag-handle" />
                <span className="filter-condition__label">Condition</span>
                <button
                  className="filter-condition__remove"
                  onClick={() => handleRemoveCondition(condition.id)}
                  disabled={conditions.length === 1}
                  aria-label="Remove condition"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="filter-condition__fields">
                <Select
                  options={fieldOptions}
                  value={condition.field}
                  onChange={(value) => handleUpdateCondition(condition.id, { field: value })}
                />

                <Select
                  options={operatorOptions}
                  value={condition.operator}
                  onChange={(value) => handleUpdateCondition(condition.id, { operator: value })}
                />

                <input
                  type="text"
                  className="filter-condition__input"
                  value={condition.value}
                  onChange={(e) => handleUpdateCondition(condition.id, { value: e.target.value })}
                  placeholder="Enter value..."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="filter-group__actions">
          <button
            className="filter-group__action-button"
            onClick={handleAddCondition}
            type="button"
          >
            <Plus size={16} className="filter-group__action-button-icon" />
            Add Condition
          </button>

          {showAddGroup && (
            <button
              className="filter-group__action-button"
              onClick={onAddGroup}
              type="button"
            >
              <Plus size={16} className="filter-group__action-button-icon" />
              Add Group
            </button>
          )}
        </div>
      </div>
    </>
  );
}