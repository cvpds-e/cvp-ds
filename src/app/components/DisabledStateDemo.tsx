import React from 'react';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { TextInput } from './TextInput';

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

export function DisabledStateDemo() {
  return (
    <>
      <style>{`
        .disabled-demo {
          padding: 32px;
          max-width: 800px;
          font-family: var(--font-family);
          background-color: var(--background);
          color: var(--foreground);
        }

        .disabled-demo__section {
          margin-bottom: 32px;
        }

        .disabled-demo__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 16px;
        }

        .disabled-demo__item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .disabled-demo__label {
          font-size: var(--type-scale-s-size);
          font-weight: var(--type-scale-s-medium-weight);
          color: var(--foreground);
        }
      `}</style>

      <div className="disabled-demo">
        <h1 style={{ marginBottom: '24px' }}>Disabled State Consistency Demo</h1>
        <p style={{ 
          marginBottom: '32px', 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--type-scale-l-size)',
          lineHeight: 'var(--type-scale-l-line-height)'
        }}>
          All form components now have consistent disabled styling using the same design tokens from the Text Input component.
        </p>

        <div className="disabled-demo__section">
          <h2 style={{ marginBottom: '16px' }}>Normal State</h2>
          <div className="disabled-demo__grid">
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Text Input</label>
              <TextInput placeholder="Enter text..." />
            </div>
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Select</label>
              <Select 
                options={selectOptions}
                placeholder="Choose option..."
              />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Multi Select</label>
              <MultiSelect 
                options={selectOptions}
                placeholder="Choose multiple options..."
              />
            </div>
          </div>
        </div>

        <div className="disabled-demo__section">
          <h2 style={{ marginBottom: '16px' }}>Disabled State</h2>
          <div className="disabled-demo__grid">
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Text Input (Disabled)</label>
              <TextInput 
                placeholder="Disabled input..."
                value="Sample text"
                disabled
              />
            </div>
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Select (Disabled)</label>
              <Select 
                options={selectOptions}
                defaultValue="react"
                disabled
              />
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div className="disabled-demo__item">
              <label className="disabled-demo__label">Multi Select (Disabled)</label>
              <MultiSelect 
                options={selectOptions}
                defaultValue={['react', 'vue']}
                disabled
              />
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginBottom: '12px' }}>Design Token Consistency</h3>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            color: 'var(--muted-foreground)',
            fontSize: 'var(--type-scale-s-size)'
          }}>
            <li>Text Color (Disabled): <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>#4a4a4a</code> <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>--input-disabled-text</code></li>
            <li>Background (Disabled): <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>#d0d0d3</code> <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>--input-disabled-bg</code></li>
            <li>Border (Disabled): <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>#bbb</code> <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>--input-disabled-border</code></li>
            <li>Gap in Multi Select Examples: <code style={{ 
              backgroundColor: 'var(--muted)', 
              padding: '2px 4px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px'
            }}>6px</code></li>
          </ul>
        </div>
      </div>
    </>
  );
}