export interface CatalogEntry {
  id: string;
  label: string;
  category: string;
  description: string;
  keywords?: string;
  availability?: 'deferred' | 'deprecated';
  assetIds?: string[];
}

export const PRIMITIVE_PAGES: CatalogEntry[] = [
  { id: 'text', label: 'Text', category: 'Content', description: 'Inline text with semantic tones and optional truncation.' },
  { id: 'heading', label: 'Heading', category: 'Content', description: 'Semantic heading levels independent of visual size.' },
  { id: 'paragraph', label: 'Paragraph', category: 'Content', description: 'Native paragraphs with shared body typography.' },
  { id: 'caption', label: 'Caption', category: 'Content', description: 'Supporting text using the semantic caption style.' },
  { id: 'link', label: 'Link', category: 'Content', description: 'Native navigation links with visible focus treatment.' },
  { id: 'icon', label: 'Icon', category: 'Content', description: 'Consistently sized Lucide icons with explicit accessible meaning.' },
  { id: 'image', label: 'Image', category: 'Content', description: 'Responsive native images with required alternative text.' },
  { id: 'avatar', label: 'Avatar', category: 'Content', description: 'Identity images with composable initials fallbacks.' },
  { id: 'label', label: 'Label', category: 'Forms', description: 'Native form-label association.', keywords: 'form label' },
  { id: 'helper-text', label: 'Helper Text', category: 'Forms', description: 'Persistent instructions associated with a form control.' },
  { id: 'validation-message', label: 'Validation Message', category: 'Forms', description: 'Announced field errors with explicit description association.' },
  { id: 'radio-group', label: 'Radio Group', category: 'Forms', description: 'Single selection with native form integration and arrow-key navigation.' },
  { id: 'switch', label: 'Switch', category: 'Forms', description: 'An immediately applied on/off setting.', keywords: 'toggle boolean' },
  { id: 'slider', label: 'Slider', category: 'Forms', description: 'Keyboard-operable single-value and range selection.' },
  { id: 'box', label: 'Box', category: 'Layout primitives', description: 'A neutral surface and token-backed inset wrapper.' },
  { id: 'container', label: 'Container', category: 'Layout primitives', description: 'Responsive page and reading-width constraints.' },
  { id: 'stack', label: 'Stack', category: 'Layout primitives', description: 'Vertical flex composition with semantic gaps.', keywords: 'flex vertical' },
  { id: 'inline', label: 'Inline', category: 'Layout primitives', description: 'Wrapping horizontal flex composition.', keywords: 'flex horizontal' },
  { id: 'grid', label: 'Grid', category: 'Layout primitives', description: 'Auto-fitting or responsive fixed-column composition.' },
  { id: 'spacer', label: 'Spacer', category: 'Layout primitives', description: 'Decorative flexible space inside a flex layout.' },
  { id: 'separator', label: 'Separator', category: 'Layout primitives', description: 'Decorative or semantic horizontal and vertical dividers.', keywords: 'divider' },
  { id: 'aspect-ratio', label: 'Aspect Ratio', category: 'Layout primitives', description: 'Stable proportional media space within a constrained parent.' },
  { id: 'scroll-area', label: 'Scroll Area', category: 'Layout primitives', description: 'Constrained, keyboard-focusable scrolling regions.' },
  { id: 'button-group', label: 'Button Group', category: 'Buttons', description: 'Named, wrapping action groups with normal Tab order.' },
  { id: 'progress', label: 'Progress', category: 'Feedback', description: 'Determinate and indeterminate progress indicators.' },
];

export const FOUNDATION_PAGES: CatalogEntry[] = [
  { id: 'sizing-foundation', label: 'Sizing', category: 'Foundations', description: 'Semantic dimensions for controls, icons, and layout.' },
  { id: 'icons-foundation', label: 'Iconography', category: 'Foundations', description: 'Icon scale, stroke treatment, and accessible naming.' },
  { id: 'opacity-foundation', label: 'Opacity', category: 'Foundations', description: 'Disabled and overlay opacity roles without hiding essential information.' },
  { id: 'aspect-ratios-foundation', label: 'Aspect Ratios', category: 'Foundations', description: 'Square, portrait, and landscape media proportions.' },
  { id: 'responsive-foundation', label: 'Responsive Behaviour', category: 'Foundations', description: 'Breakpoints, reflow, wrapping, density, and overflow.', keywords: 'breakpoints grid columns gutters margins' },
  { id: 'motion-foundation', label: 'Motion', category: 'Foundations', description: 'Shared durations, easing, transitions, and reduced motion.' },
  { id: 'layering-foundation', label: 'Layering', category: 'Foundations', description: 'Z-index roles for sticky content, overlays, and tooltips.', keywords: 'z-index portals' },
];

const existingEntries: CatalogEntry[] = [
  { id: 'overview', label: 'Overview', category: 'System', description: 'The CVP design system and its operator-focused principles.' },
  { id: 'components', label: 'All Components & Foundations', category: 'System', description: 'The complete, searchable catalogue of supported design-system capabilities.' },
  { id: 'components-preview', label: 'Component Previews', category: 'System', description: 'The existing interactive component sampler.' },
  { id: 'principles', label: 'Design Principles', category: 'System', description: 'The seven principles guiding CVP workflows and interactions.' },
  { id: 'accessibility', label: 'Accessibility', category: 'System', description: 'WCAG 2.2 AA requirements and release checks.' },
  ...['Colors', 'Typography', 'Spacing', 'Radius', 'Border', 'Elevation'].map(label => ({
    id: label.toLowerCase(), label, category: 'Foundations', description: `${label} foundations and their token contracts.`,
  })),
  { id: 'layout-foundation', label: 'Layout', category: 'Foundations', description: 'Grid, pane, container, and responsive layout rules.' },
  ...FOUNDATION_PAGES,
  { id: 'token-architecture', label: 'Token Architecture', category: 'Tokens', description: 'Primitive values, semantic roles, and component contracts.' },
  { id: 'primitives', label: 'Primitives', category: 'Primitives', description: 'A composed gallery of low-level building blocks.' },
  ...['Primary Button', 'Secondary Button', 'Outline Button', 'Icon Button', 'Icon Small Button', 'Icon Button with Text', 'Text Button'].map(label => ({
    id: label.toLowerCase().replaceAll(' ', '-'), label, category: 'Buttons', description: `${label} variants, interaction states, and accessibility.`,
    ...(label === 'Icon Small Button' ? { availability: 'deprecated' as const } : {}),
  })),
  ...['Text Input', 'Number Input', 'Textarea', 'Misc Input', 'Checkbox', 'Choice Card Group', 'Select', 'Multi Select', 'Pills', 'Filter', 'Date Picker'].map(label => ({
    id: label.toLowerCase().replaceAll(' ', '-'), label, category: 'Forms', description: `${label} usage, states, and composition.`,
    ...(label === 'Pills' ? { keywords: 'tag chip' } : {}),
  })),
  { id: 'search-field', label: 'Search Field', category: 'Forms', description: 'A labelled search input with a clear action.', keywords: 'search input' },
  { id: 'sort-control', label: 'Sort Control', category: 'Forms', description: 'Field selection and ascending/descending direction.' },
  { id: 'date-input', label: 'Date Input', category: 'Forms', description: 'Native date entry through TextInput; not a separate implementation.' },
  { id: 'time-input', label: 'Time Input', category: 'Forms', description: 'Native time entry through TextInput.' },
  { id: 'file-input', label: 'File Input', category: 'Forms', description: 'Native file selection through TextInput; transport is application-owned.', keywords: 'file upload attachment' },
  ...['Breadcrumb', 'Header Navigation', 'Tabs', 'Tree', 'Table', 'Pagination', 'Badge', 'Segmented Control', 'Accordion', 'Tag Filter'].map(label => ({
    id: label.toLowerCase().replaceAll(' ', '-'), label, category: label === 'Badge' ? 'Content' : 'Navigation', description: `${label} anatomy, interaction, and usage.`,
  })),
  ...['Modal', 'Content Browser Modal', 'Tooltip'].map(label => ({
    id: label.toLowerCase().replaceAll(' ', '-'), label, category: 'Overlays', description: `${label} behavior and accessibility contract.`,
  })),
  ...['Skeleton', 'Loader', 'Status', 'Toast', 'Banner'].map(label => ({
    id: label.toLowerCase(), label, category: 'Feedback', description: `${label} states and accessible feedback.`,
    ...(label === 'Loader' ? { keywords: 'spinner loading' } : {}),
  })),
  { id: 'query-controls', label: 'Query Controls', category: 'Patterns', description: 'Search and sort controls composed for collection workflows.' },
  { id: 'unsaved-changes-footer', label: 'Unsaved Changes Footer', category: 'Patterns', description: 'Persistent save/cancel actions and draft status.' },
  { id: 'rail-content-gallery', label: 'Rail Content Gallery', category: 'Patterns', description: 'Product-level content browsing and selection.' },
  { id: 'workspace-layout', label: 'Workspace Layout', category: 'Patterns', description: 'Reusable workspace panes and action areas.' },
  { id: 'login-signup', assetIds: ['login-sign-up'], label: 'Login / Sign Up', category: 'Templates', description: 'Authentication page structure and states.' },
  { id: 'rails-list', label: 'Rails List', category: 'Templates', description: 'Collection management and persisted rail configuration.' },
  { id: 'rail-details', assetIds: ['rail-details', 'personalized-rail-details', 'station-rail-details'], label: 'Rail Details', category: 'Templates', description: 'Shared editorial, personalized, and station rail configuration and previews.' },
  ...[
    ['toggle', 'Toggle'], ['filter-group', 'Filter Group'], ['layout', 'Legacy Layout'],
    ['page-side-nav', 'Page Side Navigation'], ['segment-query-config', 'Segment Query Configuration'],
  ].map(([id, label]) => ({
    id, label, category: 'Deferred / legacy', description: 'Existing documentation; not approved for new shared implementations.',
    availability: 'deferred' as const,
  })),
];

const categories = ['System', 'Foundations', 'Tokens', 'Primitives', 'Content', 'Buttons', 'Forms', 'Layout primitives', 'Navigation', 'Overlays', 'Feedback', 'Patterns', 'Templates', 'Deferred / legacy'];

export const DESIGN_SYSTEM_CATALOG = [...existingEntries, ...PRIMITIVE_PAGES].sort(
  (a, b) => categories.indexOf(a.category) - categories.indexOf(b.category),
);

export function filterCatalog(query: string) {
  const normalized = query.trim().toLocaleLowerCase();
  return DESIGN_SYSTEM_CATALOG.filter(entry =>
    `${entry.label} ${entry.category} ${entry.description} ${entry.keywords ?? ''}`.toLocaleLowerCase().includes(normalized),
  );
}
