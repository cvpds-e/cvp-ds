import React from 'react';
import './ElevationFoundationPreview.css';

const planes = [
  ['Canvas','0','Root environment'],['Section','0','Quiet grouping'],['Surface','1','Contained work'],
  ['Raised','2','Contained priority'],['Overlay','3','Blocking suppression'],['Elevated','4','Active foreground'],
];

function ThemeStack({theme}:{theme:'dark'|'light'}) {
  return <article className={`cvp-elevation-stack cvp-elevation-stack--${theme}`} data-theme={theme}>
    <header><strong>{theme} depth</strong><span>Equivalent perception</span></header>
    <div className="cvp-elevation-stack__canvas">
      <div className="cvp-elevation-stack__section"><small>Section · 0</small><div className="cvp-elevation-stack__surface"><small>Surface · 1</small><div className="cvp-elevation-stack__raised"><small>Raised · 2</small></div></div></div>
      <div className="cvp-elevation-stack__menu"><strong>Elevated menu</strong><span>Foreground · 4</span><button>Open rail</button></div>
    </div>
  </article>;
}

export function ElevationFoundationPreview(){return <main className="cvp-elevation-preview">
  <header className="cvp-elevation-hero"><div><span>Foundation 06 · Implemented preview</span><h1>Depth expresses<br/>priority.</h1></div><p>Surfaces stay quiet until their relationship truly changes. Shadows communicate containment, detachment, and interruption—not decoration.</p></header>
  <section className="cvp-elevation-panel"><header><b>01</b><div><h2>Surface model</h2><p>Six roles occupy five stable depth levels.</p></div></header><div className="cvp-elevation-planes">{planes.map(([name,depth,note])=><article className={`is-${name.toLowerCase()}`} key={name}><i/><strong>{name}</strong><small>{note}</small><code>depth.{depth}</code></article>)}</div></section>
  <section className="cvp-elevation-panel"><header><b>02</b><div><h2>Theme parity</h2><p>Shadow opacity changes by theme; perceived hierarchy does not.</p></div></header><div className="cvp-elevation-themes"><ThemeStack theme="dark"/><ThemeStack theme="light"/></div></section>
  <section className="cvp-elevation-panel"><header><b>03</b><div><h2>Blocking interruption</h2><p>Overlay and Elevated are a required pair for modal experiences.</p></div></header><div className="cvp-elevation-blocking"><div className="cvp-elevation-blocking__page"><i/><i/><i/></div><div className="cvp-elevation-blocking__scrim"/><article><span>ACTIVE FOREGROUND · DEPTH 4</span><h3>Publish editorial rail?</h3><p>The background is suppressed, not elevated. Focus belongs inside this foreground plane.</p><footer><button>Cancel</button><button>Publish</button></footer></article></div></section>
  <section className="cvp-elevation-panel"><header><b>04</b><div><h2>Interaction stability</h2><p>Ordinary states do not change a surface’s resting depth.</p></div></header><div className="cvp-elevation-states"><article><i>Rest</i><strong>Stable</strong><small>Assigned plane</small></article><article><i>Hover</i><strong>No lift</strong><small>Color or border only</small></article><article><i>Focus</i><strong>No lift</strong><small>Accessible ring only</small></article><article className="is-drag"><i>Drag</i><strong>Temporary lift</strong><small>Collapses on release</small></article></div></section>
  <footer className="cvp-elevation-footer"><span>Implementation status</span><p>Shared shadows, scrim, and depth tiers are active. Local recipes migrate during component review.</p></footer>
</main>}
