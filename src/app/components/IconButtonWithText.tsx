import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import './IconButtonWithText.css';

export interface IconButtonWithTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
 icon:React.ReactNode;
 text:string;
 description?:string;
 variant?:'default'|'outline';
 size?:'default'|'m';
 loading?:boolean;
 loadingText?:string;
}

export const IconButtonWithText=React.forwardRef<HTMLButtonElement,IconButtonWithTextProps>(({icon,text,description,variant='default',size='default',loading=false,loadingText='Loading',className='',disabled=false,type='button',...props},ref)=>{
 const unavailable=disabled||loading;
 const classNames=['icon-button-with-text','cvp-icon-text-button',`cvp-icon-text-button--${variant}`,`cvp-icon-text-button--${size}`,className].filter(Boolean).join(' ');
 return <button {...props} ref={ref} type={type} className={classNames} disabled={unavailable} aria-busy={loading||undefined} aria-label={loading?loadingText:props['aria-label']} data-loading={loading||undefined} data-disabled={unavailable||undefined}>
  <span className="cvp-icon-text-button__content">
   <span className="cvp-icon-text-button__header"><span className="cvp-icon-text-button__icon" aria-hidden="true">{loading?<LoadingSpinner size="sm" tone="inherit" decorative/>:icon}</span><span className="cvp-icon-text-button__text">{loading?loadingText:text}</span></span>
   {description&&<span className="cvp-icon-text-button__description">{description}</span>}
  </span>
 </button>;
});
IconButtonWithText.displayName='IconButtonWithText';
