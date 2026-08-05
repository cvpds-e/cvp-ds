import React from 'react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { OutlineButton } from './OutlineButton';
import { IconButton } from './IconButton';
import { IconSmallButton } from './IconSmallButton';
import { TextInput } from './TextInput';
import { MiscInput } from './MiscInput';
import { Checkbox } from './Checkbox';
import { Modal } from './Modal';
import { Tree } from './Tree';
import { Table } from './Table';
import { Layout } from './Layout';
import { Segmented } from './Segmented';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { TagFilter } from './TagFilter';
import { Toast, ToastProvider, useToast } from './Toast';
import { Accordion } from './Accordion';

function ToastPreview() {
  const { addToast } = useToast();
  
  const showPreviewToast = () => {
    addToast({
      variant: 'success',
      title: 'Preview Toast',
      description: 'This is a preview of the toast component.',
      duration: 3000,
    });
  };

  return (
    <div style={{ 
      background: 'var(--muted)', 
      border: '1px solid var(--border-default)', 
      borderRadius: '4px',
      padding: '12px 16px',
      fontSize: 'var(--type-scale-s-size)',
      color: 'var(--foreground)',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      textAlign: 'center'
    }}
    onClick={showPreviewToast}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--accent)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'var(--muted)';
    }}
    >
      Click to show toast
    </div>
  );
}

export function ComponentsOverview() {
  return (
    <>
      <style>{`
        .components-overview {
          padding: 32px;
          max-width: 1200px;
          font-family: "Inter", sans-serif;
          box-sizing: border-box;
        }

        .header {
          margin-bottom: 48px;
        }

        .header h1 {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--foreground);
          margin: 0 0 12px 0;
          line-height: var(--text-2xl--line-height);
        }

        .header-description {
          font-size: var(--type-scale-l-size);
          line-height: var(--type-scale-l-line-height);
          color: var(--muted-foreground);
          margin: 0;
          max-width: 800px;
        }

        /* Design Principles Section */
        .design-principles {
          margin-bottom: 64px;
          padding: 32px;
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
        }

        .design-principles__header {
          margin-bottom: 32px;
        }

        .design-principles__title {
          font-size: 24px;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .design-principles__subtitle {
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--muted-foreground);
          margin: 0;
        }

        .design-principles__grid {
          display: grid;
          gap: 28px;
        }

        .principle {
          padding: 24px;
          background: var(--muted);
          border-radius: 6px;
          border-left: 3px solid var(--primary);
          transition: all 0.2s ease;
        }

        .principle:hover {
          background: var(--accent);
          border-left-color: var(--chart-1);
        }

        .principle__header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }

        .principle__number {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          background: var(--primary);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
        }

        .principle__title {
          font-size: 16px;
          font-weight: 600;
          color: var(--foreground);
          margin: 0;
          line-height: 1.4;
          padding-top: 2px;
        }

        .principle__description {
          font-size: var(--type-scale-m-size);
          line-height: 1.6;
          color: var(--foreground);
          margin: 0 0 16px 0;
          padding-left: 40px;
        }

        .principle__practice {
          padding: 12px 16px;
          background: var(--card);
          border-radius: 4px;
          margin-left: 40px;
          border-left: 2px solid var(--border-default);
        }

        .principle__practice-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--muted-foreground);
          margin: 0 0 6px 0;
        }

        .principle__practice-text {
          font-size: var(--type-scale-s-size);
          line-height: 1.5;
          color: var(--foreground);
          margin: 0;
        }

        .audience-note {
          margin-top: 24px;
          padding: 16px;
          background: var(--card);
          border-radius: 6px;
          border: 1px solid var(--border-default);
        }

        .audience-note__title {
          font-size: var(--type-scale-s-size);
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 8px 0;
        }

        .audience-note__content {
          font-size: var(--type-scale-s-size);
          line-height: 1.5;
          color: var(--muted-foreground);
          margin: 0;
        }

        .audience-tag {
          display: inline-block;
          padding: 2px 8px;
          background: var(--primary);
          color: #ffffff;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 500;
          margin-right: 6px;
        }

        /* Component Section Header */
        .components-section-header {
          margin-bottom: 32px;
        }

        .components-section-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 8px 0;
        }

        .components-section-description {
          font-size: var(--type-scale-m-size);
          line-height: var(--type-scale-m-line-height);
          color: var(--muted-foreground);
          margin: 0;
        }

        .components-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .component-card {
          background: var(--card);
          border: 1px solid var(--border-default);
          border-radius: 8px;
          padding: 24px;
          transition: border-color 0.2s ease;
        }

        .component-card:hover {
          border-color: var(--primary);
        }

        .component-header {
          margin-bottom: 16px;
        }

        .component-title {
          font-size: var(--type-scale-l-size);
          font-weight: var(--font-weight-medium);
          color: var(--foreground);
          margin: 0;
        }

        .component-preview {
          background: var(--muted);
          border: 1px solid var(--border-default);
          border-radius: 6px;
          padding: 20px;
          margin: 16px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .component-link {
          color: var(--primary);
          text-decoration: none;
          font-size: var(--type-scale-s-size);
          font-weight: var(--font-weight-medium);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }

        .component-link:hover {
          color: var(--chart-1);
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .component-link:hover .arrow-icon {
          transform: translateX(2px);
        }

        /* Collection Tag Styles */
        .table-collection-tag {
          font-family: var(--collection-tag-font-family);
          font-size: var(--collection-tag-font-size);
          font-weight: var(--collection-tag-font-weight);
          line-height: var(--collection-tag-line-height);
          letter-spacing: var(--collection-tag-letter-spacing);
          color: var(--collection-tag-text-color);
          background-color: var(--collection-tag-bg-color);
          border: var(--collection-tag-border);
          border-radius: var(--collection-tag-border-radius);
          padding: var(--collection-tag-padding);
          display: inline-block;
        }
      `}</style>

      <div className="components-overview">
        <div className="header">
          <h1>Components</h1>
          <p className="header-description">Explore the suite of components designed to enhance your application's user interface and experience.</p>
        </div>

        <div className="design-principles">
          <div className="design-principles__header">
            <h2 className="design-principles__title">Design Principles</h2>
            <p className="design-principles__subtitle">
              Our design system serves broadcast and pay-TV/OTT operators managing complex workflows. These principles guide every component, pattern, and interaction to support expert users working with dense, mission-critical information.
            </p>
          </div>

          <div className="audience-note" style={{ marginTop: 0, marginBottom: '32px' }}>
            <p className="audience-note__title">Primary Audiences</p>
            <p className="audience-note__content">
              <span className="audience-tag">Broadcast Operators</span>
              Managing content, EPG, rails, and scheduling
              <br/>
              <span className="audience-tag" style={{ marginTop: '8px' }}>Pay-TV/OTT Operators</span>
              Configuring content experiences and personalization
            </p>
          </div>

          <div className="design-principles__grid">
            {/* Principle 1: Operator-First Clarity */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">1</div>
                <h3 className="principle__title">Operator-First Clarity</h3>
              </div>
              <p className="principle__description">
                Design for expert users who need to see, scan, and act on dense information quickly. Prioritize information density over whitespace. Optimize for speed and precision, not simplicity.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  Tables show 20+ rows by default. Forms expose all relevant fields upfront. Dashboards pack multiple data views into a single screen without scrolling. Labels are short and technically precise.
                </p>
              </div>
            </div>

            {/* Principle 2: Progressive Disclosure */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">2</div>
                <h3 className="principle__title">Progressive Disclosure</h3>
              </div>
              <p className="principle__description">
                Surface defaults and common configurations first. Expose advanced options, edge cases, and overrides only when operators need them. Don't hide power—make it discoverable and accessible on demand.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  Rail configuration starts with essential fields (title, content query). Advanced settings like scheduling rules, geo-restrictions, and A/B test variants are tucked into collapsible sections or separate tabs. All options remain one click away.
                </p>
              </div>
            </div>

            {/* Principle 3: Agent-Assisted Flows */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">3</div>
                <h3 className="principle__title">Agent-Assisted Flows</h3>
              </div>
              <p className="principle__description">
                Embed AI and automation directly into workflows as helpful suggestions, not separate tools. Humans retain full control and override capability. Assistive intelligence accelerates work without replacing decision-making.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  Content tagging suggests metadata as operators type. Scheduling tools recommend optimal time slots based on viewership patterns. EPG builders auto-populate gaps with relevant content. Every suggestion can be accepted, edited, or ignored inline.
                </p>
              </div>
            </div>

            {/* Principle 4: Consistent Information Hierarchy */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">4</div>
                <h3 className="principle__title">Consistent Information Hierarchy</h3>
              </div>
              <p className="principle__description">
                Use predictable layouts across different surfaces and workflow types. Operators should instantly recognize where to find actions, filters, data, and status indicators—no matter which tool they're in.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  All content management screens follow the same pattern: filters top-left, actions top-right, primary data table center, detail panel right side. Status indicators always appear in the same position. Navigation structure mirrors mental models for broadcast and OTT workflows.
                </p>
              </div>
            </div>

            {/* Principle 5: Token-Driven Consistency */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">5</div>
                <h3 className="principle__title">Token-Driven Consistency</h3>
              </div>
              <p className="principle__description">
                Every visual decision—color, spacing, typography, border radius—is defined once in design tokens and applied systematically. This ensures visual coherence, simplifies maintenance, and enables effortless theming.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  All components reference centralized tokens for colors (--primary, --surface-raised), spacing (--spacing-4, --spacing-8), and type scales (--type-scale-m-size). Changing a single token updates hundreds of components instantly. Teams implement features without making ad-hoc style decisions.
                </p>
              </div>
            </div>

            {/* Principle 6: Contextual Guidance */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">6</div>
                <h3 className="principle__title">Contextual Guidance</h3>
              </div>
              <p className="principle__description">
                Provide just-in-time help and validation where operators need it. Reduce cognitive load by explaining impacts, constraints, and dependencies inline rather than forcing users to consult external documentation.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  Form fields show helper text explaining technical constraints ("Max 200 chars, used in EPG listings"). Validation errors appear inline with specific fixes ("This time slot conflicts with 'Live Sports' on Main Channel—choose a different time or channel"). Tooltips clarify broadcast-specific terms on hover.
                </p>
              </div>
            </div>

            {/* Principle 7: Resilient Interactions */}
            <div className="principle">
              <div className="principle__header">
                <div className="principle__number">7</div>
                <h3 className="principle__title">Resilient Interactions</h3>
              </div>
              <p className="principle__description">
                Design for real-world operational conditions: bulk actions, error recovery, network instability, and concurrent editing. Systems should prevent mistakes proactively and support graceful recovery when things go wrong.
              </p>
              <div className="principle__practice">
                <p className="principle__practice-label">In Practice</p>
                <p className="principle__practice-text">
                  Bulk operations show progress and allow partial rollback. Auto-save prevents data loss during network drops. Confirmation dialogs clearly state impact ("This will remove 47 episodes from 3 active rails"). Operators can undo recent changes without contacting support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="components-section-header">
          <h2 className="components-section-title">Component Library</h2>
          <p className="components-section-description">A comprehensive collection of reusable components to build your application.</p>
        </div>

        <div className="components-grid">
          {/* Primary Button */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Primary Button</h3>
            </div>
            <div className="component-preview">
              <PrimaryButton>Primary Action</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
            </div>
            <a href="?page=primary-button" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Secondary Button */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Secondary Button</h3>
            </div>
            <div className="component-preview">
              <SecondaryButton>Secondary Action</SecondaryButton>
              <SecondaryButton disabled>Disabled</SecondaryButton>
            </div>
            <a href="?page=secondary-button" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Outline Button */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Outline Button</h3>
            </div>
            <div className="component-preview">
              <OutlineButton>Tertiary Action</OutlineButton>
              <OutlineButton disabled>Disabled</OutlineButton>
            </div>
            <a href="?page=outline-button" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Icon Button */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Icon Button</h3>
            </div>
            <div className="component-preview">
              <IconButton aria-label="Settings">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
              </IconButton>
              <IconButton variant="danger" aria-label="Delete">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                </svg>
              </IconButton>
            </div>
            <a href="?page=icon-button" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Icon Small Button */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Icon Small Button</h3>
            </div>
            <div className="component-preview">
              <IconSmallButton aria-label="Edit">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </IconSmallButton>
              <IconSmallButton variant="danger" aria-label="Delete">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                </svg>
              </IconSmallButton>
            </div>
            <a href="?page=icon-small-button" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Text Input */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Text Input</h3>
            </div>
            <div className="component-preview">
              <TextInput placeholder="Enter text..." style={{ maxWidth: '200px' }} />
            </div>
            <a href="?page=text-input" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Misc Input */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Misc Input</h3>
            </div>
            <div className="component-preview">
              <MiscInput 
                placeholder="Enter text..." 
                maxLength={25}
                showCharacterCount
                style={{ maxWidth: '200px' }}
                readOnly
              />
            </div>
            <a href="?page=misc-input" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Checkbox */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Checkbox</h3>
            </div>
            <div className="component-preview">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <Checkbox id="checked-preview" label="Checked" defaultChecked={true} />
                <Checkbox id="indeterminate-preview" label="Indeterminate" defaultChecked="indeterminate" />
                <Checkbox id="unchecked-preview" label="Unchecked" />
                <Checkbox id="disabled-preview" label="Disabled" disabled />
              </div>
            </div>
            <a href="?page=checkbox" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Modal */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Modal</h3>
            </div>
            <div className="component-preview">
              <div style={{
                background: 'var(--card)',
                border: '1px solid var(--border-default)',
                borderRadius: '0.2rem',
                padding: '12px 16px',
                fontSize: 'var(--type-scale-s-size)',
                color: 'var(--muted-foreground)'
              }}>
                Modal Preview
              </div>
            </div>
            <a href="?page=modal" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Tree */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Tree</h3>
            </div>
            <div className="component-preview">
              <Tree 
                data={[
                  {
                    id: 'preview',
                    name: 'Preview',
                    children: [
                      { id: 'item1', name: 'Item 1' },
                      { id: 'item2', name: 'Item 2' }
                    ]
                  }
                ]}
                style={{ fontSize: 'var(--type-scale-s-size)', maxWidth: '150px' }}
              />
            </div>
            <a href="?page=tree" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Table */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Table</h3>
            </div>
            <div className="component-preview">
              <Table
                columns={[
                  { id: 'name', label: 'Name', width: '120px' },
                  { id: 'collection', label: 'Collection', width: '100px' }
                ]}
                data={[
                  { id: '1', name: 'Item 1', collection: 'HOME' },
                  { id: '2', name: 'Item 2', collection: 'FEED' }
                ]}
                height="120px"
                showSettings={false}
                showPagination={false}
                sortable={true}
                renderCell={(columnId, value) => {
                  if (columnId === 'collection') {
                    return (
                      <span className="table-collection-tag">
                        {value}
                      </span>
                    );
                  }
                  return value;
                }}
              />
            </div>
            <a href="?page=table" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Layout */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Layout</h3>
            </div>
            <div className="component-preview">
              <Layout
                leftPanel={
                  <div style={{ 
                    padding: '8px', 
                    fontSize: 'var(--type-scale-xs-size)', 
                    color: 'var(--muted-foreground)' 
                  }}>
                    Navigation
                  </div>
                }
                rightPanel={
                  <div style={{ 
                    padding: '8px', 
                    fontSize: 'var(--type-scale-xs-size)', 
                    color: 'var(--muted-foreground)' 
                  }}>
                    Content
                  </div>
                }
                leftPanelHeader={{ title: 'Left Panel' }}
                rightPanelHeader={{ title: 'Right Panel' }}
                minHeight="80px"
              />
            </div>
            <a href="?page=layout" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Segmented */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Segmented</h3>
            </div>
            <div className="component-preview">
              <Segmented
                options={[
                  { value: 'first', label: 'First' },
                  { value: 'second', label: 'Second' },
                  { value: 'third', label: 'Third' }
                ]}
                defaultValue="first"
                size="small"
              />
            </div>
            <a href="?page=segmented" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Select */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Select</h3>
            </div>
            <div className="component-preview">
              <div style={{ width: '100%', maxWidth: '250px' }}>
                <Select
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue.js' },
                    { value: 'angular', label: 'Angular' }
                  ]}
                  defaultValue="react"
                  placeholder="Select framework..."
                />
              </div>
            </div>
            <a href="?page=select" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Multi Select */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Multi Select</h3>
            </div>
            <div className="component-preview">
              <div style={{ width: '100%', maxWidth: '250px' }}>
                <MultiSelect
                  options={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue.js' },
                    { value: 'angular', label: 'Angular' }
                  ]}
                  defaultValue={['react']}
                  placeholder="Select frameworks..."
                />
              </div>
            </div>
            <a href="?page=multi-select" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Tag Filter */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Tag Filter</h3>
            </div>
            <div className="component-preview">
              <div style={{ width: '100%', maxWidth: '280px' }}>
                <TagFilter
                  sections={[
                    {
                      id: 'formats',
                      title: 'Video Formats',
                      options: [
                        { id: '4k', label: '4K UHD' },
                        { id: '1080p', label: '1080p HD' },
                        { id: '720p', label: '720p HD' }
                      ]
                    }
                  ]}
                  selectedOptions={['4k']}
                />
              </div>
            </div>
            <a href="?page=tag-filter" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Toast */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Toast</h3>
            </div>
            <div className="component-preview">
              <ToastProvider>
                <ToastPreview />
              </ToastProvider>
            </div>
            <a href="?page=toast" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Accordion */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Accordion</h3>
            </div>
            <div className="component-preview">
              <div style={{ width: '100%', maxWidth: '250px' }}>
                <Accordion
                  items={[
                    {
                      id: 'base',
                      title: 'Base',
                      content: <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>Base configuration</div>
                    },
                    {
                      id: 'content',
                      title: 'Content Query',
                      content: <div style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>Query settings</div>
                    }
                  ]}
                  type="single"
                  defaultExpanded={['content']}
                />
              </div>
            </div>
            <a href="?page=accordion" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Tokens */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Design Tokens</h3>
            </div>
            <div className="component-preview">
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                <div style={{ width: '12px', height: '12px', background: 'var(--chart-1)', borderRadius: '2px' }}></div>
                <div style={{ width: '12px', height: '12px', background: 'var(--chart-2)', borderRadius: '2px' }}></div>
                <span style={{ fontSize: 'var(--type-scale-s-size)', color: 'var(--muted-foreground)' }}>Tokens</span>
              </div>
            </div>
            <a href="?page=tokens" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>

          {/* Login / Sign Up */}
          <div className="component-card">
            <div className="component-header">
              <h3 className="component-title">Login / Sign Up</h3>
            </div>
            <div className="component-preview">
              <div style={{
                backgroundImage: 'linear-gradient(to right, #182848, #4b6cb7)',
                border: '1px solid #2c3250',
                borderRadius: '4px',
                padding: '16px 24px',
                fontSize: 'var(--type-scale-s-size)',
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                Authentication Page
              </div>
            </div>
            <a href="#login-signup" className="component-link">
              View Documentation
              <span className="arrow-icon">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
