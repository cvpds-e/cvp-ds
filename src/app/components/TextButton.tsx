import React from 'react';
import './TextButton.css';

type Variant='default'|'secondary'|'toggle'|'minimal'|'contextual'|'minimal-inverted'|'nav';
type BaseProps={children:React.ReactNode;variant?:Variant;disabled?:boolean;className?:string;icon?:React.ReactNode;active?:boolean;loading?:boolean;loadingText?:string};
type ButtonProps=BaseProps&React.ButtonHTMLAttributes<HTMLButtonElement>&{href?:never};
type LinkProps=BaseProps&React.AnchorHTMLAttributes<HTMLAnchorElement>&{href:string};
export type TextButtonProps=ButtonProps|LinkProps;

export function TextButton({children,variant='default',disabled=false,className='',icon,active=false,loading=false,loadingText='Loading',...props}:TextButtonProps){
 const isLink='href'in props&&props.href!==undefined;
 const unavailable=disabled||loading;
 const legacyVariant:Variant|undefined=className.includes('text-button--minimalistic-inverted')?'minimal-inverted':className.includes('text-button--minimalistic')?'minimal':className.includes('text-button--secondary')?'secondary':className.includes('text-button--toggle')?'toggle':className.includes('text-button--nav')?'nav':undefined;
 const inferredVariant=legacyVariant??(variant==='default'&&icon?'nav':variant);
 const classes=['text-button','cvp-text-button',`text-button--${inferredVariant}`,`cvp-text-button--${inferredVariant}`,active?'text-button--active cvp-text-button--active':'',className].filter(Boolean).join(' ');
 const content=<span className="cvp-text-button__content">{icon&&<span className="cvp-text-button__icon" aria-hidden="true">{icon}</span>}<span>{loading?loadingText:children}</span>{loading&&<span className="cvp-text-button__spinner" aria-hidden="true"/>}</span>;
 if(isLink){const {href,...linkProps}=props as LinkProps;return <a {...linkProps} href={unavailable?undefined:href} className={classes} aria-disabled={unavailable||undefined} aria-current={active?'page':undefined} tabIndex={unavailable?-1:linkProps.tabIndex}>{content}</a>}
 const buttonProps=props as ButtonProps;return <button {...buttonProps} type={buttonProps.type??'button'} className={classes} disabled={unavailable} aria-busy={loading||undefined} aria-label={loading?loadingText:buttonProps['aria-label']} aria-pressed={inferredVariant==='toggle'?active:buttonProps['aria-pressed']} data-loading={loading||undefined}>{content}</button>;
}
