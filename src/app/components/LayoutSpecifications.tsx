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
      <h3 className="layout-docs__subsection-title">{title}</h3>
      <table className="layout-docs__table">
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

export function LayoutSpecifications() {
  const panelDimensionsData = [
    { property: 'Border Radius', value: '2px', token: 'panel-border-radius' },
    { property: 'Default Shadow', value: 'var(--shadow-sm)', token: 'panel-shadow' },
    { property: 'Hover Shadow', value: 'var(--shadow-md)', token: 'panel-hover-shadow' },
    { property: 'Resize Indicator Default', value: 'transparent', token: 'panel-resize-indicator' },
    { property: 'Resize Indicator Hover', value: 'var(--focus-ring)', token: 'panel-resize-indicator-hover' },
    { property: 'Resize Indicator Active', value: 'var(--primary)', token: 'panel-resize-indicator-active' }
  ];

  const panelHeaderData = [
    { property: 'Header Height', value: '44px', token: 'panel-header-height' },
    { property: 'Header Padding', value: '0 15px', token: 'panel-header-padding' },
    { property: 'Left Header Padding', value: '15px', token: 'panel-left-header-padding' },
    { property: 'Header Border Bottom', value: '1px solid var(--border-default)', token: 'panel-header-border-bottom' },
    { property: 'Toggle Button Size', value: '28px × 28px', token: 'panel-toggle-btn-size' },
    { property: 'Toggle Button Border Radius', value: '4px', token: 'panel-toggle-btn-radius' }
  ];

  const panelSpacingData = [
    { property: 'Spacing Unit', value: '4px', token: 'panel-spacing-unit' },
    { property: 'Collapsible Padding', value: '8px', token: 'panel-collapsible-padding' },
    { property: 'Desktop Panel Gap', value: '8px', token: 'panel-desktop-gap' },
    { property: 'Mobile Panel Gap', value: '16px', token: 'panel-mobile-gap' }
  ];

  const panelTypographyData = [
    { property: 'Header Font Size', value: '13px', token: 'type-scale-s-size' },
    { property: 'Header Font Weight', value: '400', token: 'type-scale-s-weight' },
    { property: 'Header Line Height', value: '20px', token: 'type-scale-s-line-height' },
    { property: 'Header Letter Spacing', value: '0.1px', token: 'type-scale-s-letter-spacing' },
    { property: 'Header Text Transform', value: 'uppercase', token: 'panel-header-text-transform' }
  ];

  const panelLayoutData = [
    { property: 'Desktop Left Width', value: '30%', token: 'panel-desktop-left-width' },
    { property: 'Desktop Right Width', value: '70%', token: 'panel-desktop-right-width' },
    { property: 'Mobile Breakpoint', value: '768px', token: 'panel-mobile-breakpoint' },
    { property: 'Mobile Max Height', value: '500px', token: 'panel-mobile-max-height' },
    { property: 'Desktop Min Height', value: 'calc(100vh - 240px)', token: 'panel-desktop-min-height' }
  ];

  const panelStatesData = [
    { property: 'Collapsible Content Background', value: 'transparent', token: 'collapsible-content-bg' },
    { property: 'Panel Hover Background', value: 'var(--secondary)', token: 'panel-hover-bg' },
    { property: 'Toggle Button Hover Background', value: 'var(--secondary)', token: 'panel-toggle-hover-bg' },
    { property: 'Toggle Button Active Background', value: 'var(--muted)', token: 'panel-toggle-active-bg' }
  ];



  const panelResizeData = [
    { property: 'Resize Handle Width', value: '4px', token: 'panel-resize-handle-width' },
    { property: 'Resize Handle Cursor', value: 'col-resize', token: 'panel-resize-cursor' },
    { property: 'Left Panel Min Width', value: '20%', token: 'panel-left-min-width' },
    { property: 'Left Panel Max Width', value: '40%', token: 'panel-left-max-width' },
    { property: 'Resize Transition', value: 'border-color 0.2s ease', token: 'panel-resize-transition' }
  ];

  const panelNavigationData = [
    { property: 'Nav Container Margin Top', value: '-8px', token: 'panel-nav-margin-top' },
    { property: 'Nav Container Margin Horizontal', value: '-8px', token: 'panel-nav-margin-horizontal' },
    { property: 'Nav Container Width', value: 'calc(100% + 16px)', token: 'panel-nav-width' },
    { property: 'Nav Container Padding', value: '8px', token: 'panel-nav-padding' },
    { property: 'Nav Container Bottom Border', value: '1px solid var(--border-default)', token: 'panel-nav-border' },
    { property: 'Nav Container Bottom Margin', value: '7px', token: 'panel-nav-margin-bottom' }
  ];

  return (
    <>
      <SpecificationTable title="Panel Dimensions" data={panelDimensionsData} />
      <SpecificationTable title="Panel Headers" data={panelHeaderData} />
      <SpecificationTable title="Panel Spacing" data={panelSpacingData} />
      <SpecificationTable title="Panel Navigation" data={panelNavigationData} />
      <SpecificationTable title="Typography" data={panelTypographyData} />
      <SpecificationTable title="Layout Breakpoints" data={panelLayoutData} />
      <SpecificationTable title="States" data={panelStatesData} />
      <SpecificationTable title="Resize Handles" data={panelResizeData} />
    </>
  );
}