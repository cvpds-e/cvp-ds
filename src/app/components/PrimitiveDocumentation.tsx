import { useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import {
  AspectRatio, Avatar, AvatarFallback, Box, ButtonGroup, Caption, Container,
  Grid, Heading, HelperText, Icon, Image, Inline, Label, Link, Paragraph,
  PrimaryButton, Progress, RadioGroup, RadioGroupItem, ScrollArea,
  SecondaryButton, Separator, Slider, Spacer, Stack, Switch, Text, TextInput,
  UnsavedChangesFooter, ValidationMessage,
} from '../../design-system';
import { DESIGN_SYSTEM_CATALOG } from '../designSystemCatalog';
import './DesignSystemCatalog.css';

interface Example {
  preview: ReactNode;
  code: string;
  guidance: string;
}

const imageSource = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="90"%3E%3Crect width="160" height="90" fill="%233d63dd"/%3E%3C/svg%3E';

function DraftExample() {
  const [status, setStatus] = useState('Unsaved changes');
  const [title, setTitle] = useState('Example draft');
  const [savedTitle, setSavedTitle] = useState('Example draft');
  return <Stack>
    <TextInput label="Draft title" value={title} onChange={event => { setTitle(event.currentTarget.value); setStatus('Unsaved changes'); }} />
    {status === 'Unsaved changes'
      ? <UnsavedChangesFooter onSave={() => { setSavedTitle(title); setStatus('Draft saved'); }} onCancel={() => { setTitle(savedTitle); setStatus('Changes discarded'); }} />
      : <Paragraph role="status">{status}. Edit the title to try again.</Paragraph>}
  </Stack>;
}

export const PRIMITIVE_EXAMPLES: Record<string, Example> = {
  text: {
    preview: <Inline><Text>Primary text</Text><Text tone="muted">Supplementary text</Text><Text tone="success">Available</Text></Inline>,
    code: '<Text tone="muted">Supplementary text</Text>',
    guidance: 'Text renders a span. Prefer wrapping; opt into truncate only when the complete content remains available. Do not rely on colour alone for status.',
  },
  heading: {
    preview: <Heading level={3} size="title">A semantic section heading</Heading>,
    code: '<Heading level={3} size="title">Section heading</Heading>',
    guidance: 'Choose level from the document outline, then choose size independently. Do not skip levels to obtain a visual style.',
  },
  paragraph: {
    preview: <Paragraph>Body copy uses a native paragraph and the shared reading rhythm.</Paragraph>,
    code: '<Paragraph>Body copy</Paragraph>',
    guidance: 'Use for blocks of prose, not as a substitute for a label or heading.',
  },
  caption: {
    preview: <Caption>Last updated a moment ago</Caption>,
    code: '<Caption>Last updated a moment ago</Caption>',
    guidance: 'Caption renders small. Keep supporting text legible; do not use it to hide essential instructions.',
  },
  link: {
    preview: <Link href="?page=token-architecture">Read the token architecture</Link>,
    code: '<Link href="?page=token-architecture">Token architecture</Link>',
    guidance: 'Use href for navigation and a button for actions. Provide descriptive link text; native keyboard and browser link behavior are preserved.',
  },
  icon: {
    preview: <Inline><Icon icon={Check} label="Available" /><Icon icon={Check} size="large" /><Text>The adjacent check is decorative.</Text></Inline>,
    code: 'import { Check } from \'lucide-react\';\n<Icon icon={Check} label="Available" size="medium" />',
    guidance: 'Omit label for decorative icons. Give meaningful standalone icons a label. Sizes and stroke use shared icon tokens.',
  },
  image: {
    preview: <Image src={imageSource} alt="Blue rectangular example artwork" width={160} height={90} />,
    code: '<Image src="/artwork.jpg" alt="Describe the artwork" width={160} height={90} />',
    guidance: 'Supply meaningful alt, or alt="" when decorative. Intrinsic dimensions prevent layout shift; the image shrinks within its container.',
  },
  avatar: {
    preview: <Avatar><AvatarFallback role="img" aria-label="Sample profile">SP</AvatarFallback></Avatar>,
    code: '<Avatar>\n  <AvatarImage src="/profile.jpg" alt="Sam Patel" />\n  <AvatarFallback role="img" aria-label="Sam Patel">SP</AvatarFallback>\n</Avatar>',
    guidance: 'Compose AvatarImage and AvatarFallback. Name meaningful images and fallbacks; avoid duplicate identity announcements when adjacent text already supplies the name.',
  },
  label: {
    preview: <Stack gap="sm"><Label htmlFor="example-label">Project name (required)</Label><TextInput id="example-label" required /></Stack>,
    code: '<Label htmlFor="project">Project name (required)</Label>\n<TextInput id="project" required />',
    guidance: 'Match htmlFor to the control id. Native required communicates requirement; visible wording must also identify required fields.',
  },
  'helper-text': {
    preview: <Stack gap="sm"><TextInput label="Project slug" aria-describedby="example-helper" /><HelperText id="example-helper">Use letters, numbers, and hyphens.</HelperText></Stack>,
    code: '<TextInput label="Project slug" aria-describedby="slug-help" />\n<HelperText id="slug-help">Use letters, numbers, and hyphens.</HelperText>',
    guidance: 'HelperText does not associate itself automatically. Give it a stable id and include that id in the control aria-describedby.',
  },
  'validation-message': {
    preview: <Stack gap="sm"><TextInput label="Project name" required aria-invalid="true" aria-describedby="example-error" /><ValidationMessage id="example-error">Enter a project name.</ValidationMessage></Stack>,
    code: '<TextInput label="Project name" aria-invalid="true" aria-describedby="project-error" />\n<ValidationMessage id="project-error">Enter a project name.</ValidationMessage>',
    guidance: 'Associate the message using aria-describedby and mark the control invalid. The default alert role announces dynamically inserted errors; do not communicate an error using colour alone.',
  },
  'radio-group': {
    preview: <RadioGroup aria-label="Delivery schedule" defaultValue="daily"><Inline><RadioGroupItem value="daily" id="example-daily" /><Label htmlFor="example-daily">Daily</Label></Inline><Inline><RadioGroupItem value="weekly" id="example-weekly" /><Label htmlFor="example-weekly">Weekly</Label></Inline></RadioGroup>,
    code: '<RadioGroup aria-label="Delivery schedule" name="delivery" defaultValue="daily">\n  <RadioGroupItem id="daily" value="daily" />\n  <Label htmlFor="daily">Daily</Label>\n</RadioGroup>',
    guidance: 'Name the group and each choice. Tab enters the selection; arrow keys move and select. Use value/onValueChange for controlled usage or defaultValue for uncontrolled usage.',
  },
  switch: {
    preview: <Inline><Switch id="example-switch" defaultChecked /><Label htmlFor="example-switch">Notifications</Label><Switch id="example-disabled-switch" disabled /><Label htmlFor="example-disabled-switch">Unavailable setting</Label></Inline>,
    code: '<Switch id="notifications" name="notifications" defaultChecked />\n<Label htmlFor="notifications">Notifications</Label>',
    guidance: 'Use for an on/off setting, not a multi-choice option. Space toggles. Supports checked/onCheckedChange, defaultChecked, disabled, and form names.',
  },
  slider: {
    preview: <Stack><Slider aria-label="Volume" defaultValue={[40]} /><Slider thumbLabels={['Minimum price', 'Maximum price']} defaultValue={[20, 80]} /><Slider aria-label="Unavailable volume" defaultValue={[40]} disabled /></Stack>,
    code: '<Slider aria-label="Volume" defaultValue={[40]} />\n<Slider defaultValue={[20, 80]} thumbLabels={[\'Minimum price\', \'Maximum price\']} />',
    guidance: 'Name every thumb. Arrow keys adjust and Home/End reach limits. Supports value/onValueChange and defaultValue. Disabled sliders omit named values from native submission.',
  },
  box: {
    preview: <Box padding="md" surface="sunken"><Text>A reusable inset surface</Text></Box>,
    code: '<Box padding="md" surface="raised">Content</Box>',
    guidance: 'A Box is a neutral div, not a Card or landmark. Supply native semantic elements inside it when required. Padding uses density-aware semantic spacing.',
  },
  container: {
    preview: <Container size="reading"><Paragraph>A reading-width container constrains prose while respecting the available viewport.</Paragraph></Container>,
    code: '<Container size="reading"><Paragraph>Reading content</Paragraph></Container>',
    guidance: 'Choose page or reading width. Container constrains width but does not supply landmark semantics.',
  },
  stack: {
    preview: <Stack gap="sm"><Text>First item</Text><Text>Second item</Text><Text>Third item</Text></Stack>,
    code: '<Stack gap="sm"><Text>First item</Text><Text>Second item</Text></Stack>',
    guidance: 'Vertical flex keeps DOM and reading order intact. Gap accepts none, xs, sm, md, lg, or xl.',
  },
  inline: {
    preview: <Inline gap="sm"><Text>First item</Text><Text>Second item</Text><Text>Items wrap when space is constrained.</Text></Inline>,
    code: '<Inline gap="sm" align="center" justify="between">...</Inline>',
    guidance: 'Horizontal flex wraps by default. Disable wrapping only when a deliberate, accessible overflow strategy exists. Do not reorder meaningful content visually.',
  },
  grid: {
    preview: <Grid columns={2}><Box padding="sm" surface="sunken">First column</Box><Box padding="sm" surface="sunken">Second column</Box></Grid>,
    code: '<Grid columns={2} gap="md">...</Grid>\n<Grid>Auto-fitting columns</Grid>',
    guidance: 'Omit columns to auto-fit, or choose one through four. Fixed columns collapse below 600px. Preserve DOM order and allow content to shrink.',
  },
  spacer: {
    preview: <Inline><Text>Leading content</Text><Spacer /><Text>Trailing content</Text></Inline>,
    code: '<Inline><Text>Leading</Text><Spacer /><Text>Trailing</Text></Inline>',
    guidance: 'A flexible decorative div, hidden from assistive technology. Use parent gap for fixed spacing and Spacer only for flexible distribution.',
  },
  separator: {
    preview: <Stack><Text>First section</Text><Separator decorative={false} /><Text>Second section</Text></Stack>,
    code: '<Separator decorative={false} orientation="horizontal" />',
    guidance: 'Decorative by default. Set decorative={false} for a meaningful separator; orientation supports horizontal and vertical.',
  },
  'aspect-ratio': {
    preview: <Box className="cvp-catalog-detail__media"><AspectRatio ratio={16 / 9}><Box padding="md" surface="sunken">16:9 media space</Box></AspectRatio></Box>,
    code: '<Box className="constrained-media">\n  <AspectRatio ratio={16 / 9}>Media</AspectRatio>\n</Box>',
    guidance: 'Constrain the parent width, not only the inner Radix element. ratio defaults to one. Alternative text belongs to the media, not the geometry wrapper.',
  },
  'scroll-area': {
    preview: <ScrollArea className="cvp-catalog-detail__scroll" viewportProps={{ role: 'region', 'aria-label': 'Scrollable items' }}><Stack>{Array.from({ length: 12 }, (_, index) => <Paragraph key={index}>Scrollable item {index + 1}</Paragraph>)}</Stack></ScrollArea>,
    code: '<ScrollArea className="constrained-height" viewportProps={{ role: \'region\', \'aria-label\': \'Items\' }}>\n  Content\n</ScrollArea>',
    guidance: 'Constrain height and name meaningful regions. The viewport is keyboard focusable. Use viewportRef for scrolling; compose ScrollBar for intentional horizontal overflow.',
  },
  'button-group': {
    preview: <ButtonGroup label="Draft actions"><PrimaryButton>Save draft</PrimaryButton><SecondaryButton>Cancel draft</SecondaryButton></ButtonGroup>,
    code: '<ButtonGroup label="Draft actions">\n  <PrimaryButton onClick={save}>Save</PrimaryButton>\n  <SecondaryButton onClick={cancel}>Cancel</SecondaryButton>\n</ButtonGroup>',
    guidance: 'A labelled group, not a toolbar. Children keep normal Tab order; wrapping is enabled by default. The group does not own application actions.',
  },
  progress: {
    preview: <Stack><Progress value={25} max={50} aria-label="Completed work" /><Progress value={null} aria-label="Pending work" /></Stack>,
    code: '<Progress value={25} max={50} aria-label="Completed work" />\n<Progress value={null} aria-label="Pending work" />',
    guidance: 'Name the pending work. Numeric value/max expose completion; null or undefined is indeterminate. Reduced motion keeps a static indicator; zero is a determinate value.',
  },
  'date-input': {
    preview: <TextInput type="date" label="Publication date" name="publication-date" />,
    code: '<TextInput type="date" label="Publication date" name="publication-date" />',
    guidance: 'Use the existing TextInput native date capability. The browser owns formatting and picker UI; custom range selection belongs to DatePicker.',
  },
  'time-input': {
    preview: <TextInput type="time" label="Publication time" name="publication-time" />,
    code: '<TextInput type="time" label="Publication time" name="publication-time" />',
    guidance: 'Use the existing TextInput native time capability. Specify timezone context in helper text when the application requires it.',
  },
  'file-input': {
    preview: <TextInput type="file" label="Attachment" name="attachment" helperText="Choose a local file. This example does not upload it." />,
    code: '<TextInput type="file" label="Attachment" name="attachment" />',
    guidance: 'Native file selection is supported, not upload transport or drag-and-drop. Application code must validate files and implement progress, cancellation, and upload errors.',
  },
  'unsaved-changes-footer': {
    preview: <DraftExample />,
    code: '<UnsavedChangesFooter onSave={saveDraft} onCancel={discardDraft} saveDisabled={saving} />',
    guidance: 'This is a workflow pattern, not a primitive. Keep save/cancel callbacks application-owned and announce their outcomes. additionalActions supports contextual actions.',
  },
};

export function PrimitiveDocumentation({ id }: { id: string }) {
  const entry = DESIGN_SYSTEM_CATALOG.find(item => item.id === id);
  const example = PRIMITIVE_EXAMPLES[id];
  if (!entry || !example) throw new Error(`Missing catalogue documentation for ${id}`);
  return <article className="cvp-catalog-detail">
    <Container>
      <Stack gap="lg">
        <header><Caption>{entry.category}</Caption><Heading level={1} size="headline">{entry.label}</Heading><Paragraph>{entry.description}</Paragraph></header>
        <section aria-label="Live example"><Stack><Heading>Live example</Heading><Box className="cvp-catalog-detail__preview">{example.preview}</Box></Stack></section>
        <section aria-label="Usage"><Stack><Heading>Usage</Heading><Paragraph>Import from <code>src/design-system</code>.</Paragraph><pre><code>{example.code}</code></pre></Stack></section>
        <section aria-label="Composition and accessibility"><Stack><Heading>Composition and accessibility</Heading><Paragraph>{example.guidance}</Paragraph></Stack></section>
        <Inline><Link href="?page=components">All components and foundations</Link><Link href="?page=primitives">Composed primitive gallery</Link><Link href="?page=accessibility">Accessibility requirements</Link></Inline>
      </Stack>
    </Container>
  </article>;
}
