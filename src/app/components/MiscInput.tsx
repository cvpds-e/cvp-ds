import React,{forwardRef,useEffect,useId,useRef,useState}from'react';
import{Check,Copy}from'lucide-react';
import{IconButton}from'./IconButton';
import'./MiscInput.css';

export interface MiscInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'size'|'prefix'|'onCopy'>{
 variant?:'default'|'error'|'warning'|'success';error?:string;warning?:string;success?:string;helperText?:string;label?:string;required?:boolean;showCharacterCount?:boolean;prefixElement?:React.ReactNode;suffixElement?:React.ReactNode;fieldPrefix?:string;showCopy?:boolean;onCopy?:(value:string)=>void|Promise<void>;inputClassName?:string;
}

export const MiscInput=forwardRef<HTMLInputElement,MiscInputProps>(({variant='default',error,warning,success,helperText,label,required=false,showCharacterCount=false,prefixElement,suffixElement,fieldPrefix,showCopy=false,onCopy,inputClassName,className,id,value,defaultValue,onChange,disabled=false,maxLength,'aria-describedby':ariaDescribedBy,'aria-invalid':ariaInvalid,...props},ref)=>{
 const generatedId=useId().replace(/:/g,'');const inputId=id??`misc-input-${generatedId}`;const[copied,setCopied]=useState(false);const[uncontrolledLength,setUncontrolledLength]=useState(()=>String(defaultValue??'').length);
 const inputRef=useRef<HTMLInputElement|null>(null);const copyTimer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);const mounted=useRef(false);
 const[copying,setCopying]=useState(false);const[copyMessage,setCopyMessage]=useState('');const[copyError,setCopyError]=useState('');
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;clearTimeout(copyTimer.current)}},[]);
 const currentLength=value===undefined?uncontrolledLength:String(value).length;const overLimit=Boolean(maxLength&&currentLength>maxLength);const state=error||overLimit||variant==='error'?'error':warning||variant==='warning'?'warning':success||variant==='success'?'success':'default';
 const message=state==='error'?(error??(maxLength?`Character limit exceeded by ${currentLength-maxLength}`:'Invalid value')):state==='warning'?warning:state==='success'?success:helperText;const supportId=message?`${inputId}-support`:undefined;const countId=showCharacterCount?`${inputId}-count`:undefined;const describedBy=[ariaDescribedBy,supportId,countId].filter(Boolean).join(' ')||undefined;
 const copyValue=async()=>{
  clearTimeout(copyTimer.current);setCopying(true);setCopied(false);setCopyMessage('');setCopyError('');
  try{
   const text=inputRef.current?.value??'';
   if(onCopy)await onCopy(text);else await navigator.clipboard.writeText(text);
   if(!mounted.current)return;
   setCopied(true);setCopyMessage('Copied to clipboard');
   copyTimer.current=setTimeout(()=>{setCopied(false);setCopyMessage('')},2000);
  }catch(error){
   console.error('Unable to copy input value',error);
   if(mounted.current)setCopyError('Unable to copy. Select the value and copy it manually.');
  }finally{if(mounted.current)setCopying(false)}
 };const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{if(value===undefined)setUncontrolledLength(event.currentTarget.value.length);onChange?.(event)};
 return <div className={['cvp-misc-input',className].filter(Boolean).join(' ')} data-validation={state} data-disabled={disabled||undefined}>
  {(label||fieldPrefix||showCharacterCount)&&<div className="cvp-misc-input__label-row"><label htmlFor={inputId} className="cvp-misc-input__label">{label}{required&&<span className="cvp-misc-input__required" aria-hidden="true">*</span>}</label><span className="cvp-misc-input__meta">{fieldPrefix&&<span>[{fieldPrefix}]</span>}{showCharacterCount&&<span id={countId} data-over-limit={overLimit||undefined}>{currentLength}{maxLength?` / ${maxLength}`:''}</span>}</span></div>}
  <div className="cvp-misc-input__shell">
   {prefixElement&&<span className="cvp-misc-input__prefix" aria-hidden="true">{prefixElement}</span>}
   <input {...props} ref={node=>{inputRef.current=node;if(typeof ref==='function')ref(node);else if(ref)ref.current=node}} id={inputId} className={['cvp-misc-input__control',inputClassName].filter(Boolean).join(' ')} value={value} defaultValue={defaultValue} onChange={handleChange} disabled={disabled} required={required} maxLength={maxLength} aria-required={required||undefined} aria-invalid={state==='error'?true:ariaInvalid} aria-describedby={describedBy}/>
   {(suffixElement||showCopy)&&<span className="cvp-misc-input__suffix">{suffixElement&&<span aria-hidden="true">{suffixElement}</span>}{showCopy&&<IconButton size="small" aria-label={copied?'Copied':'Copy input value'} onClick={copyValue} disabled={disabled||copying} type="button">{copied?<Check/>:<Copy/>}</IconButton>}</span>}
  </div>
  {message&&<p id={supportId} className="cvp-misc-input__support" role={state==='error'?'alert':undefined}>{message}</p>}
  {showCopy&&<><p className="cvp-misc-input__support" role="status">{copyMessage}</p><p className="cvp-misc-input__copy-error" role="alert">{copyError}</p></>}
 </div>;
});
MiscInput.displayName='MiscInput';
