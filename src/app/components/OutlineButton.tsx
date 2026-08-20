import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import './OutlineButton.css';

export interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'dotted';
  loading?: boolean;
  loadingText?: string;
}

export function OutlineButton({children,variant='default',loading=false,loadingText='Loading',className='',disabled=false,type='button',...props}:OutlineButtonProps){
  const unavailable=disabled||loading;
  const classNames=['outline-button','cvp-outline-button',`cvp-outline-button--${variant}`,className].filter(Boolean).join(' ');
  return <button {...props} type={type} className={classNames} disabled={unavailable} aria-busy={loading||undefined} aria-label={loading?loadingText:props['aria-label']} data-loading={loading||undefined} data-disabled={unavailable||undefined}>
    <span className="cvp-outline-button__label">{children}</span>
    {loading&&<span className="cvp-outline-button__loading" aria-hidden="true"><LoadingSpinner size="sm" tone="inherit" decorative/><span>{loadingText}</span></span>}
  </button>;
}
