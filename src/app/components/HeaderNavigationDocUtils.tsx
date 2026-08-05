import React from 'react';

export const createStatusBadge = (color: string, text: string) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    backgroundColor: `var(--color-${color}-800)`,
    color: `var(--color-${color}-200)`,
    borderRadius: '16px',
    fontSize: 'var(--type-scale-xs-regular-size)',
    fontWeight: 'var(--font-weight-medium)'
  }}>
    <div style={{
      width: '6px',
      height: '6px',
      backgroundColor: `var(--color-${color}-400)`,
      borderRadius: '50%'
    }} />
    {text}
  </div>
);

export const createActionIndicator = (label: string, clicked: boolean) => (
  <div style={{
    padding: '8px 12px',
    backgroundColor: clicked ? 'var(--color-green-800)' : 'var(--muted)',
    color: clicked ? 'var(--color-green-200)' : 'var(--muted-foreground)',
    borderRadius: '4px',
    fontSize: 'var(--type-scale-s-size)',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease'
  }}>
    {label} {clicked && '✓'}
  </div>
);

export const doAndDontItems = {
  do: [
    'Keep the header fixed at the top for consistent navigation',
    'Use clear, concise account names in the dropdown',
    'Provide appropriate callbacks for all interactive elements',
    'Account for the 45px height when positioning content below (fixed variant)',
    'Use variant="static" for documentation and demos',
    'Test responsive behavior on different screen sizes',
    'Ensure only one dropdown is open at a time'
  ],
  dont: [
    'Make the header too tall or add unnecessary visual weight',
    'Overcrowd with too many controls or information',
    'Use overly long account names that don\'t fit',
    'Provide too many account options that clutter the dropdown',
    'Allow multiple dropdowns to be open simultaneously'
  ]
};

export const designTokensData = [
  { property: 'Header height', value: '45px', token: '--header-height' },
  { property: 'Background color', value: '#19191a', token: '--header-bg' },
  { property: 'Border bottom', value: '1px solid #333', token: '--header-border-bottom' },
  { property: 'Horizontal padding', value: '16px', token: '--spacing-4' },
  { property: 'Item gap', value: '12px', token: '--spacing-3' },
  { property: 'Brand margin-right', value: '4px', token: '--spacing-1' },
  { property: 'Brand text font weight', value: '500', token: 'font-weight: 500' },
  { property: 'Logo font size', value: '13px', token: '--type-scale-s-size' },
  { property: 'Logo font weight', value: '400', token: '--type-scale-s-weight' },
  { property: 'Logo line height', value: '20px', token: '--type-scale-s-line-height' },
  { property: 'Logo letter spacing', value: '0.1px', token: '--type-scale-s-letter-spacing' },
  { property: 'Logo color', value: '#fff', token: '--header-logo-color' },
  { property: 'Navigation text color', value: '#bbb', token: '--header-nav-color' },
  { property: 'Navigation hover color', value: '#fff', token: '--header-nav-hover-color' },
  { property: 'User text color', value: '#fff', token: '--header-user-color' },
  { property: 'Dropdown background', value: '#292a2e', token: 'dropdown-menu-bg' },
  { property: 'Dropdown border radius', value: '6px', token: '--radius-md' },
  { property: 'Separator color', value: '#333', token: 'separator-bg' },
  { property: 'Separator width', value: '1px', token: 'separator-width' },
  { property: 'Separator height', value: '16px', token: 'separator-height' },
  { property: 'Z-index (fixed)', value: '1000', token: '--header-z-index' },
  { property: 'Z-index (static)', value: '1', token: '--header-z-index' },
  { property: 'Position (fixed)', value: 'fixed', token: '--header-position' },
  { property: 'Position (static)', value: 'relative', token: '--header-position' },
  { property: 'User avatar size', value: '20px', token: 'avatar-size' },
  { property: 'User avatar background', value: '#3d63dd', token: 'avatar-bg' },
  { property: 'User avatar text color', value: '#fff', token: 'avatar-color' },
  { property: 'User avatar border radius', value: '50%', token: 'avatar-radius' },
  { property: 'User avatar font size', value: '9px', token: 'avatar-font-size' },
  { property: 'User avatar font weight', value: '500', token: 'avatar-font-weight' },
  { property: 'User avatar letter spacing', value: '0.5px', token: 'avatar-letter-spacing' },
  { property: 'User button padding', value: '2px', token: 'user-button-padding' },
  { property: 'User button hover bg', value: 'rgba(255, 255, 255, 0.1)', token: '--header-button-hover-bg' },
  { property: 'User button focus ring', value: '0 0 0 2px #67b3fb', token: 'focus-ring' }
];