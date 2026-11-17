import { Caption, Container, Heading, Inline, Link, Paragraph, Stack } from '../../design-system';
import { FOUNDATION_PAGES } from '../designSystemCatalog';
import './DesignSystemCatalog.css';

interface Foundation {
  guidance: string;
  tokens: [string, string][];
  related: [string, string][];
}

export const FOUNDATION_DETAILS: Record<string, Foundation> = {
  'sizing-foundation': {
    guidance: 'Use semantic dimensions instead of one-off sizes. Minimum interactive targets are 24 by 24 CSS pixels; prefer comfortable targets where space permits. Keep control geometry separate from the size of its decorative icon.',
    tokens: [['--cvp-target-size-minimum', 'Minimum interactive target'], ['--cvp-target-size-comfortable', 'Comfortable interactive target'], ['--cvp-layout-pane-supporting-min-width', 'Supporting-pane minimum width'], ['--cvp-layout-content-reading-max-width', 'Responsive reading width']],
    related: [['spacing', 'Spacing'], ['container', 'Container'], ['icon', 'Icon']],
  },
  'icons-foundation': {
    guidance: 'Use the existing Lucide vocabulary and shared stroke treatment. Icons inherit semantic foregrounds. A standalone meaningful icon needs a name; an icon next to an equivalent visible label is decorative. Interactive icons belong inside IconButton.',
    tokens: [['--cvp-icon-size-small', 'Small glyph: 16px'], ['--cvp-icon-size-medium', 'Medium glyph: 20px'], ['--cvp-icon-size-large', 'Large glyph: 24px'], ['--cvp-icon-stroke-width', 'Shared Lucide stroke width']],
    related: [['icon', 'Icon'], ['icon-button', 'Icon Button']],
  },
  'opacity-foundation': {
    guidance: 'Use opacity by role, not as a substitute for semantic disabled colours. The current disabled opacity is one: component contracts supply accessible surfaces and text. Scrim opacity is an overlay decision, not a way to dim an entire content subtree.',
    tokens: [['--cvp-opacity-disabled', 'Disabled role; colour contracts communicate availability'], ['--cvp-opacity-placeholder', 'Placeholder emphasis'], ['--cvp-opacity-scrim-light', 'Light scrim alpha'], ['--cvp-opacity-scrim-dark', 'Dark scrim alpha']],
    related: [['colors', 'Colors'], ['modal', 'Modal'], ['accessibility', 'Accessibility']],
  },
  'aspect-ratios-foundation': {
    guidance: 'Use square (1:1), video (16:9), or portrait (2:3) proportions when the content calls for them. Preserve meaningful cropping and alternative text. With the Radix-backed AspectRatio, constrain the parent width so the reserved height is correct.',
    tokens: [['--cvp-aspect-ratio-square', 'Square proportion'], ['--cvp-aspect-ratio-video', 'Landscape video proportion'], ['--cvp-aspect-ratio-portrait', 'Portrait proportion']],
    related: [['aspect-ratio', 'Aspect Ratio'], ['image', 'Image']],
  },
  'responsive-foundation': {
    guidance: 'The semantic layout grid changes at 600px, 1024px, and 1440px. The documentation shell has its own 768px navigation breakpoint; these are not a single unified breakpoint API. Preserve DOM order, wrap by default, collapse fixed primitive grids below 600px, and constrain scrolling to named regions. Validate at narrow, medium, and wide widths with zoom; do not hide essential content.',
    tokens: [['--cvp-layout-page-columns', 'Responsive column count'], ['--cvp-layout-page-container', 'Responsive page maximum width'], ['--cvp-layout-page-gutter', 'Responsive grid gutter'], ['--cvp-layout-page-margin', 'Responsive outer margin']],
    related: [['layout-foundation', 'Layout'], ['grid', 'Grid'], ['inline', 'Inline'], ['scroll-area', 'Scroll Area']],
  },
  'motion-foundation': {
    guidance: 'Use fast duration for small feedback, base for ordinary transitions, and slow for larger changes. Transition specific properties rather than all. Respect prefers-reduced-motion: reduce nonessential movement while preserving visible progress and state feedback.',
    tokens: [['--cvp-motion-duration-fast', '150ms feedback'], ['--cvp-motion-duration-base', '250ms transition'], ['--cvp-motion-duration-slow', '350ms transition'], ['--cvp-motion-duration-bounce', '500ms expressive timing; use sparingly'], ['--cvp-motion-easing-standard', 'Standard easing'], ['--cvp-motion-easing-bounce', 'Expressive easing; not required for essential feedback']],
    related: [['loader', 'Loader'], ['progress', 'Progress'], ['accessibility', 'Accessibility']],
  },
  'layering-foundation': {
    guidance: 'Use named z-index roles instead of arbitrary large values. Roles do not solve stacking contexts by themselves. Check portaled menus, tooltips, focus traps, and sticky navigation together; an overlay inside a modal may need the modal portal container rather than a larger global number.',
    tokens: [['--cvp-z-base', 'Ordinary content'], ['--cvp-z-sticky', 'Sticky local content'], ['--cvp-z-navigation', 'Navigation'], ['--cvp-z-dropdown', 'Dropdown layer'], ['--cvp-z-tooltip', 'Tooltip layer'], ['--cvp-z-overlay', 'Overlay scrim'], ['--cvp-z-modal', 'Modal content'], ['--cvp-z-toast', 'Transient notifications']],
    related: [['modal', 'Modal'], ['tooltip', 'Tooltip'], ['toast', 'Toast']],
  },
};

export function FoundationDocumentation({ id }: { id: string }) {
  const entry = FOUNDATION_PAGES.find(item => item.id === id);
  const foundation = FOUNDATION_DETAILS[id];
  if (!entry || !foundation) throw new Error(`Missing foundation documentation for ${id}`);
  return <article className="cvp-catalog-detail">
    <Container>
      <Stack gap="lg">
        <header><Caption>Foundations</Caption><Heading level={1} size="headline">{entry.label}</Heading><Paragraph>{entry.description}</Paragraph></header>
        <section><Stack><Heading>Principles and application</Heading><Paragraph>{foundation.guidance}</Paragraph></Stack></section>
        <section><Stack><Heading>Supported semantic tokens</Heading><Paragraph>Consume these roles through component contracts or composition styles. Values resolve from the canonical stylesheet and may vary by theme, density, or viewport.</Paragraph>
          <dl className="cvp-catalog-detail__tokens">{foundation.tokens.map(([token, role]) => <div key={token}><dt><code>{token}</code></dt><dd>{role}</dd></div>)}</dl>
        </Stack></section>
        <section><Stack><Heading>Related capabilities</Heading><Inline>{foundation.related.map(([page, label]) => <Link key={page} href={`?page=${page}`}>{label}</Link>)}</Inline></Stack></section>
        <Link href="?page=components">All components and foundations</Link>
      </Stack>
    </Container>
  </article>;
}
