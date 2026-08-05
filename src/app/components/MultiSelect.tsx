import React,{useEffect,useId,useMemo,useRef,useState}from'react';
import{Check,ChevronDown,Plus,X}from'lucide-react';
import'./MultiSelect.css';

export interface MultiSelectOption{value:string;label:string;disabled?:boolean}
export interface MultiSelectProps{
 options:MultiSelectOption[];value?:string[];defaultValue?:string[];onChange?:(values:string[])=>void;
 id?:string;name?:string;label?:string;description?:string;placeholder?:string;maxSelection?:number;
 disabled?:boolean;required?:boolean;error?:boolean|string;className?:string;allowCreate?:boolean;
 onCreateOption?:(newOption:MultiSelectOption)=>void;previewState?:'hover'|'focus'|'open'|'clear-hover';
}

export function MultiSelect({options,value,defaultValue=[],onChange,id,name,label,description,placeholder='Select options…',maxSelection,disabled=false,required=false,error=false,className='',allowCreate=true,onCreateOption,previewState}:MultiSelectProps){
 const uid=useId().replace(/:/g,'');const inputId=id??`multi-select-${uid}`,listId=`${inputId}-listbox`,descriptionId=description?`${inputId}-description`:undefined,errorId=error?`${inputId}-error`:undefined;
 const[internal,setInternal]=useState(defaultValue);const[created,setCreated]=useState<MultiSelectOption[]>([]);const[open,setOpen]=useState(false);const[query,setQuery]=useState('');const rootRef=useRef<HTMLDivElement>(null);const inputRef=useRef<HTMLInputElement>(null);const listRef=useRef<HTMLUListElement>(null);
 const selected=value??internal;
 const allOptions=useMemo(()=>{const map=new Map<string,MultiSelectOption>();[...options,...created].forEach(option=>{if(!map.has(option.value))map.set(option.value,option)});return[...map.values()]},[options,created]);
 const selectedOptions=allOptions.filter(option=>selected.includes(option.value));
 const filtered=allOptions.filter(option=>option.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
 const atLimit=maxSelection!==undefined&&selected.length>=maxSelection;
 const canCreate=allowCreate&&query.trim().length>0&&!allOptions.some(option=>option.label.toLocaleLowerCase()===query.trim().toLocaleLowerCase())&&!atLimit;
 const commit=(next:string[])=>{if(value===undefined)setInternal(next);onChange?.(next)};
 const toggle=(option:MultiSelectOption)=>{if(disabled||option.disabled)return;const exists=selected.includes(option.value);if(!exists&&atLimit)return;commit(exists?selected.filter(item=>item!==option.value):[...selected,option.value])};
 const remove=(optionValue:string)=>{if(!disabled)commit(selected.filter(item=>item!==optionValue))};
 const create=()=>{if(!canCreate)return;const option={value:query.trim(),label:query.trim()};setCreated(current=>[...current,option]);commit([...selected,option.value]);onCreateOption?.(option);setQuery('')};
 const show=()=>{if(disabled)return;setOpen(true);requestAnimationFrame(()=>inputRef.current?.focus())};
 const close=()=>{setOpen(false);setQuery('')};
 const focusOption=(from:HTMLElement,direction:1|-1)=>{const items=[...(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]:not([aria-disabled="true"])')??[])];const index=items.indexOf(from);items[(index+direction+items.length)%items.length]?.focus()};
 useEffect(()=>{const outside=(event:MouseEvent)=>{if(rootRef.current&&!rootRef.current.contains(event.target as Node))close()};document.addEventListener('mousedown',outside);return()=>document.removeEventListener('mousedown',outside)},[]);
 const hasError=Boolean(error),message=typeof error==='string'?error:undefined;
 return <div ref={rootRef} className={['cvp-multi-select',className].filter(Boolean).join(' ')} data-disabled={disabled||undefined} data-invalid={hasError||undefined} data-open={(open||previewState==='open')||undefined} data-preview-state={previewState}>
  {label&&<label className="cvp-multi-select__label" htmlFor={inputId}>{label}{required&&<span aria-hidden="true"> *</span>}</label>}
  <div className="cvp-multi-select__shell" onClick={show}>
   <div className="cvp-multi-select__content">
    {selectedOptions.map(option=><span className="cvp-multi-select__tag" key={option.value}><span>{option.label}</span>{!disabled&&<button type="button" onClick={event=>{event.stopPropagation();remove(option.value)}} aria-label={`Remove ${option.label}`}><X aria-hidden="true"/></button>}</span>)}
    <input ref={inputRef} id={inputId} className="cvp-multi-select__input" value={query} onChange={event=>{setQuery(event.target.value);setOpen(true)}} onFocus={show} onKeyDown={event=>{if(event.key==='Escape')close();else if(event.key==='ArrowDown'){event.preventDefault();const first=listRef.current?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])');first?.focus()}else if(event.key==='Enter'&&canCreate){event.preventDefault();create()}else if(event.key==='Backspace'&&!query&&selected.length){remove(selected[selected.length-1])}}} placeholder={selectedOptions.length?'':placeholder} disabled={disabled} required={required&&selected.length===0} role="combobox" aria-expanded={open} aria-controls={listId} aria-haspopup="listbox" aria-autocomplete="list" aria-invalid={hasError||undefined} aria-describedby={[descriptionId,errorId].filter(Boolean).join(' ')||undefined}/>
   </div>
   <div className="cvp-multi-select__controls">{selected.length>0&&!disabled&&<button type="button" onClick={event=>{event.stopPropagation();commit([])}} aria-label="Clear all selections"><X aria-hidden="true"/></button>}<button type="button" className="cvp-multi-select__toggle" onClick={event=>{event.stopPropagation();open?close():show()}} aria-label={open?'Close options':'Open options'} aria-controls={listId} aria-expanded={open} disabled={disabled}><ChevronDown aria-hidden="true"/></button></div>
  </div>
  {name&&selected.map(item=><input key={item} type="hidden" name={name} value={item}/>)}
  {description&&<span id={descriptionId} className="cvp-multi-select__support">{description}</span>}
  {message&&<span id={errorId} className="cvp-multi-select__error" role="alert">{message}</span>}
  {open&&<div className="cvp-multi-select__popup">
   <div className="cvp-multi-select__meta"><span>{selected.length} of {allOptions.length} selected{maxSelection!==undefined?` · ${maxSelection} maximum`:''}</span><button type="button" onClick={()=>commit(selected.length?[]:filtered.filter(item=>!item.disabled).slice(0,maxSelection??filtered.length).map(item=>item.value))}>{selected.length?'Clear all':'Select all'}</button></div>
   {canCreate&&<button type="button" className="cvp-multi-select__create" onClick={create}><Plus aria-hidden="true"/>Create “{query.trim()}”</button>}
   <ul ref={listRef} id={listId} className="cvp-multi-select__list" role="listbox" aria-multiselectable="true" aria-label={label?`${label} options`:'Available options'}>{filtered.length?filtered.map(option=>{const chosen=selected.includes(option.value),blocked=Boolean(option.disabled||(!chosen&&atLimit));return<li key={option.value} role="option" aria-selected={chosen} aria-disabled={blocked||undefined} tabIndex={blocked?-1:0} onClick={()=>!blocked&&toggle(option)} onKeyDown={event=>{if(event.key==='ArrowDown'){event.preventDefault();focusOption(event.currentTarget,1)}else if(event.key==='ArrowUp'){event.preventDefault();focusOption(event.currentTarget,-1)}else if(event.key==='Enter'||event.key===' '){event.preventDefault();if(!blocked)toggle(option)}else if(event.key==='Escape'){close();inputRef.current?.focus()}}}><span>{option.label}</span>{chosen?<Check aria-hidden="true"/>:<Plus aria-hidden="true"/>}</li>}):<li className="cvp-multi-select__empty">No options found</li>}</ul>
  </div>}
 </div>;
}
