import React from 'react';

interface SpecificationTableProps {
  title: string;
  data: Array<{
    property: string;
    value: string;
    token: string;
  }>;
}

function SpecificationTable({ title, data }: SpecificationTableProps) {
  return (
    <>
      <h3 className="table-docs__subsection-title">{title}</h3>
      <table className="table-docs__table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.property}</td>
              <td>{item.value}</td>
              <td>{item.token}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function TableSpecifications() {
  const dimensionsData = [
    { property: 'Container Height', value: '500px (default)', token: 'table-fixed-height' },
    { property: 'Settings Row Height', value: '52px', token: 'table-settings-height' },
    { property: 'Header Row Height', value: '36px', token: 'table-header-height' },
    { property: 'Table Row Height', value: '40px minimum', token: 'table-row-min-height' },
    { property: 'Pagination Footer Height', value: '56px', token: 'table-pagination-height' }
  ];

  const typographyData = [
    { property: 'Header Typography', value: 'S Medium - 13px/20px/+0.1px/500', token: 'type-scale-s-medium' },
    { property: 'Cell Typography', value: 'M Regular - 14px/20px/+0.15px/400', token: 'type-scale-m-regular' },
    { property: 'Settings Row Typography', value: 'S Regular - 13px/20px/+0.1px/400', token: 'type-scale-s-regular' },
    { property: 'Font Family', value: 'Inter, system-ui fallbacks', token: 'font-family' }
  ];

  const spacingData = [
    { property: 'Header Padding', value: '24px', token: 'table-header-padding' },
    { property: 'Cell Padding', value: '12px 16px', token: 'table-cell-padding' },
    { property: 'Settings Row Padding', value: '8px 12px', token: 'table-settings-padding' },
    { property: 'Pagination Padding', value: '16px 24px', token: 'table-pagination-padding' },
    { property: 'Expandable Content Padding', value: '16px 24px', token: 'table-expanded-padding' },
    { property: 'Table Control Gap', value: '2px', token: '--cvp-table-control-gap → --cvp-space-100' }
  ];

  const bordersData = [
    { property: 'Table Border', value: '1px solid rgba(212, 228, 254, 0.1)', token: 'table-border' },
    { property: 'Border Radius', value: '8px', token: 'table-border-radius' },
    { property: 'Row Border Bottom', value: '1px solid rgba(212, 228, 254, 0.1)', token: 'table-row-border' },
    { property: 'Header Border Bottom', value: '1px solid rgba(212, 228, 254, 0.1)', token: 'table-header-border' }
  ];

  const statesData = [
    { property: 'Row Hover Background', value: '#f3f4f6', token: 'table-row-hover' },
    { property: 'Row Selected Background', value: 'Neutral active surface', token: '--cvp-table-row-bg-selected → --cvp-color-surface-active' },
    { property: 'Header Hover Background', value: '#e5e7eb', token: 'table-header-hover' },
    { property: 'Button Hover Background', value: '#f3f4f6', token: 'table-icon-btn-hover' }
  ];

  const collectionTagData = [
    { property: 'Font Family', value: 'Inconsolata (monospace)', token: 'collection-tag-font-family' },
    { property: 'Typography', value: 'S Regular - 13px/20px/+0.1px/400', token: 'type-scale-s-regular' },
    { property: 'Text Color', value: '#16a34a', token: 'collection-tag-text-color' },
    { property: 'Background', value: '#dcfce7', token: 'collection-tag-bg-color' },
    { property: 'Border', value: '1px solid #86efac', token: 'collection-tag-border' },
    { property: 'Border Radius', value: '4px', token: 'collection-tag-border-radius' },
    { property: 'Padding', value: '0 4px', token: '--cvp-space-1' }
  ];

  const colorsData = [
    { property: 'Background', value: '#ffffff', token: 'table-bg' },
    { property: 'Header Background', value: '#f8f9fa', token: 'table-header-bg' },
    { property: 'Text Color', value: '#111827', token: 'table-text' },
    { property: 'Muted Text Color', value: '#6b7280', token: 'table-muted-text' },
    { property: 'Primary Button', value: '#3d63dd', token: 'table-primary-btn' },
    { property: 'Primary Button Hover', value: '#244cce', token: 'table-primary-btn-hover' },
    { property: 'Delete Icon', value: '#e6494e', token: 'table-delete-icon' },
    { property: 'Delete Icon Hover', value: '#e6494e', token: 'table-delete-icon-hover' }
  ];

  const resizeHandlesData = [
    { property: 'Width', value: '1px', token: 'resize-handle-width' },
    { property: 'Height', value: '60% (centered)', token: 'resize-handle-height' },
    { property: 'Default Color', value: '#6b7280', token: 'resize-handle-color' },
    { property: 'Hover Color', value: '#111827', token: 'resize-handle-hover-color' },
    { property: 'Position', value: 'Top 20%, Bottom 20%', token: 'resize-handle-position' },
    { property: 'Cursor', value: 'col-resize', token: 'resize-handle-cursor' }
  ];

  const iconsData = [
    { property: 'Sort Icon Size', value: '14px', token: 'table-sort-icon-size' },
    { property: 'Action Icon Size', value: '16px', token: 'table-action-icon-size' },
    { property: 'Expand Icon Size', value: '16px', token: 'table-expand-icon-size' },
    { property: 'Checkbox Size', value: '16px × 16px', token: 'table-checkbox-size' },
    { property: 'Icon Button Size', value: '28px × 28px', token: 'table-icon-btn-size' }
  ];

  const paginationData = [
    { property: 'Button Height', value: '32px', token: 'pagination-btn-height' },
    { property: 'Button Min Width', value: '32px', token: 'pagination-btn-min-width' },
    { property: 'Button Border Radius', value: '4px', token: 'pagination-btn-radius' },
    { property: 'Gap Between Items', value: '4px', token: 'pagination-gap' },
    { property: 'Typography', value: 'S Regular - 13px/20px/+0.1px/400', token: 'type-scale-s-regular' }
  ];

  const emptyStateData = [
    { property: 'Container Padding', value: '48px 24px', token: 'rail-gallery-empty-state-padding' },
    { property: 'Background', value: 'transparent', token: 'rail-gallery-empty-state-bg' },
    { property: 'Border', value: '1px dashed rgba(255, 255, 255, 0.1)', token: 'rail-gallery-empty-state-border' },
    { property: 'Border Radius', value: '6px', token: 'rail-gallery-empty-state-border-radius' },
    { property: 'Minimum Height', value: '200px', token: 'rail-gallery-empty-state-min-height' },
    { property: 'Gap (icon to text)', value: '16px', token: 'rail-gallery-empty-state-gap' },
    { property: 'Icon Size', value: '48px', token: 'rail-gallery-empty-state-icon-size' },
    { property: 'Icon Color', value: '#6b6b78', token: 'rail-gallery-empty-state-icon-color' },
    { property: 'Icon Opacity', value: '0.6 (60%)', token: 'rail-gallery-empty-state-icon-opacity' },
    { property: 'Text Color', value: '#9b9ba5', token: 'rail-gallery-empty-state-text-color' },
    { property: 'Text Typography', value: 'M Regular - 14px/20px/+0.15px/400', token: 'type-scale-m-regular' },
    { property: 'Text Alignment', value: 'center', token: 'rail-gallery-empty-state-text-align' },
    { property: 'Layout', value: 'Flexbox column, centered', token: 'rail-gallery-empty-state-layout' }
  ];

  return (
    <>
      <SpecificationTable title="Table Dimensions" data={dimensionsData} />
      <SpecificationTable title="Typography" data={typographyData} />
      <SpecificationTable title="Spacing" data={spacingData} />
      <SpecificationTable title="Borders" data={bordersData} />
      <SpecificationTable title="States" data={statesData} />
      <SpecificationTable title="Collection Tag" data={collectionTagData} />
      <SpecificationTable title="Colors" data={colorsData} />
      <SpecificationTable title="Icons" data={iconsData} />
      <SpecificationTable title="Resize Handles" data={resizeHandlesData} />
      <SpecificationTable title="Pagination" data={paginationData} />
      <SpecificationTable title="Rail Content Gallery - Empty State" data={emptyStateData} />
    </>
  );
}
