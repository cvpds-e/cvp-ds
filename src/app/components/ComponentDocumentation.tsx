import React from 'react';
import { PrimaryButtonDocumentation } from './PrimaryButtonDocumentation';
import { IconButtonDocumentation } from './IconButtonDocumentation';
import { IconSmallButtonDocumentation } from './IconSmallButtonDocumentation';
import { OutlineButtonDocumentation } from './OutlineButtonDocumentation';
import { TreeDocumentation } from './TreeDocumentation';
import { TokensDocumentation } from './TokensDocumentation';
import { ComponentsOverview } from './ComponentsOverview';

export interface ComponentDocumentationProps {
  activeComponent: string;
}

export function ComponentDocumentation({ activeComponent }: ComponentDocumentationProps) {
  const renderComponent = () => {
    switch (activeComponent) {
      case 'overview':
        return <ComponentsOverview />;
      case 'tokens':
        return <TokensDocumentation />;
      case 'components':
        return <ComponentsOverview />;
      case 'primary-button':
        return <PrimaryButtonDocumentation />;
      case 'icon-button':
        return <IconButtonDocumentation />;
      case 'icon-small-button':
        return <IconSmallButtonDocumentation />;
      case 'outline-button':
        return <OutlineButtonDocumentation />;
      case 'tree':
        return <TreeDocumentation />;
      default:
        return <ComponentsOverview />;
    }
  };

  return (
    <>
      <style>{`
        .component-documentation {
          /* Design System Tokens */
          --component-documentation-flex: 1;
          --component-documentation-overflow-y: auto;
          --component-documentation-bg: #0a0a0f;
          --component-documentation-color: #ffffff;
          --component-documentation-font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

          /* Component Styles */
          flex: var(--component-documentation-flex);
          overflow-y: var(--component-documentation-overflow-y);
          background-color: var(--component-documentation-bg);
          color: var(--component-documentation-color);
          font-family: var(--component-documentation-font-family);
          box-sizing: border-box;
        }

        .component-documentation__content {
          /* Design System Tokens */
          --documentation-content-min-height: 100vh;

          /* Component Styles */
          min-height: var(--documentation-content-min-height);
        }
      `}</style>

      <div className="component-documentation">
        <div className="component-documentation__content">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}