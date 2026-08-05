import React from 'react';

export function TokensDocumentation() {
  return (
    <>
      <style>{`
        .tokens-documentation {
          /* Design System Tokens */
          --tokens-documentation-padding: 48px;
          --tokens-documentation-max-width: 1200px;
          --tokens-documentation-font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          /* Component Styles */
          padding: var(--tokens-documentation-padding);
          max-width: var(--tokens-documentation-max-width);
          font-family: var(--tokens-documentation-font-family);
          box-sizing: border-box;
        }

        .tokens-documentation__header {
          /* Design System Tokens */
          --tokens-header-margin-bottom: 48px;

          /* Component Styles */
          margin-bottom: var(--tokens-header-margin-bottom);
        }

        .tokens-documentation__title {
          /* Design System Tokens */
          --tokens-title-color: #ffffff;
          --tokens-title-font-size: 32px;
          --tokens-title-font-weight: 700;
          --tokens-title-line-height: 40px;
          --tokens-title-margin: 0 0 16px 0;

          /* Component Styles */
          color: var(--tokens-title-color);
          font-size: var(--tokens-title-font-size);
          font-weight: var(--tokens-title-font-weight);
          line-height: var(--tokens-title-line-height);
          margin: var(--tokens-title-margin);
        }

        .tokens-documentation__description {
          /* Design System Tokens */
          --tokens-description-color: #bbbbbb;
          --tokens-description-font-size: 16px;
          --tokens-description-font-weight: 400;
          --tokens-description-line-height: 24px;
          --tokens-description-margin: 0 0 24px 0;

          /* Component Styles */
          color: var(--tokens-description-color);
          font-size: var(--tokens-description-font-size);
          font-weight: var(--tokens-description-font-weight);
          line-height: var(--tokens-description-line-height);
          margin: var(--tokens-description-margin);
        }

        .tokens-documentation__status-badge {
          /* Design System Tokens */
          --tokens-status-badge-display: inline-flex;
          --tokens-status-badge-align-items: center;
          --tokens-status-badge-gap: 8px;
          --tokens-status-badge-padding: 4px 12px;
          --tokens-status-badge-bg: #22c55e20;
          --tokens-status-badge-color: #22c55e;
          --tokens-status-badge-border-radius: 16px;
          --tokens-status-badge-font-size: 12px;
          --tokens-status-badge-font-weight: 500;

          /* Component Styles */
          display: var(--tokens-status-badge-display);
          align-items: var(--tokens-status-badge-align-items);
          gap: var(--tokens-status-badge-gap);
          padding: var(--tokens-status-badge-padding);
          background-color: var(--tokens-status-badge-bg);
          color: var(--tokens-status-badge-color);
          border-radius: var(--tokens-status-badge-border-radius);
          font-size: var(--tokens-status-badge-font-size);
          font-weight: var(--tokens-status-badge-font-weight);
        }

        .tokens-documentation__status-dot {
          /* Design System Tokens */
          --tokens-status-dot-width: 6px;
          --tokens-status-dot-height: 6px;
          --tokens-status-dot-bg: #22c55e;
          --tokens-status-dot-border-radius: 50%;

          /* Component Styles */
          width: var(--tokens-status-dot-width);
          height: var(--tokens-status-dot-height);
          background-color: var(--tokens-status-dot-bg);
          border-radius: var(--tokens-status-dot-border-radius);
        }

        .tokens-documentation__section {
          /* Design System Tokens */
          --tokens-section-margin-bottom: 48px;

          /* Component Styles */
          margin-bottom: var(--tokens-section-margin-bottom);
        }

        .tokens-documentation__section-title {
          /* Design System Tokens */
          --tokens-section-title-color: #ffffff;
          --tokens-section-title-font-size: 24px;
          --tokens-section-title-font-weight: 600;
          --tokens-section-title-line-height: 32px;
          --tokens-section-title-margin: 0 0 24px 0;

          /* Component Styles */
          color: var(--tokens-section-title-color);
          font-size: var(--tokens-section-title-font-size);
          font-weight: var(--tokens-section-title-font-weight);
          line-height: var(--tokens-section-title-line-height);
          margin: var(--tokens-section-title-margin);
        }

        .tokens-documentation__grid {
          /* Design System Tokens */
          --tokens-grid-display: grid;
          --tokens-grid-columns: repeat(auto-fit, minmax(300px, 1fr));
          --tokens-grid-gap: 24px;

          /* Component Styles */
          display: var(--tokens-grid-display);
          grid-template-columns: var(--tokens-grid-columns);
          gap: var(--tokens-grid-gap);
        }

        .tokens-documentation__card {
          /* Design System Tokens */
          --tokens-card-padding: 24px;
          --tokens-card-bg: #292a2e;
          --tokens-card-border: 1px solid #d4e4fe1a;
          --tokens-card-border-radius: 8px;

          /* Component Styles */
          padding: var(--tokens-card-padding);
          background-color: var(--tokens-card-bg);
          border: var(--tokens-card-border);
          border-radius: var(--tokens-card-border-radius);
          box-sizing: border-box;
        }

        .tokens-documentation__card-title {
          /* Design System Tokens */
          --tokens-card-title-color: #ffffff;
          --tokens-card-title-font-size: 18px;
          --tokens-card-title-font-weight: 600;
          --tokens-card-title-line-height: 24px;
          --tokens-card-title-margin: 0 0 12px 0;

          /* Component Styles */
          color: var(--tokens-card-title-color);
          font-size: var(--tokens-card-title-font-size);
          font-weight: var(--tokens-card-title-font-weight);
          line-height: var(--tokens-card-title-line-height);
          margin: var(--tokens-card-title-margin);
        }

        .tokens-documentation__card-content {
          /* Design System Tokens */
          --tokens-card-content-color: #bbbbbb;
          --tokens-card-content-font-size: 14px;
          --tokens-card-content-font-weight: 400;
          --tokens-card-content-line-height: 20px;

          /* Component Styles */
          color: var(--tokens-card-content-color);
          font-size: var(--tokens-card-content-font-size);
          font-weight: var(--tokens-card-content-font-weight);
          line-height: var(--tokens-card-content-line-height);
        }

        .tokens-documentation__token-example {
          /* Design System Tokens */
          --token-example-display: block;
          --token-example-padding: 8px 12px;
          --token-example-margin: 4px 0;
          --token-example-bg: #19191a;
          --token-example-border: 1px solid #374151;
          --token-example-border-radius: 4px;
          --token-example-font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
          --token-example-font-size: 12px;
          --token-example-color: #e5e7eb;

          /* Component Styles */
          display: var(--token-example-display);
          padding: var(--token-example-padding);
          margin: var(--token-example-margin);
          background-color: var(--token-example-bg);
          border: var(--token-example-border);
          border-radius: var(--token-example-border-radius);
          font-family: var(--token-example-font-family);
          font-size: var(--token-example-font-size);
          color: var(--token-example-color);
        }

        .tokens-documentation__color-swatch {
          /* Design System Tokens */
          --color-swatch-display: inline-block;
          --color-swatch-width: 20px;
          --color-swatch-height: 20px;
          --color-swatch-border-radius: 4px;
          --color-swatch-border: 1px solid rgba(255, 255, 255, 0.2);
          --color-swatch-margin-right: 8px;
          --color-swatch-vertical-align: middle;

          /* Component Styles */
          display: var(--color-swatch-display);
          width: var(--color-swatch-width);
          height: var(--color-swatch-height);
          border-radius: var(--color-swatch-border-radius);
          border: var(--color-swatch-border);
          margin-right: var(--color-swatch-margin-right);
          vertical-align: var(--color-swatch-vertical-align);
        }
      `}</style>

      <div className="tokens-documentation">
        {/* Header */}
        <div className="tokens-documentation__header">
          <h1 className="tokens-documentation__title">Design System Tokens</h1>
          <p className="tokens-documentation__description">
            Comprehensive design system tokens using modern CSS custom properties. All tokens use OKLCH color space 
            for perceptually uniform colors and include extensive coverage for typography, spacing, colors, and animations.
          </p>
          
          {/* Status badge */}
          <div className="tokens-documentation__status-badge">
            <div className="tokens-documentation__status-dot" />
            200+ Tokens Available
          </div>
        </div>

        {/* Color System */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Color System (OKLCH)</h2>
          <div className="tokens-documentation__grid">
            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Primary Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#3d63dd' }}></span>
                  Primary Blue (#3d63dd)
                </div>
                <code className="tokens-documentation__token-example">--color-blue-600: oklch(.546 .245 262.881)</code>
                <code className="tokens-documentation__token-example">--primary-btn-bg: #3d63dd</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Status Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#22c55e' }}></span>
                  Success/Active (#22c55e)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#9ca3af' }}></span>
                  Inactive/Muted (#9ca3af)
                </div>
                <code className="tokens-documentation__token-example">--a11y-status-active: #22c55e</code>
                <code className="tokens-documentation__token-example">--a11y-status-inactive: #9ca3af</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Tag Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#60a5fa' }}></span>
                  Recommended (#60a5fa)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#c084fc' }}></span>
                  Editorial (#c084fc)
                </div>
                <code className="tokens-documentation__token-example">--a11y-rail-recommended: #60a5fa</code>
                <code className="tokens-documentation__token-example">--a11y-rail-editorial: #c084fc</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Grayscale Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#ffffff' }}></span>
                  Foreground (#ffffff)
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#bbbbbb' }}></span>
                  Muted Foreground (#bbbbbb)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#19191a' }}></span>
                  Background (#19191a)
                </div>
                <code className="tokens-documentation__token-example">--foreground: #fff</code>
                <code className="tokens-documentation__token-example">--background: #19191a</code>
              </div>
            </div>
          </div>
        </section>

        {/* Typography System */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Typography System</h2>
          <div className="tokens-documentation__grid">
            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Font Families</h3>
              <div className="tokens-documentation__card-content">
                <p style={{ fontFamily: 'Inter, sans-serif', marginBottom: '8px' }}>Inter - Primary font family</p>
                <p style={{ fontFamily: 'Inconsolata, monospace', marginBottom: '12px' }}>Inconsolata - Monospace for tags</p>
                <code className="tokens-documentation__token-example">--font-family: "Inter", sans-serif</code>
                <code className="tokens-documentation__token-example">--font-family-mono: "Inconsolata", monospace</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Type Scale</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ fontSize: '14px', lineHeight: '20px', marginBottom: '8px' }}>
                  Medium Scale (14px/20px) - Body text
                </div>
                <div style={{ fontSize: '13px', lineHeight: '20px', marginBottom: '12px' }}>
                  Small Scale (13px/20px) - Tags & captions
                </div>
                <code className="tokens-documentation__token-example">--type-scale-m-size: 14px</code>
                <code className="tokens-documentation__token-example">--type-scale-s-regular-size: 13px</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Font Weights</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ fontWeight: 400, marginBottom: '8px' }}>Regular (400) - Body text</div>
                <div style={{ fontWeight: 500, marginBottom: '8px' }}>Medium (500) - Buttons</div>
                <div style={{ fontWeight: 600, marginBottom: '12px' }}>Semibold (600) - Headings</div>
                <code className="tokens-documentation__token-example">--type-scale-m-weight: 400</code>
                <code className="tokens-documentation__token-example">--font-weight-medium: 500</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Letter Spacing</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ letterSpacing: '0.15px', marginBottom: '8px' }}>
                  Medium text (+0.15px)
                </div>
                <div style={{ letterSpacing: '0.1px', marginBottom: '12px' }}>
                  Small text (+0.1px)
                </div>
                <code className="tokens-documentation__token-example">--type-scale-m-letter-spacing: .15px</code>
                <code className="tokens-documentation__token-example">--type-scale-s-regular-letter-spacing: .1px</code>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Spacing &amp; Layout</h2>
          <div className="tokens-documentation__grid">
            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Base Spacing Unit</h3>
              <div className="tokens-documentation__card-content">
                <p>All spacing is based on a 4px base unit for consistent rhythm.</p>
                <code className="tokens-documentation__token-example">--spacing: 4px</code>
                <code className="tokens-documentation__token-example">/* Usage: calc(var(--spacing) * 2) = 8px */</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Border Radius</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ 
                  width: '40px', 
                  height: '20px', 
                  backgroundColor: '#3d63dd', 
                  borderRadius: '4px',
                  marginBottom: '8px'
                }}></div>
                <code className="tokens-documentation__token-example">--radius: .625rem (10px)</code>
                <code className="tokens-documentation__token-example">--radius-xs: .125rem (2px)</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Viewport Units</h3>
              <div className="tokens-documentation__card-content">
                <p>Modern viewport units for responsive layouts.</p>
                <code className="tokens-documentation__token-example">--100dvw: 100dvw</code>
                <code className="tokens-documentation__token-example">--100dvh: 100dvh</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Component Spacing</h3>
              <div className="tokens-documentation__card-content">
                <p>Consistent spacing patterns for components.</p>
                <code className="tokens-documentation__token-example">/* Tree indentation: 16px per level */</code>
                <code className="tokens-documentation__token-example">/* Button padding: 8px vertical, 16px horizontal */</code>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Tokens */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Semantic Tokens</h2>
          <div className="tokens-documentation__grid">
            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Background Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#19191a' }}></span>
                  Background (#19191a)
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#292a2e' }}></span>
                  Card/Secondary (#292a2e)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#212123' }}></span>
                  Input Background (#212123)
                </div>
                <code className="tokens-documentation__token-example">--background: #19191a</code>
                <code className="tokens-documentation__token-example">--card: #19191a</code>
                <code className="tokens-documentation__token-example">--input: #212123</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Border Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#d4e4fe1a' }}></span>
                  Default Border (10% opacity)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#4a4a4a' }}></span>
                  Focus Ring (#4a4a4a)
                </div>
                <code className="tokens-documentation__token-example">--border: #d4e4fe1a</code>
                <code className="tokens-documentation__token-example">--ring: #4a4a4a</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Text Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#ffffff' }}></span>
                  Primary Text (#ffffff)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#bbbbbb' }}></span>
                  Secondary Text (#bbbbbb)
                </div>
                <code className="tokens-documentation__token-example">--foreground: #fff</code>
                <code className="tokens-documentation__token-example">--muted-foreground: #bbb</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">State Colors</h3>
              <div className="tokens-documentation__card-content">
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#3d63dd' }}></span>
                  Primary (#3d63dd)
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#e6494e' }}></span>
                  Destructive (#e6494e)
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span className="tokens-documentation__color-swatch" style={{ backgroundColor: '#292a2e' }}></span>
                  Secondary/Muted (#292a2e)
                </div>
                <code className="tokens-documentation__token-example">--primary: #fff</code>
                <code className="tokens-documentation__token-example">--destructive: #e6494e</code>
                <code className="tokens-documentation__token-example">--secondary: #292a2e</code>
              </div>
            </div>
          </div>
        </section>

        {/* Animation System */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Animation System</h2>
          <div className="tokens-documentation__grid">
            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Transition Timing</h3>
              <div className="tokens-documentation__card-content">
                <p>Consistent timing functions for smooth interactions.</p>
                <code className="tokens-documentation__token-example">--default-transition-duration: .15s</code>
                <code className="tokens-documentation__token-example">--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)</code>
              </div>
            </div>

            <div className="tokens-documentation__card">
              <h3 className="tokens-documentation__card-title">Easing Functions</h3>
              <div className="tokens-documentation__card-content">
                <p>Smooth, natural motion curves.</p>
                <code className="tokens-documentation__token-example">--ease-in-out: cubic-bezier(.4, 0, .2, 1)</code>
                <code className="tokens-documentation__token-example">/* Used for hover, focus, and active states */</code>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="tokens-documentation__section">
          <h2 className="tokens-documentation__section-title">Usage Examples</h2>
          <div className="tokens-documentation__card">
            <h3 className="tokens-documentation__card-title">CSS Custom Properties Implementation</h3>
            <div className="tokens-documentation__card-content">
              <p style={{ marginBottom: '16px' }}>
                All components use CSS custom properties for consistent theming and easy customization:
              </p>
              <code className="tokens-documentation__token-example">
{`.primary-button {
  /* Design System Tokens */
  --primary-button-bg: var(--primary-btn-bg);
  --primary-button-color: var(--foreground);
  --primary-button-font-family: var(--font-family);
  --primary-button-font-size: var(--type-scale-m-size);
  --primary-button-transition: all var(--default-transition-duration) var(--default-transition-timing-function);
  
  /* Component Styles */
  background-color: var(--primary-button-bg);
  color: var(--primary-button-color);
  font-family: var(--primary-button-font-family);
  font-size: var(--primary-button-font-size);
  transition: var(--primary-button-transition);
}`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}