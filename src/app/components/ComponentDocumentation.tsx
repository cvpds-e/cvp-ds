import React from 'react';
import { PrimaryButtonDocumentation } from './PrimaryButtonDocumentation';
import { IconButtonDocumentation } from './IconButtonDocumentation';
import { IconSmallButtonDocumentation } from './IconSmallButtonDocumentation';
import { OutlineButtonDocumentation } from './OutlineButtonDocumentation';
import { TreeDocumentation } from './TreeDocumentation';
import { TokensDocumentation } from './TokensDocumentation';
import { ComponentsOverview } from './ComponentsOverview';
import './ComponentDocumentation.css';

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
      <div className="component-documentation">
        <div className="component-documentation__content">
          {renderComponent()}
        </div>
      </div>
  );
}
