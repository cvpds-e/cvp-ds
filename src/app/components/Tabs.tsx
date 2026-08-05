import React, { KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import './Tabs.css';

export interface TabItem { id:string; label:React.ReactNode; content:React.ReactNode; disabled?:boolean }
export interface TabsProps {
  tabs:TabItem[]; defaultTab?:string; activeTab?:string; onTabChange?:(tabId:string)=>void;
  className?:string; ariaLabel?:string; activationMode?:'automatic'|'manual'; orientation?:'horizontal'|'vertical';
}

export function Tabs({tabs,defaultTab,activeTab:controlledTab,onTabChange,className='',ariaLabel='Content sections',activationMode='automatic',orientation='horizontal'}:TabsProps){
 const firstEnabled=tabs.find(tab=>!tab.disabled)?.id;
 const[internalTab,setInternalTab]=useState(defaultTab&&tabs.some(tab=>tab.id===defaultTab&&!tab.disabled)?defaultTab:firstEnabled);
 const selectedId=controlledTab??internalTab;
 const refs=useRef<Record<string,HTMLButtonElement|null>>({});
 const instanceId=useId().replace(/:/g,'');

 useEffect(()=>{
  if(selectedId&&tabs.some(tab=>tab.id===selectedId&&!tab.disabled))return;
  if(controlledTab===undefined)setInternalTab(firstEnabled);
 },[tabs,selectedId,controlledTab,firstEnabled]);

 const select=(id:string)=>{const tab=tabs.find(item=>item.id===id);if(!tab||tab.disabled)return;if(controlledTab===undefined)setInternalTab(id);onTabChange?.(id)};
 const move=(event:KeyboardEvent<HTMLButtonElement>,index:number)=>{
  const enabled=tabs.filter(tab=>!tab.disabled);if(!enabled.length)return;
  const current=enabled.findIndex(tab=>tab.id===tabs[index]?.id);
  const previousKey=orientation==='horizontal'?'ArrowLeft':'ArrowUp',nextKey=orientation==='horizontal'?'ArrowRight':'ArrowDown';
  let target:number|undefined;
  if(event.key===nextKey)target=(current+1)%enabled.length;else if(event.key===previousKey)target=(current-1+enabled.length)%enabled.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=enabled.length-1;else if(activationMode==='manual'&&(event.key==='Enter'||event.key===' ')){event.preventDefault();select(tabs[index].id);return}else return;
  event.preventDefault();const next=enabled[target];refs.current[next.id]?.focus();if(activationMode==='automatic')select(next.id);
 };

 if(!tabs.length)return null;
 return <div className={`cvp-tabs cvp-tabs--${orientation} ${className}`.trim()}>
  <div role="tablist" className="cvp-tabs__list" aria-label={ariaLabel} aria-orientation={orientation}>
   {tabs.map((tab,index)=>{const selected=selectedId===tab.id;return <button key={tab.id} ref={node=>{refs.current[tab.id]=node}} type="button" role="tab" id={`${instanceId}-tab-${tab.id}`} aria-selected={selected} aria-controls={`${instanceId}-panel-${tab.id}`} tabIndex={selected?0:-1} className="cvp-tabs__tab" disabled={tab.disabled} onClick={()=>select(tab.id)} onKeyDown={event=>move(event,index)}><span className="cvp-tabs__label">{tab.label}</span></button>})}
  </div>
  {tabs.map(tab=><div key={tab.id} role="tabpanel" id={`${instanceId}-panel-${tab.id}`} aria-labelledby={`${instanceId}-tab-${tab.id}`} hidden={selectedId!==tab.id} tabIndex={0} className="cvp-tabs__panel">{tab.content}</div>)}
 </div>;
}
