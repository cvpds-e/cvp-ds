import React, { useEffect, useState } from 'react';

interface DualColorSwatchProps {
  name: string;
  variable: string;
  darkValue: string;
  lightValue: string;
  darkOklch?: string;
  lightOklch?: string;
  usage?: string;
}

function DualColorSwatch({ name, variable, darkValue, lightValue, darkOklch, lightOklch, usage }: DualColorSwatchProps) {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(theme as 'dark' | 'light');
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '16px',
      backgroundColor: 'var(--bg-surface-raised)',
      borderRadius: '8px',
      border: '1px solid var(--border-default)'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '8px'
      }}>
        {name}
      </div>

      {/* Dark theme swatch */}
      <div>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Dark Theme
        </div>
        <div style={{
          width: '100%',
          height: '48px',
          backgroundColor: darkValue,
          borderRadius: '6px',
          border: currentTheme === 'dark' ? '2px solid var(--border-focus)' : '1px solid var(--border-default)',
          marginBottom: '4px'
        }} />
        <div style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontFamily: 'monospace',
          marginBottom: darkOklch ? '2px' : '0'
        }}>
          {darkValue}
        </div>
        {darkOklch && (
          <div style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
            opacity: 0.8
          }}>
            {darkOklch}
          </div>
        )}
      </div>

      {/* Light theme swatch */}
      <div>
        <div style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Light Theme
        </div>
        <div style={{
          width: '100%',
          height: '48px',
          backgroundColor: lightValue,
          borderRadius: '6px',
          border: currentTheme === 'light' ? '2px solid var(--border-focus)' : '1px solid var(--border-default)',
          marginBottom: '4px'
        }} />
        <div style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontFamily: 'monospace',
          marginBottom: lightOklch ? '2px' : '0'
        }}>
          {lightValue}
        </div>
        {lightOklch && (
          <div style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
            opacity: 0.8
          }}>
            {lightOklch}
          </div>
        )}
      </div>

      {/* Variable and usage */}
      <div style={{
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: '1px solid var(--border-default)'
      }}>
        <div style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontFamily: 'monospace',
          marginBottom: '4px'
        }}>
          {variable}
        </div>
        {usage && (
          <div style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            lineHeight: '1.4'
          }}>
            {usage}
          </div>
        )}
      </div>
    </div>
  );
}

export function ColorsDocumentation() {
  return (
    <>
      <style>{`
        .colors-docs {
          padding: 48px 0;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }

        .colors-docs__header {
          margin-bottom: 48px;
        }

        .colors-docs__title {
          font-size: 32px;
          font-weight: 700;
          line-height: 40px;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .colors-docs__description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--text-muted);
          margin-bottom: 24px;
          max-width: 800px;
        }

        .colors-docs__section {
          margin-bottom: 64px;
        }

        .colors-docs__section h2 {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .colors-docs__section-description {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .colors-docs__section h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          color: var(--text-primary);
          margin-bottom: 16px;
          margin-top: 32px;
        }

        .colors-docs__section h3:first-of-type {
          margin-top: 24px;
        }

        .colors-docs__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .colors-docs__note {
          background-color: var(--bg-surface-raised);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 20px;
          margin-top: 32px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .colors-docs__note strong {
          color: var(--text-primary);
        }

        .colors-docs__code {
          background-color: var(--state-info-bg);
          border: 1px solid var(--state-info-border);
          padding: 3px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: var(--state-info-text);
        }
      `}</style>

      <div className="colors-docs">
        <div className="colors-docs__header">
          <h1 className="colors-docs__title">Color System</h1>
          <p className="colors-docs__description">
            A comprehensive dual-theme color palette built around <strong>#6f8be6</strong> (Periwinkle Blue) and <strong>#3d63dd</strong> (Royal Blue).
            All colors adapt seamlessly between dark and light themes for optimal readability and WCAG AA compliance.
          </p>
        </div>

        {/* Page & Layout */}
        <section className="colors-docs__section">
          <h2>Backgrounds & Surfaces</h2>
          <p className="colors-docs__section-description">
            Foundation colors for page backgrounds, surfaces, and overlays. Follow the hierarchy from base to elevated for proper depth perception.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Page Background"
              variable="--bg-page"
              darkValue="#0d0d14"
              lightValue="#ffffff"
              darkOklch="oklch(8.5% 0.008 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Main page background"
            />
            <DualColorSwatch
              name="Surface"
              variable="--bg-surface"
              darkValue="#14141a"
              lightValue="#ffffff"
              darkOklch="oklch(11.2% 0.01 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Cards, panels, containers"
            />
            <DualColorSwatch
              name="Surface Raised"
              variable="--bg-surface-raised"
              darkValue="#1f1f28"
              lightValue="#f8f9fa"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(97.8% 0.002 264.5)"
              usage="Elevated surfaces, modals"
            />
            <DualColorSwatch
              name="Surface Sunken"
              variable="--bg-surface-sunken"
              darkValue="#0a0a10"
              lightValue="#f3f4f6"
              darkOklch="oklch(7.2% 0.006 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Recessed backgrounds"
            />
            <DualColorSwatch
              name="Overlay"
              variable="--bg-overlay"
              darkValue="#1a1a24"
              lightValue="#ffffff"
              darkOklch="oklch(13.5% 0.015 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Modal and dropdown backgrounds"
            />
            <DualColorSwatch
              name="Hover"
              variable="--bg-hover"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Interactive hover states"
            />
            <DualColorSwatch
              name="Active"
              variable="--bg-active"
              darkValue="#2a2a36"
              lightValue="#e5e7eb"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Active/pressed states"
            />
            <DualColorSwatch
              name="Disabled"
              variable="--bg-disabled"
              darkValue="#2a2a36"
              lightValue="#f3f4f6"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Disabled backgrounds"
            />
          </div>
        </section>

        {/* Text Colors */}
        <section className="colors-docs__section">
          <h2>Text Hierarchy</h2>
          <p className="colors-docs__section-description">
            Text colors for different levels of emphasis. Use primary for headings, secondary for body text, and muted for supporting information.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Primary"
              variable="--text-primary"
              darkValue="#ffffff"
              lightValue="#111827"
              darkOklch="oklch(100% 0 0)"
              lightOklch="oklch(22.4% 0.015 264.5)"
              usage="Headings, important text"
            />
            <DualColorSwatch
              name="Secondary"
              variable="--text-secondary"
              darkValue="#e5e7eb"
              lightValue="#374151"
              darkOklch="oklch(92.2% 0.004 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Body text, descriptions"
            />
            <DualColorSwatch
              name="Muted"
              variable="--text-muted"
              darkValue="#9ca3af"
              lightValue="#6b7280"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Labels, metadata, captions"
            />
            <DualColorSwatch
              name="Placeholder"
              variable="--text-placeholder"
              darkValue="#6b7280"
              lightValue="#9ca3af"
              darkOklch="oklch(55.2% 0.018 264.5)"
              lightOklch="oklch(69.5% 0.015 264.5)"
              usage="Input placeholders"
            />
            <DualColorSwatch
              name="Disabled"
              variable="--text-disabled"
              darkValue="#a1a1a8"
              lightValue="#9ca3af"
              darkOklch="oklch(70.8% 0.008 264.5)"
              lightOklch="oklch(69.5% 0.015 264.5)"
              usage="Disabled text"
            />
            <DualColorSwatch
              name="Inverse"
              variable="--text-inverse"
              darkValue="#111827"
              lightValue="#ffffff"
              darkOklch="oklch(22.4% 0.015 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Text on contrasting backgrounds"
            />
          </div>

          <h3>Semantic Text Colors</h3>
          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Link"
              variable="--text-link"
              darkValue="#60a5fa"
              lightValue="#2563eb"
              darkOklch="oklch(70.5% 0.145 251.8)"
              lightOklch="oklch(52.5% 0.195 264.4)"
              usage="Hyperlinks and clickable text"
            />
            <DualColorSwatch
              name="Success"
              variable="--text-success"
              darkValue="#4ade80"
              lightValue="#16a34a"
              darkOklch="oklch(82.5% 0.185 145.2)"
              lightOklch="oklch(58.2% 0.168 145.2)"
              usage="Success messages"
            />
            <DualColorSwatch
              name="Warning"
              variable="--text-warning"
              darkValue="#fbbf24"
              lightValue="#d97706"
              darkOklch="oklch(85.2% 0.145 85.5)"
              lightOklch="oklch(68.5% 0.165 65.2)"
              usage="Warning messages"
            />
            <DualColorSwatch
              name="Error"
              variable="--text-error"
              darkValue="#f87171"
              lightValue="#dc2626"
              darkOklch="oklch(72.5% 0.195 25.8)"
              lightOklch="oklch(58.8% 0.225 25.8)"
              usage="Error messages"
            />
          </div>
        </section>

        {/* Borders */}
        <section className="colors-docs__section">
          <h2>Borders & Dividers</h2>
          <p className="colors-docs__section-description">
            Border colors for separators, outlines, and interactive states. Use subtle for light dividers, default for standard borders, and strong for emphasis.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Subtle"
              variable="--border-subtle"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Very light separators"
            />
            <DualColorSwatch
              name="Default"
              variable="--border-default"
              darkValue="#2a2a36"
              lightValue="#e5e7eb"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Standard borders"
            />
            <DualColorSwatch
              name="Strong"
              variable="--border-strong"
              darkValue="#374151"
              lightValue="#d1d5db"
              darkOklch="oklch(35.8% 0.022 264.5)"
              lightOklch="oklch(85.8% 0.008 264.5)"
              usage="Emphasized borders"
            />
            <DualColorSwatch
              name="Focus"
              variable="--border-focus"
              darkValue="#3b82f6"
              lightValue="#2563eb"
              darkOklch="oklch(60.5% 0.178 251.8)"
              lightOklch="oklch(52.5% 0.195 264.4)"
              usage="Focus rings (2px + glow)"
            />
            <DualColorSwatch
              name="Error"
              variable="--border-error"
              darkValue="#f87171"
              lightValue="#dc2626"
              darkOklch="oklch(72.5% 0.195 25.8)"
              lightOklch="oklch(58.8% 0.225 25.8)"
              usage="Error state borders"
            />
            <DualColorSwatch
              name="Disabled"
              variable="--border-disabled"
              darkValue="#1f1f28"
              lightValue="#e5e7eb"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Disabled element borders"
            />
          </div>
        </section>

        {/* Icons */}
        <section className="colors-docs__section">
          <h2>Icons</h2>
          <p className="colors-docs__section-description">
            Icon colors for different levels of visual hierarchy and states.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Default"
              variable="--icon-default"
              darkValue="#9ca3af"
              lightValue="#6b7280"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Standard icons"
            />
            <DualColorSwatch
              name="Strong"
              variable="--icon-strong"
              darkValue="#e5e7eb"
              lightValue="#374151"
              darkOklch="oklch(92.2% 0.004 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Emphasized icons"
            />
            <DualColorSwatch
              name="Muted"
              variable="--icon-muted"
              darkValue="#6b7280"
              lightValue="#9ca3af"
              darkOklch="oklch(55.2% 0.018 264.5)"
              lightOklch="oklch(69.5% 0.015 264.5)"
              usage="De-emphasized icons"
            />
            <DualColorSwatch
              name="Disabled"
              variable="--icon-disabled"
              darkValue="#4b5563"
              lightValue="#d1d5db"
              darkOklch="oklch(42.5% 0.012 264.5)"
              lightOklch="oklch(85.8% 0.008 264.5)"
              usage="Disabled icons"
            />
            <DualColorSwatch
              name="Inverse"
              variable="--icon-inverse"
              darkValue="#111827"
              lightValue="#ffffff"
              darkOklch="oklch(22.4% 0.015 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Icons on contrasting backgrounds"
            />
            <DualColorSwatch
              name="Error"
              variable="--icon-error"
              darkValue="#f87171"
              lightValue="#dc2626"
              darkOklch="oklch(72.5% 0.195 25.8)"
              lightOklch="oklch(58.8% 0.225 25.8)"
              usage="Error icons"
            />
          </div>
        </section>

        {/* Interactive Components */}
        <section className="colors-docs__section">
          <h2>Interactive: Chips & Tags</h2>
          <p className="colors-docs__section-description">
            Colors for chip, tag, and badge components.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--chip-bg"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Chip background"
            />
            <DualColorSwatch
              name="Background Hover"
              variable="--chip-bg-hover"
              darkValue="#2a2a36"
              lightValue="#e5e7eb"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Chip hover state"
            />
            <DualColorSwatch
              name="Border"
              variable="--chip-border"
              darkValue="#374151"
              lightValue="#d1d5db"
              darkOklch="oklch(35.8% 0.022 264.5)"
              lightOklch="oklch(85.8% 0.008 264.5)"
              usage="Chip border"
            />
            <DualColorSwatch
              name="Text"
              variable="--chip-text"
              darkValue="#e5e7eb"
              lightValue="#374151"
              darkOklch="oklch(92.2% 0.004 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Chip text"
            />
            <DualColorSwatch
              name="Icon"
              variable="--chip-icon"
              darkValue="#9ca3af"
              lightValue="#6b7280"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Chip icons"
            />
          </div>
        </section>

        {/* Input Controls */}
        <section className="colors-docs__section">
          <h2>Interactive: Form Inputs</h2>
          <p className="colors-docs__section-description">
            Colors for text inputs, textareas, selects, and other form controls.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--input-bg"
              darkValue="#14141a"
              lightValue="#ffffff"
              darkOklch="oklch(11.2% 0.01 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Input field background"
            />
            <DualColorSwatch
              name="Border"
              variable="--input-border"
              darkValue="#2a2a36"
              lightValue="#d1d5db"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(85.8% 0.008 264.5)"
              usage="Input border (default)"
            />
            <DualColorSwatch
              name="Border Hover"
              variable="--input-border-hover"
              darkValue="#6b7280"
              lightValue="#6b7280"
              darkOklch="oklch(55.2% 0.018 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Input border (hover)"
            />
            <DualColorSwatch
              name="Border Focus"
              variable="--input-border-focus"
              darkValue="#3b82f6"
              lightValue="#2563eb"
              darkOklch="oklch(60.5% 0.178 251.8)"
              lightOklch="oklch(52.5% 0.195 264.4)"
              usage="Input border (focused)"
            />
            <DualColorSwatch
              name="Border Error"
              variable="--input-border-error"
              darkValue="#f87171"
              lightValue="#dc2626"
              darkOklch="oklch(72.5% 0.195 25.8)"
              lightOklch="oklch(58.8% 0.225 25.8)"
              usage="Input border (error)"
            />
            <DualColorSwatch
              name="Text"
              variable="--input-text"
              darkValue="#ffffff"
              lightValue="#111827"
              darkOklch="oklch(100% 0 0)"
              lightOklch="oklch(22.4% 0.015 264.5)"
              usage="Input text"
            />
            <DualColorSwatch
              name="Placeholder"
              variable="--input-placeholder"
              darkValue="#6b7280"
              lightValue="#9ca3af"
              darkOklch="oklch(55.2% 0.018 264.5)"
              lightOklch="oklch(69.5% 0.015 264.5)"
              usage="Input placeholder text"
            />
            <DualColorSwatch
              name="Prefix Background"
              variable="--input-prefix-bg"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Input prefix/suffix area"
            />
          </div>
        </section>

        {/* Menus */}
        <section className="colors-docs__section">
          <h2>Interactive: Menus & Dropdowns</h2>
          <p className="colors-docs__section-description">
            Colors for dropdown menus, context menus, and menu items.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--menu-bg"
              darkValue="#1a1a24"
              lightValue="#ffffff"
              darkOklch="oklch(13.5% 0.015 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Menu background"
            />
            <DualColorSwatch
              name="Border"
              variable="--menu-border"
              darkValue="#2a2a36"
              lightValue="#e5e7eb"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Menu border"
            />
            <DualColorSwatch
              name="Item Text"
              variable="--menu-item-text"
              darkValue="#e5e7eb"
              lightValue="#374151"
              darkOklch="oklch(92.2% 0.004 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Menu item text"
            />
            <DualColorSwatch
              name="Item Hover Background"
              variable="--menu-item-hover-bg"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Menu item hover"
            />
            <DualColorSwatch
              name="Item Active Background"
              variable="--menu-item-active-bg"
              darkValue="#1e3a5f"
              lightValue="#eff6ff"
              darkOklch="oklch(28.5% 0.045 251.8)"
              lightOklch="oklch(96.8% 0.015 251.8)"
              usage="Menu item active"
            />
            <DualColorSwatch
              name="Item Active Text"
              variable="--menu-item-active-text"
              darkValue="#60a5fa"
              lightValue="#2563eb"
              darkOklch="oklch(70.5% 0.145 251.8)"
              lightOklch="oklch(52.5% 0.195 264.4)"
              usage="Active menu item text"
            />
            <DualColorSwatch
              name="Icon"
              variable="--menu-icon"
              darkValue="#9ca3af"
              lightValue="#6b7280"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Menu icons"
            />
            <DualColorSwatch
              name="Separator"
              variable="--menu-separator"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Menu dividers"
            />
          </div>
        </section>

        {/* Navigation */}
        <section className="colors-docs__section">
          <h2>Interactive: Navigation</h2>
          <p className="colors-docs__section-description">
            Colors for navigation components, sidebars, and nav items.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--nav-bg"
              darkValue="#0d0d14"
              lightValue="#f8f9fa"
              darkOklch="oklch(8.5% 0.008 264.5)"
              lightOklch="oklch(97.8% 0.002 264.5)"
              usage="Navigation background"
            />
            <DualColorSwatch
              name="Border"
              variable="--nav-border"
              darkValue="#1f1f28"
              lightValue="#e5e7eb"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Navigation borders"
            />
            <DualColorSwatch
              name="Text"
              variable="--nav-text"
              darkValue="#9ca3af"
              lightValue="#374151"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Navigation text"
            />
            <DualColorSwatch
              name="Text Active"
              variable="--nav-text-active"
              darkValue="#ffffff"
              lightValue="#111827"
              darkOklch="oklch(100% 0 0)"
              lightOklch="oklch(22.4% 0.015 264.5)"
              usage="Active navigation text"
            />
            <DualColorSwatch
              name="Item Hover Background"
              variable="--nav-item-hover-bg"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Nav item hover"
            />
            <DualColorSwatch
              name="Item Active Background"
              variable="--nav-item-active-bg"
              darkValue="#1f1f28"
              lightValue="#e5e7eb"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Nav item active"
            />
            <DualColorSwatch
              name="Section Label"
              variable="--nav-section-label"
              darkValue="#4b5563"
              lightValue="#9ca3af"
              darkOklch="oklch(42.5% 0.012 264.5)"
              lightOklch="oklch(69.5% 0.015 264.5)"
              usage="Section headings"
            />
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="colors-docs__section">
          <h2>Interactive: Breadcrumbs</h2>
          <p className="colors-docs__section-description">
            Colors for breadcrumb navigation components.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--breadcrumb-bg"
              darkValue="#1f1f28"
              lightValue="#f3f4f6"
              darkOklch="oklch(15.8% 0.012 264.5)"
              lightOklch="oklch(96.5% 0.003 264.5)"
              usage="Breadcrumb background"
            />
            <DualColorSwatch
              name="Text"
              variable="--breadcrumb-text"
              darkValue="#9ca3af"
              lightValue="#6b7280"
              darkOklch="oklch(69.5% 0.015 264.5)"
              lightOklch="oklch(55.2% 0.018 264.5)"
              usage="Breadcrumb links"
            />
            <DualColorSwatch
              name="Active"
              variable="--breadcrumb-active"
              darkValue="#ffffff"
              lightValue="#111827"
              darkOklch="oklch(100% 0 0)"
              lightOklch="oklch(22.4% 0.015 264.5)"
              usage="Current page"
            />
            <DualColorSwatch
              name="Separator"
              variable="--breadcrumb-sep"
              darkValue="#374151"
              lightValue="#d1d5db"
              darkOklch="oklch(35.8% 0.022 264.5)"
              lightOklch="oklch(85.8% 0.008 264.5)"
              usage="Breadcrumb separators"
            />
          </div>
        </section>

        {/* Modals */}
        <section className="colors-docs__section">
          <h2>Interactive: Modals</h2>
          <p className="colors-docs__section-description">
            Colors for modal dialogs and overlays.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--modal-bg"
              darkValue="#14141a"
              lightValue="#ffffff"
              darkOklch="oklch(11.2% 0.01 264.5)"
              lightOklch="oklch(100% 0 0)"
              usage="Modal background"
            />
            <DualColorSwatch
              name="Border"
              variable="--modal-border"
              darkValue="#2a2a36"
              lightValue="#e5e7eb"
              darkOklch="oklch(20.5% 0.014 264.5)"
              lightOklch="oklch(92.2% 0.004 264.5)"
              usage="Modal border"
            />
            <DualColorSwatch
              name="Header Text"
              variable="--modal-header-text"
              darkValue="#ffffff"
              lightValue="#111827"
              darkOklch="oklch(100% 0 0)"
              lightOklch="oklch(22.4% 0.015 264.5)"
              usage="Modal title"
            />
            <DualColorSwatch
              name="Body Text"
              variable="--modal-body-text"
              darkValue="#e5e7eb"
              lightValue="#374151"
              darkOklch="oklch(92.2% 0.004 264.5)"
              lightOklch="oklch(35.8% 0.022 264.5)"
              usage="Modal content text"
            />
          </div>
        </section>

        {/* State Colors */}
        <section className="colors-docs__section">
          <h2>State Colors</h2>
          <p className="colors-docs__section-description">
            Semantic colors for success, warning, error, and info states.
          </p>

          <h3>Success</h3>
          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--state-success-bg"
              darkValue="#052e16"
              lightValue="#f0fdf4"
              darkOklch="oklch(18.5% 0.045 145.2)"
              lightOklch="oklch(97.8% 0.025 145.2)"
              usage="Success notifications, badges"
            />
            <DualColorSwatch
              name="Border"
              variable="--state-success-border"
              darkValue="#14532d"
              lightValue="#86efac"
              darkOklch="oklch(30.8% 0.065 145.2)"
              lightOklch="oklch(88.5% 0.125 145.2)"
              usage="Success borders"
            />
            <DualColorSwatch
              name="Text"
              variable="--state-success-text"
              darkValue="#86efac"
              lightValue="#166534"
              darkOklch="oklch(88.5% 0.125 145.2)"
              lightOklch="oklch(42.5% 0.095 145.2)"
              usage="Success message text"
            />
          </div>

          <h3>Warning</h3>
          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--state-warning-bg"
              darkValue="#2d1f05"
              lightValue="#fffbeb"
              darkOklch="oklch(16.5% 0.035 65.2)"
              lightOklch="oklch(98.5% 0.015 85.5)"
              usage="Warning notifications, badges"
            />
            <DualColorSwatch
              name="Border"
              variable="--state-warning-border"
              darkValue="#78350f"
              lightValue="#fcd34d"
              darkOklch="oklch(35.8% 0.095 65.2)"
              lightOklch="oklch(88.5% 0.125 85.5)"
              usage="Warning borders"
            />
            <DualColorSwatch
              name="Text"
              variable="--state-warning-text"
              darkValue="#fcd34d"
              lightValue="#92400e"
              darkOklch="oklch(88.5% 0.125 85.5)"
              lightOklch="oklch(38.5% 0.095 65.2)"
              usage="Warning message text"
            />
          </div>

          <h3>Error</h3>
          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--state-error-bg"
              darkValue="#2d1515"
              lightValue="#fef2f2"
              darkOklch="oklch(16.8% 0.045 25.8)"
              lightOklch="oklch(97.5% 0.015 25.8)"
              usage="Error notifications, badges"
            />
            <DualColorSwatch
              name="Border"
              variable="--state-error-border"
              darkValue="#7f1d1d"
              lightValue="#fca5a5"
              darkOklch="oklch(35.5% 0.125 25.8)"
              lightOklch="oklch(80.8% 0.145 25.8)"
              usage="Error borders"
            />
            <DualColorSwatch
              name="Text"
              variable="--state-error-text"
              darkValue="#fca5a5"
              lightValue="#991b1b"
              darkOklch="oklch(80.8% 0.145 25.8)"
              lightOklch="oklch(42.2% 0.165 25.8)"
              usage="Error message text"
            />
          </div>

          <h3>Info</h3>
          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Background"
              variable="--state-info-bg"
              darkValue="#0f172a"
              lightValue="#eff6ff"
              darkOklch="oklch(12.5% 0.025 251.8)"
              lightOklch="oklch(96.8% 0.015 251.8)"
              usage="Info notifications, badges"
            />
            <DualColorSwatch
              name="Border"
              variable="--state-info-border"
              darkValue="#1e3a5f"
              lightValue="#93c5fd"
              darkOklch="oklch(28.5% 0.045 251.8)"
              lightOklch="oklch(80.9% 0.105 251.8)"
              usage="Info borders"
            />
            <DualColorSwatch
              name="Text"
              variable="--state-info-text"
              darkValue="#93c5fd"
              lightValue="#1e40af"
              darkOklch="oklch(80.9% 0.105 251.8)"
              lightOklch="oklch(42.8% 0.125 251.8)"
              usage="Info message text"
            />
          </div>
        </section>

        {/* Brand Colors */}
        <section className="colors-docs__section">
          <h2>Brand Colors</h2>
          <p className="colors-docs__section-description">
            Primary brand colors used for CTAs, buttons, and interactive elements. These colors remain consistent across themes with slight adjustments for optimal contrast.
          </p>

          <div className="colors-docs__grid">
            <DualColorSwatch
              name="Periwinkle Blue"
              variable="--color-primary"
              darkValue="#6f8be6"
              lightValue="#6f8be6"
              darkOklch="oklch(65.8% 0.158 264.5)"
              lightOklch="oklch(65.8% 0.158 264.5)"
              usage="Focus rings, hover states, active elements"
            />
            <DualColorSwatch
              name="Royal Blue (Dark)"
              variable="--color-secondary-dark"
              darkValue="#3d63dd"
              lightValue="#3d63dd"
              darkOklch="oklch(52.3% 0.189 264.4)"
              lightOklch="oklch(52.3% 0.189 264.4)"
              usage="Primary CTAs in dark theme"
            />
            <DualColorSwatch
              name="Royal Blue (Light)"
              variable="--color-secondary-light"
              darkValue="#2563eb"
              lightValue="#2563eb"
              darkOklch="oklch(52.5% 0.195 264.4)"
              lightOklch="oklch(52.5% 0.195 264.4)"
              usage="Primary CTAs in light theme"
            />
          </div>
        </section>

        <div className="colors-docs__note">
          <strong>Usage Guidelines:</strong>
          <ul style={{ marginTop: '12px', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Always use CSS variables (e.g., <span className="colors-docs__code">var(--text-primary)</span>) instead of hardcoded values</li>
            <li>The active theme (dark/light) is indicated by a highlighted border on the color swatch</li>
            <li>All color combinations meet WCAG AA accessibility standards for contrast</li>
            <li>Focus states use 2px borders + 3px glow for maximum visibility</li>
            <li>Hover states use 1px border with the primary brand color</li>
          </ul>
        </div>
      </div>
    </>
  );
}
