import React,{forwardRef,useEffect,useId,useRef,useState}from'react';
import{Check,Minus}from'lucide-react';
import'./Checkbox.css';

export type CheckboxState=boolean|'indeterminate';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'checked'|'defaultChecked'|'onChange'|'type'>{checked?:CheckboxState;defaultChecked?:CheckboxState;onChange?:(checked:CheckboxState)=>void;label?:string;description?:string;error?:string;invalid?:boolean;}

export const Checkbox=forwardRef<HTMLInputElement,CheckboxProps>(({id,checked,defaultChecked=false,onChange,disabled=false,label,description,error,invalid=false,className='',required=false,'aria-describedby':ariaDescribedBy,'aria-invalid':ariaInvalid,...props},forwardedRef)=>{
 const generatedId=useId().replace(/:/g,'');const inputId=id??`checkbox-${generatedId}`;const[internal,setInternal]=useState<CheckboxState>(defaultChecked);const controlled=checked!==undefined;const current=controlled?checked:internal;const localRef=useRef<HTMLInputElement|null>(null);
 useEffect(()=>{if(localRef.current)localRef.current.indeterminate=current==='indeterminate'},[current]);
 const setRef=(node:HTMLInputElement|null)=>{localRef.current=node;if(typeof forwardedRef==='function')forwardedRef(node);else if(forwardedRef)forwardedRef.current=node};
 const descriptionId=description?`${inputId}-description`:undefined;const errorId=error?`${inputId}-error`:undefined;const describedBy=[ariaDescribedBy,descriptionId,errorId].filter(Boolean).join(' ')||undefined;const hasError=invalid||Boolean(error);
 const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{const next=event.currentTarget.checked;if(!controlled)setInternal(next);onChange?.(next)};
 return <label className={['cvp-checkbox',className].filter(Boolean).join(' ')} data-state={current==='indeterminate'?'indeterminate':current?'checked':'unchecked'} data-disabled={disabled||undefined} data-invalid={hasError||undefined}>
  <span className="cvp-checkbox__control"><input {...props} ref={setRef} id={inputId} type="checkbox" className="cvp-checkbox__input" checked={current===true} disabled={disabled} required={required} onChange={handleChange} aria-checked={current==='indeterminate'?'mixed':current} aria-invalid={hasError?true:ariaInvalid} aria-describedby={describedBy}/><span className="cvp-checkbox__box" aria-hidden="true">{current==='indeterminate'?<Minus/>:<Check/>}</span></span>
  {(label||description||error)&&<span className="cvp-checkbox__content">{label&&<span className="cvp-checkbox__label">{label}{required&&<span className="cvp-checkbox__required" aria-hidden="true">*</span>}</span>}{description&&<span id={descriptionId} className="cvp-checkbox__description">{description}</span>}{error&&<span id={errorId} className="cvp-checkbox__error" role="alert">{error}</span>}</span>}
 </label>;
});
Checkbox.displayName='Checkbox';
