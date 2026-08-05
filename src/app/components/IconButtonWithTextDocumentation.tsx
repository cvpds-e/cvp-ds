import React from 'react';
import { Download, Filter, Plus, Settings, Upload } from 'lucide-react';
import { IconButtonWithText } from './IconButtonWithText';
import { ComponentTokenContract, ComponentTokenContractRow } from './ComponentTokenContract';
import './TextInputDocumentation.css';
import './PrimaryButtonDocumentation.css';
import './IconButtonWithTextDocumentation.css';

const rows:ComponentTokenContractRow[]=[
 {role:'Surface',token:'--cvp-button-icon-text-bg',source:'transparent',contract:'Transparent resting surface',activation:'Base'},
 {role:'Border',token:'--cvp-button-icon-text-border',source:'--cvp-color-border-default',contract:'1px semantic border',activation:'Base'},
 {role:'Title',token:'--cvp-button-icon-text-color',source:'--cvp-color-text-primary',contract:'Theme-resolved',activation:'Base'},
 {role:'Description',token:'--cvp-button-icon-text-description',source:'--cvp-color-text-muted',contract:'Supporting copy',activation:'Base'},
 {role:'Hover',token:'--cvp-button-icon-text-bg-hover',source:'--cvp-color-surface-hover',contract:'Subtle surface',activation:':hover'},
 {role:'Pressed',token:'--cvp-button-icon-text-bg-active',source:'--cvp-color-surface-active',contract:'Active surface + 1px offset',activation:':active'},
 {role:'Focus',token:'--cvp-button-icon-text-focus-ring',source:'--cvp-border-focus-ring',contract:'Border + outer halo',activation:':focus-visible'},
 {role:'Default geometry',token:'--cvp-button-icon-text-width',source:'--cvp-space-4 × 11',contract:'176 × 96px minimum',activation:'size="default"'},
 {role:'Selection geometry',token:'--cvp-button-icon-text-m-width',source:'--cvp-space-4 × 13',contract:'208 × 160px',activation:'size="m"'},
 {role:'Large icon tile',token:'--cvp-button-icon-text-m-icon-bg-size',source:'--cvp-space-12',contract:'48px',activation:'size="m"'},
 {role:'Loading',token:'--cvp-button-icon-text-spinner-size',source:'--cvp-space-4',contract:'16px / 2px stroke',activation:'loading={true}'},
];
const states=[['Default',undefined,false,false],['Hover','hover',false,false],['Pressed','active',false,false],['Focus','focus',false,false],['Loading',undefined,false,true],['Disabled',undefined,true,false]] as const;
const desc='Use content query filters to populate this rail';

export function IconButtonWithTextDocumentation(){return <main className="cvp-input-doc cvp-button-doc cvp-icon-text-doc">
 <header className="cvp-input-doc__hero"><div><span>Component 09 · Standardized</span><h1>Icon Button with Text</h1></div><div><p>A labeled action card combining a decorative icon, concise action title, and optional explanatory copy.</p><span className="cvp-input-doc__status">Ready for implementation</span></div></header>
 <section className="cvp-input-doc__panel"><header><b>01</b><div><h2>Anatomy and live behavior</h2><p>The visible title supplies the accessible name; the description supplies decision context.</p></div></header><div className="cvp-input-doc__anatomy"><div className="cvp-input-doc__live cvp-button-doc__live"><IconButtonWithText icon={<Filter/>} text="Add with filters" description={desc}/></div><ol><li><b>1</b><span><strong>Icon</strong> Decorative reinforcement, hidden from assistive technology.</span></li><li><b>2</b><span><strong>Title</strong> Short action label and accessible name.</span></li><li><b>3</b><span><strong>Description</strong> Optional supporting explanation, not a substitute for the title.</span></li></ol></div></section>
 <section className="cvp-input-doc__panel"><header><b>02</b><div><h2>Complete state model</h2><p>All states preserve card geometry; loading replaces icon and title while preventing repeat activation.</p></div></header><div className="cvp-icon-text-doc__states">{states.map(([label,state,disabled,loading])=><article key={label}><span>{label}</span><IconButtonWithText icon={<Settings/>} text="Configure" description="Set preferences and options" loading={loading} loadingText="Loading options" disabled={disabled} data-preview-state={state}/></article>)}</div></section>
 <section className="cvp-input-doc__panel"><header><b>03</b><div><h2>Layouts and content range</h2><p>Default supports compact choices; M is a larger dashed selection card for creation flows.</p></div></header><div className="cvp-icon-text-doc__layouts"><article><span>Default · 176 × 96px min</span><IconButtonWithText icon={<Download/>} text="Download" description="Export content and metadata"/></article><article><span>Outline · compact choice</span><IconButtonWithText variant="outline" icon={<Upload/>} text="Upload" description="Import content from a file"/></article><article><span>M · 208 × 160px</span><IconButtonWithText size="m" icon={<Plus/>} text="Add manually" description="Browse and select individual items"/></article></div></section>
 <section className="cvp-input-doc__panel"><header><b>04</b><div><h2>Theme parity</h2><p>Surface, text, description, icon tile, border, and focus resolve locally in each theme.</p></div></header><div className="cvp-input-doc__themes"><article data-theme="dark"><span>Dark</span><IconButtonWithText icon={<Filter/>} text="Add filters" description="Build a content query"/></article><article data-theme="light"><span>Light</span><IconButtonWithText icon={<Filter/>} text="Add filters" description="Build a content query"/></article></div></section>
 <section className="cvp-input-doc__panel"><header><b>05</b><div><h2>Token contract</h2><p>Every visual decision resolves through the registered Tier 3 icon-with-text contract.</p></div></header><ComponentTokenContract label="Icon Button with Text token contract" rows={rows}/></section>
 <section className="cvp-input-doc__grid"><article className="cvp-input-doc__panel"><header><b>06</b><div><h2>Accessibility contract</h2></div></header><ul><li>Use a native button and an action-oriented visible title.</li><li>The icon is decorative and does not duplicate the name.</li><li>Keep descriptions concise and distinguishable between choices.</li><li>Focus remains visible for all input methods.</li><li>Loading exposes busy state and prevents repeat activation.</li></ul></article><article className="cvp-input-doc__panel"><header><b>07</b><div><h2>Usage decisions</h2></div></header><ul><li>Use when an icon alone would be ambiguous.</li><li>Use M for mutually exclusive creation or setup paths.</li><li>Use ordinary buttons for simple form submission.</li><li>Avoid paragraphs or instructions inside the control.</li><li>Do not use multiple icons or nested interactive elements.</li></ul></article></section>
 <footer className="cvp-input-doc__footer"><span>CVP labeled action reference</span><p>Visible name · Optional description · Two layouts · Loading · Themes</p></footer>
</main>}
