import { createRef } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MiscInput } from './MiscInput';
import { SearchField } from './SearchField';
import { TextInput } from './TextInput';

describe('SearchField', () => {
  it('tracks uncontrolled typing, clears current content, and restores input focus', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(<SearchField ref={ref} label="Search records" onChange={onChange} onClear={onClear} />);
    expect(screen.queryByRole('button', { name: 'Clear search records' })).not.toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'Current query');
    expect(onChange).toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Clear search records' }));
    expect(ref.current).toHaveValue('');
    expect(ref.current).toHaveFocus();
    expect(onClear).toHaveBeenCalledOnce();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('preserves controlled ownership, readonly and disabled states', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    const { rerender } = render(<SearchField value="owned" onChange={() => undefined} onClear={onClear} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('searchbox')).toHaveValue('owned');
    expect(onClear).toHaveBeenCalledOnce();
    rerender(<SearchField value="owned" readOnly onClear={onClear} />);
    expect(screen.getByRole('button')).toBeDisabled();
    await user.click(screen.getByRole('button'));
    expect(onClear).toHaveBeenCalledOnce();
    rerender(<SearchField value="owned" disabled onClear={onClear} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });

  it('tracks native form reset and emptying by typing', async () => {
    const user = userEvent.setup();
    const { container } = render(<form><SearchField defaultValue="initial" onClear={() => undefined} /></form>);
    await user.clear(screen.getByRole('searchbox'));
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    act(() => container.querySelector('form')!.reset());
    expect(screen.getByRole('searchbox')).toHaveValue('initial');
    expect(screen.getByRole('button')).toHaveAccessibleName('Clear search');
  });
});

describe('MiscInput copy composition', () => {
  it('copies the current uncontrolled DOM value and forwards the native ref', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(<MiscInput ref={ref} label="Value" defaultValue="old" showCopy onCopy={onCopy} />);
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'current');
    await user.click(screen.getByRole('button', { name: 'Copy input value' }));
    expect(onCopy).toHaveBeenCalledWith('current');
    expect(ref.current).toHaveValue('current');
    expect(screen.getByRole('status')).toHaveTextContent('Copied to clipboard');
  });

  it('awaits asynchronous copy and announces/logs a rejected operation, never success', async () => {
    const user = userEvent.setup();
    const error = new Error('Clipboard permission denied');
    const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    render(<MiscInput label="Value" value="current" readOnly showCopy onCopy={async () => { throw error; }} />);
    await user.click(screen.getByRole('button', { name: 'Copy input value' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Unable to copy'));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(log).toHaveBeenCalledWith('Unable to copy input value', error);
    expect(screen.getByRole('button', { name: 'Copy input value' })).toBeEnabled();
  });

  it('disables duplicate copy while pending and clears timers on unmount', async () => {
    const user = userEvent.setup();
    let finish: (() => void) | undefined;
    const copy = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
    const clearTimer = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = render(<MiscInput label="Value" showCopy onCopy={copy} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
    finish?.();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Copied'));
    unmount();
    expect(clearTimer).toHaveBeenCalled();
  });
});

it('retains native date, time and file capabilities rather than adding renamed inputs', async () => {
  const user = userEvent.setup();
  render(<><TextInput type="date" label="Date" required /><TextInput type="time" label="Time" /><TextInput type="file" label="Attachment" /></>);
  expect(screen.getByLabelText('Date', { exact: false })).toHaveAttribute('type', 'date');
  expect(screen.getByLabelText('Time')).toHaveAttribute('type', 'time');
  const file = new File(['image'], 'example.png', { type: 'image/png' });
  const attachment = screen.getByLabelText<HTMLInputElement>('Attachment');
  await user.upload(attachment, file);
  expect(attachment).toHaveAttribute('type', 'file');
  expect(attachment.files?.[0]).toBe(file);
});
