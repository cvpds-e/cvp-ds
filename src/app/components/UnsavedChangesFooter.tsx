import React from 'react';
import { Save } from 'lucide-react';
import { OutlineButton } from './OutlineButton';
import { PrimaryButton } from './PrimaryButton';
import './UnsavedChangesFooter.css';

interface UnsavedChangesFooterProps {
  onSave: () => void;
  onCancel: () => void;
  saveDisabled?: boolean;
  className?: string;
}

/** A persistent panel action area for editable workspace drafts. */
export function UnsavedChangesFooter({ onSave, onCancel, saveDisabled = false, className = '' }: UnsavedChangesFooterProps) {
  return <footer className={`cvp-unsaved-changes-footer ${className}`.trim()} aria-label="Unsaved changes">
    <div className="cvp-unsaved-changes-footer__status" role="status" aria-live="polite"><span aria-hidden="true" /> <strong>Unsaved changes</strong></div>
    <div className="cvp-unsaved-changes-footer__actions"><PrimaryButton onClick={onSave} disabled={saveDisabled}><Save size={15} /> Save changes</PrimaryButton><OutlineButton onClick={onCancel}>Cancel</OutlineButton></div>
  </footer>;
}
