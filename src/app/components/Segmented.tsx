import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import './Segmented.css';

export interface SegmentedOption { value:string; label:React.ReactNode; disabled?:boolean; icon?:React.ReactNode }
export interface SegmentedProps {
 options:SegmentedOption[]; value?:string; defaultValue?:string; onChange?:(value:string)=>void;
 size?:'small'|'medium'|'large'; variant?:'default'|'color'; className?:string;
 ariaLabel?:string; disabled?:boolean; fullWidth?:boolean;
}

export function Segmented({options,value,defaultValue,onChange,size='medium',variant='default',className='',ariaLabel='View options',disabled=false,fullWidth=false}:SegmentedProps){
 const firstEnabled=options.find(option=>!option.disabled)?.value??'';
 const[internal,setInternal]=useState(defaultValue&&options.some(option=>option.value===defaultValue&&!option.disabled)?defaultValue:firstEnabled);
 const current=value??internal;
 const refs=useRef<Record<string,HTMLButtonElement|null>>({});

 useEffect(()=>{if(value!==undefined)return;if(options.some(option=>option.value===internal&&!option.disabled))return;setInternal(firstEnabled)},[options,internal,value,firstEnabled]);
 const select=(next:string)=>{const option=options.find(item=>item.value===next);if(disabled||!option||option.disabled)return;if(value===undefined)setInternal(next);onChange?.(next)};
 const move=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{const enabled=options.filter(option=>!disabled&&!option.disabled);if(!enabled.length)return;const currentIndex=enabled.findIndex(option=>option.value===options[index]?.value);let target:number|undefined;if(event.key==='ArrowRight'||event.key==='ArrowDown')target=(currentIndex+1)%enabled.length;else if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=(currentIndex-1+enabled.length)%enabled.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=enabled.length-1;else return;event.preventDefault();const next=enabled[target];refs.current[next.value]?.focus();select(next.value)};

 if(!options.length)return null;
 return <div className={`cvp-segmented cvp-segmented--${size} cvp-segmented--${variant} ${fullWidth?'cvp-segmented--full':''} ${className}`.trim()} role="radiogroup" aria-label={ariaLabel} aria-disabled={disabled||undefined}>
  {options.map((option,index)=>{const selected=current===option.value,unavailable=disabled||option.disabled;return <button key={option.value} ref={node=>{refs.current[option.value]=node}} type="button" role="radio" aria-checked={selected} disabled={unavailable} tabIndex={selected?0:-1} className="cvp-segmented__option" onClick={()=>select(option.value)} onKeyDown={event=>move(event,index)}>{option.icon&&<span className="cvp-segmented__icon" aria-hidden="true">{option.icon}</span>}<span>{option.label}</span></button>})}
 </div>;
}
