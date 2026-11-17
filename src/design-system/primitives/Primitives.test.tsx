import React, { createRef, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Check } from 'lucide-react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AspectRatio, Avatar, AvatarFallback, Box, ButtonGroup, Caption, Container, Grid,
  Heading, HelperText, Icon, Image, Inline, Label, Link, OutlineButton, Paragraph,
  PrimaryButton, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar,
  SecondaryButton, Separator, Slider, Spacer, Stack, Switch, Text, TextInput,
  Tooltip, ValidationMessage,
} from '../index';

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
});
afterEach(() => vi.unstubAllGlobals());

describe('content and layout primitives', () => {
  it('preserves native semantics, attributes, heading level and refs', () => {
    const heading = createRef<HTMLHeadingElement>();
    const image = createRef<HTMLImageElement>();
    const link = createRef<HTMLAnchorElement>();
    const text = createRef<HTMLSpanElement>();
    render(<>
      <Heading level={3} size="display" ref={heading}>Details</Heading>
      <Paragraph>Body <Text tone="muted" ref={text}>Supporting text</Text></Paragraph>
      <Caption>Caption</Caption>
      <Link ref={link} href="#details">Read details</Link>
      <Image ref={image} alt="Landscape" src="/sample.png" loading="lazy" />
      <Icon icon={Check} label="Available" />
      <Icon icon={Check} data-testid="decorative" />
    </>);
    expect(screen.getByRole('heading', { level: 3, name: 'Details' })).toBe(heading.current);
    expect(heading.current).toHaveClass('cvp-heading--display');
    expect(link.current).toHaveAttribute('href', '#details');
    expect(image.current).toHaveAttribute('alt', 'Landscape');
    expect(image.current).toHaveAttribute('loading', 'lazy');
    expect(text.current).toHaveClass('cvp-text--muted');
    expect(screen.getByRole('img', { name: 'Available' })).not.toHaveAttribute('aria-hidden');
    expect(screen.getByTestId('decorative')).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports labelled custom field composition without losing external descriptions', () => {
    render(<>
      <Label htmlFor="project">Project</Label>
      <TextInput id="project" required error="Required project" aria-describedby="guidance" />
      <HelperText id="guidance">Use a short name.</HelperText>
      <ValidationMessage id="custom-error">Additional validation</ValidationMessage>
    </>);
    const input = screen.getByRole('textbox', { name: 'Project' });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Use a short name. Required project');
    expect(screen.getByText('Additional validation')).toHaveAttribute('role', 'alert');
  });

  it('forwards layout refs, attributes and caller classes without introducing landmarks', () => {
    const box = createRef<HTMLDivElement>();
    const container = createRef<HTMLDivElement>();
    const stack = createRef<HTMLDivElement>();
    const inline = createRef<HTMLDivElement>();
    const grid = createRef<HTMLDivElement>();
    const spacer = createRef<HTMLDivElement>();
    render(<Container ref={container} size="reading"><Box ref={box} padding="md" surface="raised" className="custom">
      <Stack ref={stack} gap="sm"><Inline ref={inline} wrap={false} justify="between"><Spacer ref={spacer} /></Inline><Grid ref={grid} columns={3} /></Stack>
    </Box></Container>);
    expect(container.current).toHaveClass('cvp-container--reading');
    expect(box.current).toHaveClass('cvp-box--padding-md', 'custom');
    expect(stack.current).toHaveClass('cvp-gap-sm');
    expect(inline.current).toHaveClass('cvp-inline--nowrap', 'cvp-inline--justify-between');
    expect(grid.current).toHaveClass('cvp-grid--3');
    expect(spacer.current).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it('uses named groups with normal Tab order, not toolbar arrow semantics', async () => {
    const user = userEvent.setup();
    render(<ButtonGroup label="Actions"><PrimaryButton>Save</PrimaryButton><SecondaryButton>Cancel</SecondaryButton></ButtonGroup>);
    expect(screen.getByRole('group', { name: 'Actions' })).toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  });

  it.each([PrimaryButton, SecondaryButton, OutlineButton])('composes a native action ref with Tooltip (%#)', async Button => {
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render(<Tooltip content="Save this record" delayDuration={0}><Button ref={ref}>Save</Button></Tooltip>);
    expect(screen.getByRole('button', { name: 'Save' })).toBe(ref.current);
    expect(ref.current).toHaveAttribute('data-state', 'closed');
    rerender(<Button ref={ref} loading loadingText="Saving">Save</Button>);
    expect(ref.current).toBeDisabled();
    expect(ref.current).toHaveAttribute('aria-busy', 'true');
    expect(ref.current).toHaveAccessibleName('Saving');
    expect(ref.current).toHaveAttribute('type', 'button');
  });

  it('preserves avatar fallback and optional separator semantics', () => {
    const avatar = createRef<HTMLSpanElement>();
    const ratio = createRef<HTMLDivElement>();
    render(<>
      <Avatar ref={avatar}><AvatarFallback role="img" aria-label="Ada Lovelace">AL</AvatarFallback></Avatar>
      <Separator data-testid="decorative-separator" />
      <Separator decorative={false} orientation="vertical" />
      <AspectRatio ratio={16 / 9} ref={ratio}><span>Media</span></AspectRatio>
    </>);
    expect(avatar.current).toHaveClass('cvp-avatar');
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByTestId('decorative-separator')).toHaveAttribute('role', 'none');
    expect(ratio.current).toHaveAttribute('data-slot', 'aspect-ratio');
  });

  it('exposes the focusable named scrolling viewport separately from the root', () => {
    const root = createRef<HTMLDivElement>();
    const viewport = createRef<HTMLDivElement>();
    render(<ScrollArea ref={root} viewportRef={viewport} viewportProps={{ role: 'region', 'aria-label': 'History', className: 'custom-viewport' }}><p>Item</p><ScrollBar orientation="horizontal" /></ScrollArea>);
    expect(screen.getByRole('region', { name: 'History' })).toBe(viewport.current);
    expect(viewport.current).toHaveAttribute('tabindex', '0');
    expect(viewport.current).toHaveClass('custom-viewport');
    expect(root.current).not.toBe(viewport.current);
  });
});

describe('elevated selection and progress primitives', () => {
  it('supports uncontrolled binary switch keyboard selection and native form data', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<form><Switch ref={ref} id="notifications" name="notifications" onCheckedChange={onChange} /><Label htmlFor="notifications">Notifications</Label></form>);
    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control).toBe(ref.current);
    await user.tab();
    await user.keyboard(' ');
    expect(control).toBeChecked();
    expect(onChange).toHaveBeenCalledOnce();
    expect(new FormData(container.querySelector('form')!).get('notifications')).toBe('on');
  });

  it('leaves controlled state with its owner and blocks disabled changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Switch aria-label="Setting" checked={false} onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).not.toBeChecked();
    rerender(<Switch aria-label="Setting" checked disabled onCheckedChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('uses arrow selection, skips disabled radios, and submits the selected value', async () => {
    const user = userEvent.setup();
    const { container } = render(<form><RadioGroup aria-label="Delivery" name="delivery" defaultValue="daily">
      <RadioGroupItem aria-label="Daily" value="daily" />
      <RadioGroupItem aria-label="Unavailable" value="unavailable" disabled />
      <RadioGroupItem aria-label="Weekly" value="weekly" />
    </RadioGroup></form>);
    await user.tab();
    expect(screen.getByRole('radio', { name: 'Daily' })).toHaveFocus();
    await user.keyboard('{ArrowDown>}');
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Weekly' })).toBeChecked());
    await user.keyboard('{/ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Weekly' })).toHaveFocus();
    expect(new FormData(container.querySelector('form')!).get('delivery')).toBe('weekly');
  });

  it('supports controlled radio state and a fully disabled group', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<RadioGroup aria-label="Choice" value="a" onValueChange={onChange}><RadioGroupItem value="a" aria-label="A" /><RadioGroupItem value="b" aria-label="B" /></RadioGroup>);
    await user.click(screen.getByRole('radio', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('radio', { name: 'A' })).toBeChecked();
    rerender(<RadioGroup aria-label="Choice" disabled defaultValue="a"><RadioGroupItem value="a" aria-label="A" /></RadioGroup>);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('aligns the default thumb with min and exposes labels and support text on thumbs', async () => {
    const user = userEvent.setup();
    render(<><Slider min={10} max={20} aria-label="Volume" aria-describedby="volume-help" /><HelperText id="volume-help">Adjust the volume</HelperText></>);
    const thumb = screen.getByRole('slider', { name: 'Volume' });
    expect(screen.getAllByRole('slider')).toHaveLength(1);
    expect(thumb).toHaveAttribute('aria-valuenow', '10');
    expect(thumb).toHaveAccessibleDescription('Adjust the volume');
    thumb.focus();
    await user.keyboard('{ArrowRight}');
    expect(thumb).toHaveAttribute('aria-valuenow', '11');
    await user.keyboard('{End}');
    expect(thumb).toHaveAttribute('aria-valuenow', '20');
    await user.keyboard('{Home}');
    expect(thumb).toHaveAttribute('aria-valuenow', '10');
  });

  it('supports controlled ranges, named thumbs, disabled state and native values', async () => {
    const user = userEvent.setup();
    function Range() {
      const [value, setValue] = useState([20, 80]);
      return <form><Slider name="price" thumbLabels={['Minimum price', 'Maximum price']} value={value} onValueChange={setValue} /></form>;
    }
    const { container, rerender } = render(<Range />);
    screen.getByRole('slider', { name: 'Minimum price' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(new FormData(container.querySelector('form')!).getAll('price[]')).toEqual(['21', '80']);
    rerender(<Slider disabled defaultValue={[25]} aria-label="Unavailable" />);
    const disabledThumb = screen.getByRole('slider', { name: 'Unavailable' });
    expect(disabledThumb).toHaveAttribute('aria-disabled', 'true');
    fireEvent.keyDown(disabledThumb, { key: 'ArrowRight' });
    expect(disabledThumb).toHaveAttribute('aria-valuenow', '25');
    rerender(<form><Slider name="disabled-price" disabled defaultValue={[25]} aria-label="Unavailable" /></form>);
    expect(new FormData(container.querySelector('form')!).has('disabled-price')).toBe(false);
  });

  it('keeps progress numeric semantics, custom max, zero and indeterminate state aligned', () => {
    const ref = createRef<HTMLDivElement>();
    const { rerender } = render(<Progress ref={ref} aria-label="Work" value={25} max={50} />);
    const progress = screen.getByRole('progressbar', { name: 'Work' });
    expect(progress).toBe(ref.current);
    expect(progress).toHaveAttribute('aria-valuenow', '25');
    expect(progress).toHaveAttribute('aria-valuemax', '50');
    expect(progress.firstElementChild).toHaveStyle({ width: '50%' });
    rerender(<Progress aria-label="Work" value={0} />);
    expect(progress).toHaveAttribute('aria-valuenow', '0');
    expect(progress.firstElementChild).toHaveStyle({ width: '0%' });
    rerender(<Progress aria-label="Work" value={null} />);
    expect(progress).not.toHaveAttribute('aria-valuenow');
    expect(progress).toHaveAttribute('data-state', 'indeterminate');
    expect(progress.firstElementChild?.getAttribute('style') ?? '').toBe('');
  });
});
