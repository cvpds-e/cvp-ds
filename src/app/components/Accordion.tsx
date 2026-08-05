import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export interface AccordionItem { id:string; title:React.ReactNode; content:React.ReactNode; disabled?:boolean; icon?:React.ReactNode; iconColor?:'default'|'primary' }
export interface AccordionProps {
 items:AccordionItem[]; type?:'single'|'multiple'; defaultExpanded?:string[]; expandedItems?:string[];
 onExpandedChange?:(expandedItems:string[])=>void; disabled?:boolean; className?:string; headingLevel?:2|3|4|5|6;
}

export function Accordion({items,type='single',defaultExpanded=[],expandedItems:controlled,onExpandedChange,disabled=false,className='',headingLevel=3}:AccordionProps){
 const validDefaults=defaultExpanded.filter(id=>items.some(item=>item.id===id&&!item.disabled));
 const[internal,setInternal]=useState<string[]>(type==='single'?validDefaults.slice(0,1):validDefaults);
 const expanded=controlled??internal;
 const refs=useRef<Record<string,HTMLButtonElement|null>>({});
 const instanceId=useId().replace(/:/g,'');
 const Heading=`h${headingLevel}` as keyof React.JSX.IntrinsicElements;

 useEffect(()=>{
  if(controlled!==undefined)return;
  setInternal(current=>current.filter(id=>items.some(item=>item.id===id&&!item.disabled)).slice(0,type==='single'?1:undefined));
 },[items,type,controlled]);

 const toggle=(id:string)=>{const item=items.find(entry=>entry.id===id);if(disabled||!item||item.disabled)return;const next=type==='single'?(expanded.includes(id)?[]:[id]):expanded.includes(id)?expanded.filter(value=>value!==id):[...expanded,id];if(controlled===undefined)setInternal(next);onExpandedChange?.(next)};
 const move=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  const enabled=items.filter(item=>!disabled&&!item.disabled);if(!enabled.length)return;const current=enabled.findIndex(item=>item.id===items[index]?.id);let target:number|undefined;
  if(event.key==='ArrowDown')target=(current+1)%enabled.length;else if(event.key==='ArrowUp')target=(current-1+enabled.length)%enabled.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=enabled.length-1;else return;
  event.preventDefault();refs.current[enabled[target].id]?.focus();
 };

 if(!items.length)return null;
 return <div className={`cvp-accordion ${className}`.trim()} data-disabled={disabled||undefined} data-type={type}>
  {items.map((item,index)=>{const open=expanded.includes(item.id),unavailable=disabled||item.disabled,buttonId=`${instanceId}-trigger-${item.id}`,panelId=`${instanceId}-panel-${item.id}`;return <section key={item.id} className="cvp-accordion__item" data-expanded={open||undefined} data-disabled={unavailable||undefined}>
   <Heading className="cvp-accordion__heading"><button ref={node=>{refs.current[item.id]=node}} type="button" className="cvp-accordion__trigger" id={buttonId} aria-expanded={open} aria-controls={panelId} disabled={unavailable} onClick={()=>toggle(item.id)} onKeyDown={event=>move(event,index)}><span className="cvp-accordion__title">{item.icon&&<span className="cvp-accordion__leading" data-color={item.iconColor||'default'} aria-hidden="true">{item.icon}</span>}<span>{item.title}</span></span><ChevronDown className="cvp-accordion__chevron" aria-hidden="true"/></button></Heading>
   {open&&<div className="cvp-accordion__panel" id={panelId} role="region" aria-labelledby={buttonId}><div className="cvp-accordion__content">{item.content}</div></div>}
  </section>})}
 </div>;
}
