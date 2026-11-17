import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  AspectRatio, Avatar, AvatarFallback, Box, ButtonGroup, Caption,
  Container, Grid, Heading, HelperText, Icon, Image, Inline, Label, Link,
  Paragraph, PrimaryButton, Progress, RadioGroup, RadioGroupItem, ScrollArea,
  SearchField, SecondaryButton, Separator, Slider, Spacer, Stack, Switch, Text,
  TextInput, Tooltip, ValidationMessage,
} from '../../design-system';
import './PrimitivesDocumentation.css';

const sampleImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="90"%3E%3C/svg%3E';

export function PrimitivesDocumentation({ theme }: { theme?: 'light' | 'dark' }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState([40]);
  const [search, setSearch] = useState('');
  return <article className="cvp-primitives-doc" data-theme={theme}>
    <Container>
      <Stack gap="lg">
        <header>
          <Caption>Foundations → Tokens → Primitives → Components → Patterns → Templates</Caption>
          <Heading level={1} size="headline">Primitives</Heading>
          <Paragraph>Small, theme-aware building blocks. Compose these before creating a new control or workflow.</Paragraph>
          <Link href="?page=primitives-full">Open isolated responsive preview</Link>
        </header>

        <section aria-labelledby="primitives-content-title">
          <Stack>
            <Heading level={2} id="primitives-content-title">Content and semantics</Heading>
            <Box padding="md" surface="raised">
              <Stack gap="sm">
                <Heading level={3}>Semantic heading, independent visual size</Heading>
                <Paragraph>A paragraph keeps its native meaning. <Text tone="muted">Supplementary text</Text> uses an existing semantic foreground.</Paragraph>
                <Caption>A caption is supporting content, not a substitute for a label.</Caption>
                <Inline>
                  <Icon icon={Check} label="Available" />
                  <Avatar>
                    <AvatarFallback role="img" aria-label="Sample profile">SP</AvatarFallback>
                  </Avatar>
                  <Text>Icon and avatar alternatives remain explicit.</Text>
                </Inline>
                <Box className="cvp-primitives-doc__media">
                  <AspectRatio ratio={16 / 9}>
                    <Image src={sampleImage} alt="" width={160} height={90} />
                  </AspectRatio>
                </Box>
                <Text className="cvp-primitives-doc__long-text">LongUnbrokenContentMustWrapRatherThanForceTheViewportToScrollHorizontallyEvenAtThreeHundredAndTwentyPixels</Text>
                <Text truncate title="Truncated text retains its full DOM content">This text deliberately truncates when its container is too narrow to show the entire sentence.</Text>
              </Stack>
            </Box>
          </Stack>
        </section>

        <Separator decorative={false} />

        <section aria-labelledby="primitives-controls-title">
          <Stack>
            <Heading level={2} id="primitives-controls-title">Controls and composition</Heading>
            <Grid columns={2} data-testid="primitive-grid">
              <Box padding="md" surface="raised">
                <Stack>
                  <Inline><Switch id="primitives-notifications" checked={enabled} onCheckedChange={setEnabled} name="notifications" /><Label htmlFor="primitives-notifications">Notifications</Label></Inline>
                  <Inline><Switch id="primitives-disabled" disabled /><Label htmlFor="primitives-disabled">Unavailable setting</Label></Inline>
                  <RadioGroup aria-label="Delivery" defaultValue="daily" name="delivery">
                    <Inline><RadioGroupItem value="daily" id="primitives-daily" /><Label htmlFor="primitives-daily">Daily</Label></Inline>
                    <Inline><RadioGroupItem value="weekly" id="primitives-weekly" /><Label htmlFor="primitives-weekly">Weekly</Label></Inline>
                    <Inline><RadioGroupItem value="paused" id="primitives-paused" disabled /><Label htmlFor="primitives-paused">Paused (unavailable)</Label></Inline>
                  </RadioGroup>
                  <Label id="primitives-volume-label">Volume</Label>
                  <Slider aria-labelledby="primitives-volume-label" value={volume} onValueChange={setVolume} />
                  <Caption>{volume[0]} percent</Caption>
                  <Slider thumbLabels={['Minimum price', 'Maximum price']} defaultValue={[20, 80]} />
                  <Caption>Range sliders name each thumb separately.</Caption>
                </Stack>
              </Box>
              <Box padding="md" surface="raised">
                <Stack>
                  <SearchField label="Search examples" value={search} onChange={event => setSearch(event.currentTarget.value)} onClear={() => setSearch('')} placeholder="Search examples" />
                  <div>
                    <Label htmlFor="primitives-project">Project name (required)</Label>
                    <TextInput id="primitives-project" name="project" required aria-invalid="true" aria-describedby="primitives-project-help primitives-project-error" />
                    <HelperText id="primitives-project-help">Standalone support text is associated explicitly.</HelperText>
                    <ValidationMessage id="primitives-project-error">Enter a project name.</ValidationMessage>
                  </div>
                  <TextInput type="date" label="Date" name="date" />
                  <TextInput type="time" label="Time" name="time" />
                  <TextInput type="file" label="Attachment" name="attachment" helperText="Native chooser only; upload transport belongs to a pattern." />
                </Stack>
              </Box>
            </Grid>
            <ButtonGroup label="Example actions" data-testid="primitive-button-group">
              <Tooltip content="A native button ref supports tooltip composition"><PrimaryButton>Save changes</PrimaryButton></Tooltip>
              <SecondaryButton>Cancel changes</SecondaryButton>
              <Spacer />
              <Link href="?page=token-architecture">Token architecture</Link>
            </ButtonGroup>
          </Stack>
        </section>

        <section aria-labelledby="primitives-feedback-title">
          <Stack>
            <Heading level={2} id="primitives-feedback-title">Progress and overflow</Heading>
            <Label id="primitives-progress-label">Completed work</Label>
            <Progress value={25} max={50} aria-labelledby="primitives-progress-label" />
            <Progress value={null} aria-label="Pending work" />
            <Caption>Indeterminate progress has no numeric value. Reduced motion keeps a static indicator.</Caption>
            <ScrollArea className="cvp-primitives-doc__scroll" viewportProps={{ role: 'region', 'aria-label': 'Scrollable example' }}>
              <Stack gap="sm">
                {Array.from({ length: 12 }, (_, index) => <Paragraph key={index}>Scrollable item {index + 1}: keyboard users can focus and scroll this region.</Paragraph>)}
              </Stack>
            </ScrollArea>
          </Stack>
        </section>

        <footer>
          <Paragraph>Stack and Inline cover vertical and horizontal flex layout. Grid collapses fixed columns below 600px. Preserve DOM order, wrap by default, and use truncation only when the full content remains available.</Paragraph>
          <Paragraph>Loader, Skeleton, Badge, Status, Pills, TextInput, Checkbox and the button variants remain canonical; no renamed duplicates are introduced.</Paragraph>
        </footer>
      </Stack>
    </Container>
  </article>;
}
