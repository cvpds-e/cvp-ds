import React from 'react';
import './IconButton.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children:React.ReactNode;
  'aria-label':string;
  size?:'small'|'medium'|'large';
  variant?:'default'|'outline'|'ghost'|'danger'|'rail-gallery'|'remove';
  loading?:boolean;
  loadingLabel?:string;
}

export const IconButton=React.forwardRef<HTMLButtonElement,IconButtonProps>(({children,size='medium',variant='default',loading=false,loadingLabel='Loading',className='',disabled=false,type='button',...props},ref)=>{
  const unavailable=disabled||loading;
  const classNames=['icon-button','cvp-icon-button',`cvp-icon-button--${size}`,`cvp-icon-button--${variant}`,className].filter(Boolean).join(' ');
  return <button {...props} ref={ref} type={type} className={classNames} disabled={unavailable} aria-label={loading?loadingLabel:props['aria-label']} aria-busy={loading||undefined} data-loading={loading||undefined} data-disabled={unavailable||undefined}>
    <span className="cvp-icon-button__content" aria-hidden="true">{loading?<span className="cvp-icon-button__spinner"/>:children}</span>
  </button>;
});
IconButton.displayName='IconButton';
