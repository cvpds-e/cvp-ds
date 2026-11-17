import { useState } from 'react';
import { Container, Heading, Link, Paragraph, Stack, TextInput } from '../../design-system';
import { DESIGN_SYSTEM_CATALOG, filterCatalog } from '../designSystemCatalog';
import './DesignSystemCatalog.css';

export function DesignSystemCatalogDocumentation({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState('');
  const entries = filterCatalog(query);
  const categories = [...new Set(entries.map(entry => entry.category))];

  return <section className="cvp-catalog" aria-label="Design system catalogue">
    <Container>
      <Stack gap="lg">
        <header>
          <Heading level={embedded ? 2 : 1} size="headline">All Components &amp; Foundations</Heading>
          <Paragraph>Foundations, tokens, primitives, components, patterns, and templates in one place. Native input capabilities reuse TextInput; legacy items are labelled rather than silently promoted.</Paragraph>
        </header>
        <TextInput type="search" label="Search the complete catalogue" value={query} onChange={event => setQuery(event.currentTarget.value)} placeholder="Search components, foundations, or capabilities" />
        <Paragraph role="status">{entries.length} of {DESIGN_SYSTEM_CATALOG.length} entries</Paragraph>
        {categories.map(category => <section key={category} aria-label={category}>
          <Stack>
            <Heading level={embedded ? 3 : 2}>{category}</Heading>
            <ul className="cvp-catalog__grid">
              {entries.filter(entry => entry.category === category).map(entry => <li key={entry.id}>
                <Link href={`?page=${entry.id}`} className="cvp-catalog__card">
                  <strong>{entry.label}</strong>
                  {entry.availability && <span className="cvp-catalog__availability">{entry.availability}</span>}
                  <span>{entry.description}</span>
                </Link>
              </li>)}
            </ul>
          </Stack>
        </section>)}
        {!entries.length && <Paragraph>No entries found. Try a component name or a capability such as divider, spinner, or motion.</Paragraph>}
      </Stack>
    </Container>
  </section>;
}
