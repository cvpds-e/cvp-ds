import React, { useState, useEffect } from 'react';
import { DesignSystemNav } from './components/DesignSystemNav';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ComponentsOverview } from './components/ComponentsOverview';
import { ComponentDocumentation } from './components/ComponentDocumentation';
import { SecondaryButtonDocumentation } from './components/SecondaryButtonDocumentation';
import { OutlineButtonDocumentation } from './components/OutlineButtonDocumentation';
import { IconButtonDocumentation } from './components/IconButtonDocumentation';
import { IconSmallButtonDocumentation } from './components/IconSmallButtonDocumentation';
import { IconButtonWithTextDocumentation } from './components/IconButtonWithTextDocumentation';
import { TextButtonDocumentation } from './components/TextButtonDocumentation';
import { TextInputDocumentation } from './components/TextInputDocumentation';
import { NumberInputDocumentation } from './components/NumberInputDocumentation';
import { TextAreaDocumentation } from './components/TextAreaDocumentation';
import { MiscInputDocumentation } from './components/MiscInputDocumentation';
import { CheckboxDocumentation } from './components/CheckboxDocumentation';
import { ToggleDocumentation } from './components/ToggleDocumentation';
import { FilterDocumentation } from './components/FilterDocumentation';
import { QueryControlsDocumentation } from './components/QueryControlsDocumentation';
import { DatePickerDocumentation } from './components/DatePickerDocumentation';
import { FilterGroupDocumentation } from './components/FilterGroupDocumentation';
import { TreeDocumentation } from './components/TreeDocumentation';
import { TableDocumentation } from './components/TableDocumentation';
import { LayoutDocumentation } from './components/LayoutDocumentation';
import { ModalDocumentation } from './components/ModalDocumentation';
import { ContentBrowserModalDocumentation } from './components/ContentBrowserModalDocumentation';
import { SegmentedDocumentation } from './components/SegmentedDocumentation';
import { AccordionDocumentation } from './components/AccordionDocumentation';
import { MultiSelectDocumentation } from './components/MultiSelectDocumentation';
import { PillDocumentation } from './components/PillDocumentation';
import { PaginationDocumentation } from './components/PaginationDocumentation';
import { SelectDocumentation } from './components/SelectDocumentation';
import { TagFilterDocumentation } from './components/TagFilterDocumentation';
import { ToastDocumentation } from './components/ToastDocumentation';
import { SegmentQueryConfigurationDocumentation } from './components/SegmentQueryConfigurationDocumentation';
import { RailContentGalleryDocumentation } from './components/RailContentGalleryDocumentation';
import { BreadcrumbsDocumentation } from './components/BreadcrumbsDocumentation';
import { HeaderNavigationDocumentation } from './components/HeaderNavigationDocumentation';
import { TabsDocumentation } from './components/TabsDocumentation';
import { DisabledStateDemo } from './components/DisabledStateDemo';
import { LoginSignUpDocumentation } from './components/LoginSignUpDocumentation';
import { ColorFoundationPreview } from './components/ColorFoundationPreview';
import { TypographyFoundationPreview } from './components/TypographyFoundationPreview';
import { SpacingFoundationPreview } from './components/SpacingFoundationPreview';
import { RadiusFoundationPreview } from './components/RadiusFoundationPreview';
import { BorderFoundationPreview } from './components/BorderFoundationPreview';
import { ElevationFoundationPreview } from './components/ElevationFoundationPreview';
import { LayoutFoundationPreview } from './components/LayoutFoundationPreview';
import { PageSideNavDocumentation } from './components/PageSideNavDocumentation';
import { RailDetailsDocumentation } from './components/RailDetailsDocumentation';
import { RailDetails } from './components/RailDetails';
import { RailsList } from './components/RailsList';
import { RailsListDocumentation } from './components/RailsListDocumentation';
import { NotificationBannerDocumentation } from './components/NotificationBannerDocumentation';
import { SkeletonDocumentation } from './components/SkeletonDocumentation';
import { LoadingSpinnerDocumentation } from './components/LoadingSpinnerDocumentation';
import { BadgeDocumentation } from './components/BadgeDocumentation';
import { StatusDocumentation } from './components/StatusDocumentation';
import { AccessibilityAuditProbe } from './components/AccessibilityAuditProbe';
import { AccessibilityDocumentation } from './components/AccessibilityDocumentation';
import { TokenArchitectureDocumentation } from './components/TokenArchitectureDocumentation';
import { TooltipDocumentation } from './components/TooltipDocumentation';
import { WorkspaceLayoutDocumentation } from './components/WorkspaceLayoutDocumentation';
import cvpLogoWhite from './imports/CloudVideoPlatform_Logo_Horizontal_MonoWhite_RGB.svg';
import cvpLogoBlack from './imports/CloudVideoPlatform_Logo_Horizontal_MonoBlack_RGB.svg';
import './App.css';

function OverviewSection() {
  return (
    <>
      <style>{`
        .overview-section {
          /* Design System Tokens */
          --overview-section-padding: 48px 0;
          --overview-section-font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          /* Component Styles */
          padding: var(--overview-section-padding);
          font-family: var(--overview-section-font-family);
          box-sizing: border-box;
        }

        .overview-section__title {
          /* Design System Tokens */
          --overview-title-margin-bottom: 24px;
          --overview-title-color: var(--foreground);
          --overview-title-font-size: 32px;
          --overview-title-font-weight: 700;
          --overview-title-line-height: 40px;

          /* Component Styles */
          margin-bottom: var(--overview-title-margin-bottom);
          color: var(--overview-title-color);
          font-size: var(--overview-title-font-size);
          font-weight: var(--overview-title-font-weight);
          line-height: var(--overview-title-line-height);
        }

        .overview-section__description {
          /* Design System Tokens */
          --overview-description-font-size: var(--type-scale-l-size);
          --overview-description-line-height: var(--type-scale-l-line-height);
          --overview-description-color: var(--muted-foreground);
          --overview-description-margin-bottom: 32px;

          /* Component Styles */
          font-size: var(--overview-description-font-size);
          line-height: var(--overview-description-line-height);
          color: var(--overview-description-color);
          margin-bottom: var(--overview-description-margin-bottom);
        }

        .overview-section__section-title {
          /* Design System Tokens */
          --section-title-margin-bottom: 24px;
          --section-title-color: var(--foreground);
          --section-title-font-size: 24px;
          --section-title-font-weight: 600;
          --section-title-line-height: 32px;

          /* Component Styles */
          margin-bottom: var(--section-title-margin-bottom);
          color: var(--section-title-color);
          font-size: var(--section-title-font-size);
          font-weight: var(--section-title-font-weight);
          line-height: var(--section-title-line-height);
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

        /* Dark theme - use black text for better contrast */
        :root:not([data-theme="light"]) .principle__number {
          color: #000000;
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

        /* Dark theme - use black text for better contrast */
        :root:not([data-theme="light"]) .audience-tag {
          color: #000000;
        }

        /* CVP Logo Styles */
        .cvp-logo-container {
          margin-bottom: 14px;
          position: relative;
          left: -3px;
          width: 384px;
          height: 44px;
          overflow: hidden;
        }

        .cvp-logo {
          /* The supplied horizontal artwork includes a generous export artboard.
             Crop that artboard without altering the source logo. */
          display: block;
          width: 368px;
          max-width: none;
          height: auto;
          margin: -82px 0 0 -34px;
          opacity: 0.9;
        }

        /* Theme-aware logo visibility */
        .cvp-logo--dark {
          display: block;
        }

        .cvp-logo--light {
          display: none;
        }

        /* Light theme overrides */
        :root[data-theme="light"] .cvp-logo--dark {
          display: none;
        }

        :root[data-theme="light"] .cvp-logo--light {
          display: block;
        }
      `}</style>

      <div className="overview-section">
        <div className="cvp-logo-container">
          {/* White logo for dark theme */}
          <img 
            src={cvpLogoWhite} 
            alt="Cloud Video Platform" 
            className="cvp-logo cvp-logo--dark"
          />
          {/* Black logo for light theme */}
          <img 
            src={cvpLogoBlack} 
            alt="Cloud Video Platform" 
            className="cvp-logo cvp-logo--light"
          />
        </div>
        
        <h1 className="overview-section__title">CVP Design System</h1>
        <p className="overview-section__description">
          A shared foundation of accessible components, design tokens, and interaction patterns for building consistent, efficient editorial and operator workflows across Cloud Video Platform.
        </p>

        {/* Design Principles */}
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
              <span className="audience-tag">Broadcasters</span>
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
      </div>
    </>
  );
}

export default function App() {
  const auditEnabled = new URLSearchParams(window.location.search).get('audit') === '1';
  // Initialize state with URL query parameter if present, otherwise default to 'overview'
  const [activeSection, setActiveSection] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    return page || 'overview';
  });

  useEffect(() => {
    if (activeSection !== 'rails-list-full' && activeSection !== 'rail-details-full') return;
    const theme = new URLSearchParams(window.location.search).get('theme');
    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.toggleAttribute('data-theme', resolvedTheme === 'light');
    document.body.toggleAttribute('data-theme', resolvedTheme === 'light');
  }, [activeSection]);

  // Listen for URL changes (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      setActiveSection(page || 'overview');
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle navigation item clicks
  const handleNavClick = (item: string) => {
    setActiveSection(item);
    // Update URL with query parameter
    const newUrl = item === 'overview' 
      ? window.location.pathname 
      : `${window.location.pathname}?page=${item}`;
    window.history.pushState(null, '', newUrl);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'colors':
        return <ColorFoundationPreview />;
      case 'typography':
        return <TypographyFoundationPreview />;
      case 'spacing':
        return <SpacingFoundationPreview />;
      case 'radius':
        return <RadiusFoundationPreview />;
      case 'border':
        return <BorderFoundationPreview />;
      case 'elevation':
        return <ElevationFoundationPreview />;
      case 'layout-foundation':
        return <LayoutFoundationPreview />;
      case 'accessibility':
        return <AccessibilityDocumentation />;
      case 'token-architecture':
        return <TokenArchitectureDocumentation />;
      case 'components':
        return <ComponentsOverview />;
      case 'primary-button':
        return <ComponentDocumentation activeComponent="primary-button" />;
      case 'secondary-button':
        return <SecondaryButtonDocumentation />;
      case 'outline-button':
        return <OutlineButtonDocumentation />;
      case 'icon-button':
        return <IconButtonDocumentation />;
      case 'icon-small-button':
        return <IconSmallButtonDocumentation />;
      case 'icon-button-with-text':
        return <IconButtonWithTextDocumentation />;
      case 'text-button':
        return <TextButtonDocumentation />;
      case 'text-input':
        return <TextInputDocumentation />;
      case 'number-input':
        return <NumberInputDocumentation />;
      case 'text-area':
        return <TextAreaDocumentation />;
      case 'misc-input':
        return <MiscInputDocumentation />;
      case 'checkbox':
        return <CheckboxDocumentation />;
      case 'toggle':
        return <ToggleDocumentation />;
      case 'filter':
        return <FilterDocumentation />;
      case 'query-controls':
        return <QueryControlsDocumentation />;
      case 'date-picker':
        return <DatePickerDocumentation />;
      case 'filter-group':
        return <FilterGroupDocumentation />;
      case 'breadcrumbs':
        return <BreadcrumbsDocumentation />;
      case 'header-navigation':
        return <HeaderNavigationDocumentation />;
      case 'tabs':
        return <TabsDocumentation />;
      case 'tree':
        return <TreeDocumentation />;
      case 'table':
        return <TableDocumentation />;
      case 'layout':
        return <LayoutDocumentation />;
      case 'modal':
        return <ModalDocumentation />;
      case 'content-browser-modal':
        return <ContentBrowserModalDocumentation />;
      case 'tooltip':
        return <TooltipDocumentation />;
      case 'segmented':
        return <SegmentedDocumentation />;
      case 'accordion':
        return <AccordionDocumentation />;
      case 'select':
        return <SelectDocumentation />;
      case 'multi-select':
        return <MultiSelectDocumentation />;
      case 'pill':
        return <PillDocumentation />;
      case 'pagination':
        return <PaginationDocumentation />;
      case 'tag-filter':
        return <TagFilterDocumentation />;
      case 'toast':
        return <ToastDocumentation />;
      case 'skeleton':
        return <SkeletonDocumentation />;
      case 'loading-spinner':
        return <LoadingSpinnerDocumentation />;
      case 'badge':
        return <BadgeDocumentation />;
      case 'status':
        return <StatusDocumentation />;
      case 'notification-banner':
        return <NotificationBannerDocumentation />;
      case 'segment-query-config':
        return <SegmentQueryConfigurationDocumentation />;
      case 'rail-content-gallery':
        return <RailContentGalleryDocumentation />;
      case 'workspace-layout':
        return <WorkspaceLayoutDocumentation />;
      case 'login-signup':
        return <LoginSignUpDocumentation />;
      case 'page-side-nav':
        return <PageSideNavDocumentation />;
      case 'rail-details':
        return <RailDetailsDocumentation />;
      case 'rails-list':
        return <RailsListDocumentation />;
      case 'rails-list-full':
        return null; // handled below as full-page
      case 'rail-details-full':
        return null; // handled below as full-page
      default:
        return <OverviewSection />;
    }
  };

  return (
    <>
      {activeSection === 'rail-details-full' ? (
        <RailDetails initiallyEmpty={new URLSearchParams(window.location.search).get('empty') === '1'} />
      ) : activeSection === 'rails-list-full' ? (
        <RailsList />
      ) : (
        <div className="app">
          <DesignSystemNav
            activeItem={activeSection}
            onItemClick={handleNavClick}
          />
          <ThemeSwitcher />
          <main className="app__main">
            {renderContent()}
          </main>
        </div>
      )}
      {auditEnabled && <AccessibilityAuditProbe />}
    </>
  );
}
