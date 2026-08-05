import React from 'react';
import { IconButton, IconButtonProps } from './IconButton';

export interface IconSmallButtonProps extends Omit<IconButtonProps,'size'>{}

export const IconSmallButton=React.forwardRef<HTMLButtonElement,IconSmallButtonProps>(({className='',...props},ref)=><IconButton {...props} ref={ref} size="small" className={['icon-small-button',className].filter(Boolean).join(' ')}/>);
IconSmallButton.displayName='IconSmallButton';
