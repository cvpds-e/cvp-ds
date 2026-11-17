import React from 'react';
import { Loader } from './Loader';
import './OutlineButton.css';

export interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'dotted';
  loading?: boolean;
  loadingText?: string;
}

export const OutlineButton=React.forwardRef<HTMLButtonElement,OutlineButtonProps>(({children,variant='default',loading=false,loadingText='Loading',className='',disabled=false,type='button',...props},ref)=>{
  const unavailable=disabled||loading;
  const classNames=['outline-button','cvp-outline-button',`cvp-outline-button--${variant}`,className].filter(Boolean).join(' ');
  return <button {...props} ref={ref} type={type} className={classNames} disabled={unavailable} aria-busy={loading||undefined} aria-label={loading?loadingText:props['aria-label']} data-loading={loading||undefined} data-disabled={unavailable||undefined}>
    <span className="cvp-outline-button__label">{children}</span>
    {loading&&<span className="cvp-outline-button__loading" aria-hidden="true"><Loader size="sm" tone="inherit" decorative/><span>{loadingText}</span></span>}
  </button>;
});
OutlineButton.displayName='OutlineButton';
