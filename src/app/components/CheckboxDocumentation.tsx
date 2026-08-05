import React,{useState}from'react';
import{Checkbox,CheckboxState}from'./Checkbox';
import{ComponentTokenContract,ComponentTokenContractRow}from'./ComponentTokenContract';
import'./TextInputDocumentation.css';
import'./CheckboxDocumentation.css';

const rows:ComponentTokenContractRow[]=[
 {role:'Control size',token:'--cvp-checkbox-size',source:'--cvp-space-4',contract:'16px visible control',activation:'All states'},
 {role:'Target size',token:'--cvp-checkbox-target-size',source:'--cvp-space-6',contract:'24px minimum local target',activation:'Input hit area'},
 {role:'Border',token:'--cvp-checkbox-border',source:'--cvp-color-text-muted',contract:'3:1 UI boundary',activation:'Unchecked'},
 {role:'Selected surface',token:'--cvp-checkbox-checked-bg',source:'--cvp-color-brand-default',contract:'Theme-resolved brand',activation:'Checked / mixed'},
 {role:'Selected icon',token:'--cvp-checkbox-checked-icon',source:'--cvp-color-text-on-brand',contract:'3:1 graphical contrast',activation:'Checked / mixed'},
 {role:'Focus',token:'--cvp-checkbox-focus-ring',source:'--cvp-border-focus-ring',contract:'Visible two-layer ring',activation:':focus-visible'},
 {role:'Error',token:'--cvp-checkbox-border-error',source:'--cvp-color-border-error',contract:'Error boundary',activation:'invalid / error'},
 {role:'Label',token:'--cvp-checkbox-label',source:'--cvp-color-text-primary',contract:'4.5:1 minimum',activation:'Enabled'},
 {role:'Support text',token:'--cvp-checkbox-description',source:'--cvp-color-text-muted',contract:'4.5:1 minimum',activation:'Description'},
 {role:'Shape',token:'--cvp-checkbox-radius',source:'--cvp-shape-control-compact',contract:'4px',activation:'Control'},
];

const states:[string,React.ComponentProps<typeof Checkbox>][]=[
 ['Unchecked',{label:'Unchecked'}],
 ['Hover',{label:'Hover',previewState:'hover'}],
 ['Focus',{label:'Focus',previewState:'focus'}],
 ['Checked',{label:'Checked',checked:true}],
 ['Indeterminate',{label:'Partially selected',checked:'indeterminate'}],
 ['Error',{label:'Required confirmation',error:'Confirm before continuing'}],
 ['Disabled',{label:'Unavailable',disabled:true}],
 ['Disabled checked',{label:'Selected and unavailable',checked:true,disabled:true}],
];

export function CheckboxDocumentation(){
 const[email,setEmail]=useState<CheckboxState>(false);
 const[channels,setChannels]=useState<string[]>(['Email']);
 const options=['Email','SMS','Push'];
 const allState:CheckboxState=channels.length===0?false:channels.length===options.length?true:'indeterminate';
 const setAll=(next:CheckboxState)=>setChannels(next===true?options:[]);
 const setChannel=(option:string,next:CheckboxState)=>setChannels(current=>next===true?[...new Set([...current,option])]:current.filter(item=>item!==option));
 return <main className="cvp-input-doc cvp-checkbox-doc">
  <header className="cvp-input-doc__hero"><div><span>Component 12 · Standardized</span><h1>Checkbox</h1></div><div><p>A native binary choice with governed selected, mixed, validation, focus, disabled, and theme states.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
  <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>The visible control stays compact while its native input owns the larger interaction target.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live"><Checkbox label="Email notifications" description="Receive operational updates and service notices." checked={email} onChange={setEmail}/></div><ol><li><b>1</b><span><strong>Native input</strong> Owns focus, checked state, form value, and Space activation.</span></li><li><b>2</b><span><strong>Visual control</strong> A 16px box within a 24px local target.</span></li><li><b>3</b><span><strong>Content</strong> The label and optional support or error copy form one click target.</span></li></ol></div></section>
  <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Complete state model</h2><p>Indeterminate is assigned by the parent selection model; it is not a third user-cycled value.</p></div></header><div className="cvp-checkbox-doc__states">{states.map(([name,props])=><article key={name}><span>{name}</span><Checkbox {...props}/></article>)}</div></section>
  <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Grouped selection</h2><p>Use a fieldset and legend for related choices. “Select all” derives its mixed state from its children.</p></div></header><fieldset className="cvp-checkbox-doc__fieldset"><legend>Notification channels</legend><Checkbox label="Select all channels" description={`${channels.length} of ${options.length} selected`} checked={allState} onChange={setAll}/><div className="cvp-checkbox-doc__children">{options.map(option=><Checkbox key={option} label={option} checked={channels.includes(option)} onChange={next=>setChannel(option,next)}/>)}</div></fieldset></section>
  <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Theme parity</h2><p>The same semantic contract resolves control, label, support, selected, and focus colors in both themes.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><Checkbox label="Selected option" description="Dark theme" checked/></article><article data-theme="light"><span>Light</span><Checkbox label="Selected option" description="Light theme" checked/></article></div></section>
  <section className="cvp-input-doc__panel"><header><b>05</b><div><h2>Token contract</h2><p>Every visual value resolves through the registered CVP Tier 3 checkbox contract.</p></div></header><ComponentTokenContract label="Checkbox token contract" rows={rows}/></section>
  <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a native <code>input[type="checkbox"]</code>; Space toggles it and Enter does not.</li><li>The visible label is the checkbox accessible name and expands its click target.</li><li>Mixed state sets the DOM <code>indeterminate</code> property and <code>aria-checked="mixed"</code>.</li><li>Description and error IDs compose through <code>aria-describedby</code>.</li><li>Error sets <code>aria-invalid</code>; disabled stays native and non-interactive.</li></ul></article><article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Usage decisions</h2></div></header><ul><li>Use Checkbox for independent, non-exclusive choices.</li><li>Use Radio when exactly one option must be selected.</li><li>Use Toggle for an immediately applied on/off setting.</li><li>Never use indeterminate as a user-selectable third answer.</li><li>Use <code>fieldset</code> and <code>legend</code> for every related set.</li></ul></article></section>
  <footer className="cvp-input-doc__footer"><span>CVP checkbox reference</span><p>Native semantics · Derived mixed state · CVP token contract · Dual-theme parity</p></footer>
 </main>;
}
