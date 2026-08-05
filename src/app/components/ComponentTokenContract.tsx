import React from 'react';

export type ComponentTokenContractRow = {
  role: string;
  token: string;
  source: string;
  contract: string;
  activation: string;
};

export function ComponentTokenContract({ label, rows }: { label: string; rows: ComponentTokenContractRow[] }) {
  return <div className="cvp-input-doc__table cvp-input-doc__table--contract" role="table" aria-label={label}>
    <div className="cvp-input-doc__table-head" role="row">
      <strong role="columnheader">Role</strong>
      <strong role="columnheader">Tier 3 token</strong>
      <strong role="columnheader">Canonical source</strong>
      <strong role="columnheader">Resolved contract</strong>
      <strong role="columnheader">Activation</strong>
    </div>
    {rows.map(row => <div role="row" key={`${row.token}-${row.activation}`}>
      <strong role="cell">{row.role}</strong>
      <code role="cell">{row.token}</code>
      <code role="cell">{row.source}</code>
      <span role="cell">{row.contract}</span>
      <span role="cell">{row.activation}</span>
    </div>)}
  </div>;
}
