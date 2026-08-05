import React from 'react';

interface TypeSampleProps {
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  usage?: string;
  example?: string;
}

function TypeSample({ name, size, weight, lineHeight, letterSpacing, usage, example = 'The quick brown fox jumps over the lazy dog' }: TypeSampleProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '20px',
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border-default)',
      borderRadius: '8px'
    }}>
      <div style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight: lineHeight,
        letterSpacing: letterSpacing,
        color: 'var(--foreground)',
        marginBottom: '8px'
      }}>
        {example}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'var(--foreground)'
        }}>
          {name}
        </div>
        <div style={{
          fontSize: '12px',
          color: 'var(--muted-foreground)',
          fontFamily: 'monospace'
        }}>
          {size} / {weight} / {lineHeight} / {letterSpacing}
        </div>
        {usage && (
          <div style={{
            fontSize: '11px',
            color: 'var(--muted-foreground)',
            fontStyle: 'italic',
            marginTop: '4px'
          }}>
            {usage}
          </div>
        )}
      </div>
    </div>
  );
}

export function TypographyDocumentation() {
  return (
    <>
      <style>{`
        .typography-docs {
          padding: 48px 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .typography-docs__header {
          margin-bottom: 48px;
        }

        .typography-docs__title {
          font-size: 32px;
          font-weight: 700;
          line-height: 40px;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .typography-docs__description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .typography-docs__section {
          margin-bottom: 48px;
        }

        .typography-docs__section h2 {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .typography-docs__section h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          color: var(--text-primary);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .typography-docs__section h3:first-of-type {
          margin-top: 0;
        }

        .typography-docs__section p {
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .typography-docs__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .typography-docs__note {
          background-color: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 16px;
          margin-top: 24px;
          font-size: 13px;
          color: var(--muted-foreground);
          line-height: 1.6;
        }

        .typography-docs__code {
          background-color: rgba(111, 139, 230, 0.1);
          border: 1px solid rgba(111, 139, 230, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: #6f8be6;
        }

        .typography-docs__comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }

        .typography-docs__comparison-item {
          padding: 20px;
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
        }

        .typography-docs__comparison-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--muted-foreground);
          margin-bottom: 12px;
        }
      `}</style>

      <div className="typography-docs">
        <div className="typography-docs__header">
          <h1 className="typography-docs__title">Typography</h1>
          <p className="typography-docs__description">
            A comprehensive type system built on Inter, optimized for information density and operational efficiency. Four primary scales (XS, S, M, L) with weight variants ensure consistent hierarchy across all components.
          </p>
        </div>

        {/* Type Scale Overview */}
        <section className="typography-docs__section">
          <h2>Type Scale</h2>
          <p>
            The system uses <strong>four primary scales</strong> (XS, S, M, L) with weight variants. All form components default to <strong>Typescale M Regular</strong> (14px / 400 / 20px line-height / 0.15px letter-spacing) for consistency.
          </p>

          <h3>Typescale XS (12px)</h3>
          <div className="typography-docs__grid">
            <TypeSample
              name="Typescale XS Regular"
              size="12px"
              weight="400"
              lineHeight="16px"
              letterSpacing="0.1px"
              usage="Metadata, timestamps, fine-print helper text, table cell annotations"
            />
            <TypeSample
              name="Typescale XS Medium"
              size="12px"
              weight="500"
              lineHeight="16px"
              letterSpacing="0.1px"
              usage="Emphasized metadata, button labels in small buttons"
            />
          </div>

          <h3>Typescale S (13px)</h3>
          <div className="typography-docs__grid">
            <TypeSample
              name="Typescale S Regular"
              size="13px"
              weight="400"
              lineHeight="20px"
              letterSpacing="0.1px"
              usage="Secondary actions, menu items, form helper text"
            />
            <TypeSample
              name="Typescale S Medium"
              size="13px"
              weight="500"
              lineHeight="20px"
              letterSpacing="0.1px"
              usage="Form labels, emphasized labels, navigation items (STANDARD for labels)"
            />
          </div>

          <h3>Typescale M (14px)</h3>
          <div className="typography-docs__grid">
            <TypeSample
              name="Typescale M Regular"
              size="14px"
              weight="400"
              lineHeight="20px"
              letterSpacing="0.15px"
              usage="Body text, form inputs, primary UI text, table content (DEFAULT for most components)"
            />
            <TypeSample
              name="Typescale M Medium"
              size="14px"
              weight="500"
              lineHeight="20px"
              letterSpacing="0.15px"
              usage="Button labels, emphasized body text, active states"
            />
          </div>

          <h3>Typescale L (15px)</h3>
          <div className="typography-docs__grid">
            <TypeSample
              name="Typescale L Regular"
              size="15px"
              weight="400"
              lineHeight="22px"
              letterSpacing="0.1px"
              usage="Descriptive text, longer-form content, section introductions"
            />
            <TypeSample
              name="Typescale L Medium"
              size="15px"
              weight="500"
              lineHeight="22px"
              letterSpacing="0.1px"
              usage="Emphasized descriptions, section headers in small components"
            />
          </div>
        </section>

        {/* Headings */}
        <section className="typography-docs__section">
          <h2>Headings</h2>
          <p>
            Headings use distinct weights (700 for H1, 600 for H2/H3) to create clear information hierarchy without excessive size jumps. Line-heights are optimized for readability—tighter for headings (1.25x).
          </p>

          <div className="typography-docs__grid">
            <TypeSample
              name="H1 (Display)"
              size="32px"
              weight="700"
              lineHeight="40px"
              letterSpacing="0px"
              usage="Page titles, main headings"
              example="Cloud Video Platform"
            />
            <TypeSample
              name="H2 (Section Heading)"
              size="24px"
              weight="600"
              lineHeight="32px"
              letterSpacing="0px"
              usage="Section titles, major divisions"
              example="Content Management"
            />
            <TypeSample
              name="H3 (Subsection)"
              size="18px"
              weight="600"
              lineHeight="28px"
              letterSpacing="0px"
              usage="Subsection titles, card headings"
              example="Rail Configuration"
            />
            <TypeSample
              name="H4 (Component Heading)"
              size="16px"
              weight="600"
              lineHeight="24px"
              letterSpacing="0px"
              usage="Component-level headings, form sections"
              example="Collection Settings"
            />
          </div>
        </section>

        {/* Font Weights */}
        <section className="typography-docs__section">
          <h2>Font Weights</h2>
          <p>
            Inter provides excellent weight differentiation. Use Regular (400) for body text, Medium (500) for emphasis and labels, Semi-Bold (600) for subheadings, and Bold (700) for primary headings.
          </p>

          <div className="typography-docs__comparison">
            <div className="typography-docs__comparison-item">
              <div className="typography-docs__comparison-label">Regular (400)</div>
              <div style={{ fontSize: '14px', fontWeight: 400, color: 'var(--foreground)' }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '8px', marginBottom: 0 }}>
                Default for body text, form inputs, descriptions
              </p>
            </div>
            <div className="typography-docs__comparison-item">
              <div className="typography-docs__comparison-label">Medium (500)</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--foreground)' }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '8px', marginBottom: 0 }}>
                Labels, buttons, emphasized text, navigation
              </p>
            </div>
            <div className="typography-docs__comparison-item">
              <div className="typography-docs__comparison-label">Semi-Bold (600)</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)' }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '8px', marginBottom: 0 }}>
                H2, H3, H4 headings, important labels
              </p>
            </div>
            <div className="typography-docs__comparison-item">
              <div className="typography-docs__comparison-label">Bold (700)</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--foreground)' }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '8px', marginBottom: 0 }}>
                H1 headings, critical emphasis
              </p>
            </div>
          </div>
        </section>

        {/* Line Height & Letter Spacing */}
        <section className="typography-docs__section">
          <h2>Line Height & Letter Spacing</h2>
          <p>
            Line-heights are optimized for readability—tighter for headings (1.25x), relaxed for body text (1.43x for M, 1.47x for L). Subtle positive tracking (0.1–0.15px) at small sizes improves legibility on screens.
          </p>

          <div className="typography-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Letter Spacing Guidelines</h4>
            <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
              <li><span className="typography-docs__code">0px</span> - Headings (maintains visual density)</li>
              <li><span className="typography-docs__code">0.1px</span> - Small sizes (12px, 13px, 15px) for improved legibility</li>
              <li><span className="typography-docs__code">0.15px</span> - Typescale M (14px) for optimal screen readability</li>
            </ul>
          </div>
        </section>

        {/* Font Family */}
        <section className="typography-docs__section">
          <h2>Font Family</h2>
          <p>
            <strong>Inter</strong> provides excellent screen legibility at small sizes and wide character set support. The fallback stack ensures professional appearance across all platforms.
          </p>

          <div className="typography-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Primary Font Stack</h4>
            <code style={{
              display: 'block',
              padding: '12px',
              backgroundColor: 'var(--bg-surface-raised)',
              borderRadius: '4px',
              fontSize: '12px',
              color: 'var(--foreground)',
              overflowX: 'auto',
              marginBottom: '16px'
            }}>
              "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
            </code>

            <h4 style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>Monospace Stack</h4>
            <code style={{
              display: 'block',
              padding: '12px',
              backgroundColor: 'var(--bg-surface-raised)',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'var(--foreground)',
              overflowX: 'auto'
            }}>
              "Inconsolata", "Monaco", "Courier New", monospace
            </code>
            <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '11px' }}>
              Used for code snippets, technical IDs, and data values requiring fixed-width display
            </p>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="typography-docs__section">
          <h2>Implementation Guide</h2>

          <div className="typography-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>Component Defaults</h4>

            <p style={{ marginBottom: '12px' }}><strong>Form Components:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>Input fields: <span className="typography-docs__code">Typescale M Regular (14px/400/20px/0.15px)</span></li>
              <li>Labels: <span className="typography-docs__code">Typescale S Medium (13px/500/20px/0.1px)</span></li>
              <li>Helper text: <span className="typography-docs__code">Typescale XS Regular (12px/400/16px/0.1px)</span></li>
              <li>Error messages: <span className="typography-docs__code">Typescale XS Regular (12px/400/16px/0.1px)</span></li>
            </ul>

            <p style={{ marginBottom: '12px' }}><strong>Button Components:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>Default buttons: <span className="typography-docs__code">Typescale M Medium (14px/500/20px/0.15px)</span></li>
              <li>Small buttons: <span className="typography-docs__code">Typescale XS Medium (12px/500/16px/0.1px)</span></li>
              <li>Large buttons: <span className="typography-docs__code">Typescale L Medium (15px/500/22px/0.1px)</span></li>
            </ul>

            <p style={{ marginBottom: '12px' }}><strong>Navigation:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>Nav items: <span className="typography-docs__code">Typescale S Medium (13px/500/20px/0.1px)</span></li>
              <li>Active nav items: <span className="typography-docs__code">Typescale S Medium (13px/500/20px/0.1px)</span> with color change</li>
              <li>Section labels: <span className="typography-docs__code">Typescale XS Medium (12px/500/16px/0.1px)</span></li>
            </ul>

            <p style={{ marginBottom: '12px' }}><strong>Tables:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
              <li>Table headers: <span className="typography-docs__code">Typescale S Medium (13px/500/20px/0.1px)</span></li>
              <li>Table cells: <span className="typography-docs__code">Typescale M Regular (14px/400/20px/0.15px)</span></li>
              <li>Metadata cells: <span className="typography-docs__code">Typescale XS Regular (12px/400/16px/0.1px)</span></li>
            </ul>
          </div>
        </section>

        {/* Accessibility */}
        <section className="typography-docs__section">
          <h2>Accessibility Considerations</h2>

          <div className="typography-docs__note">
            <h4 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--text-primary)' }}>WCAG Compliance</h4>
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>Minimum font size: 12px (Typescale XS) for metadata and fine print</li>
              <li>Default body text: 14px (Typescale M) for optimal readability</li>
              <li>Line height minimum: 1.43x for body text (20px at 14px size)</li>
              <li>All text colors meet WCAG AA contrast requirements against their backgrounds</li>
              <li>Primary text (#ffffff on dark, #111827 on light) meets AAA contrast requirements</li>
            </ul>

            <h4 style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>Best Practices</h4>
            <ul style={{ marginLeft: '20px', marginBottom: 0 }}>
              <li>Never use font sizes below 12px</li>
              <li>Maintain consistent line heights within text blocks</li>
              <li>Use weight (not size) for emphasis within paragraphs</li>
              <li>Reserve all-caps for labels and metadata, never for body text</li>
              <li>Ensure sufficient color contrast when layering text on backgrounds</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
