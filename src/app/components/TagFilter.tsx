import React, { useEffect, useId, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import './TagFilter.css';

export interface TagFilterOption { id:string; label:string; disabled?:boolean }
export interface TagFilterSection { id:string; title:string; options:TagFilterOption[] }
export interface TagFilterProps {
 sections:TagFilterSection[]; selectedOptions?:string[]; defaultSelectedOptions?:string[];
 onSelectionChange?:(selectedOptions:string[])=>void; disabled?:boolean; className?:string;
 maxSelections?:number; showSelectionCount?:boolean;
}

export function TagFilter({sections,selectedOptions,defaultSelectedOptions=[],onSelectionChange,disabled=false,className='',maxSelections,showSelectionCount=false}:TagFilterProps){
 const optionIds=useMemo(()=>new Set(sections.flatMap(section=>section.options.map(option=>option.id))),[sections]);
 const[internal,setInternal]=useState(defaultSelectedOptions.filter(id=>optionIds.has(id)));
 const selected=selectedOptions??internal;
 const instanceId=useId().replace(/:/g,'');

 useEffect(()=>{if(selectedOptions!==undefined)return;setInternal(current=>{const next=current.filter(id=>optionIds.has(id));return next.length===current.length?current:next})},[optionIds,selectedOptions]);
 const update=(next:string[])=>{if(selectedOptions===undefined)setInternal(next);onSelectionChange?.(next)};
 const toggle=(option:TagFilterOption)=>{if(disabled||option.disabled)return;const active=selected.includes(option.id);if(!active&&maxSelections!==undefined&&selected.length>=maxSelections)return;update(active?selected.filter(id=>id!==option.id):[...selected,option.id])};

 if(!sections.length)return null;
 return <div className={`cvp-tag-filter ${className}`.trim()} data-disabled={disabled||undefined}>
  {showSelectionCount&&<p className="cvp-tag-filter__summary" aria-live="polite">{selected.length} selected{maxSelections!==undefined?` of ${maxSelections}`:''}</p>}
  {sections.map(section=>{const titleId=`${instanceId}-${section.id}-title`;return <section key={section.id} className="cvp-tag-filter__section"><h3 id={titleId} className="cvp-tag-filter__title">{section.title}</h3><div className="cvp-tag-filter__options" role="group" aria-labelledby={titleId}>{section.options.map(option=>{const active=selected.includes(option.id),atLimit=!active&&maxSelections!==undefined&&selected.length>=maxSelections,unavailable=disabled||option.disabled||atLimit;return <button key={option.id} type="button" className="cvp-tag-filter__tag" aria-pressed={active} disabled={unavailable} data-limit-disabled={atLimit||undefined} onClick={()=>toggle(option)}><span>{option.label}</span>{active&&<span className="cvp-tag-filter__remove-cue" aria-hidden="true"><X/></span>}</button>})}</div></section>})}
 </div>;
}
