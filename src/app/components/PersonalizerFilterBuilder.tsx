import { Plus, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';
import { MultiSelect, MultiSelectOption } from './MultiSelect';
import { OutlineButton } from './OutlineButton';
import { Select } from './Select';
import './PersonalizerFilterBuilder.css';

export type PersonalizerFilterOperator = 'IN' | 'NOT_IN';

export interface PersonalizerFilterClause {
  id: string;
  field: string;
  operator: PersonalizerFilterOperator;
  values: string[];
}

interface FilterField {
  value: string;
  label: string;
  placeholder: string;
  options: MultiSelectOption[];
  allowCreate?: boolean;
}

export interface PersonalizerFilterBuilderProps {
  clauses: PersonalizerFilterClause[];
  onChange: (clauses: PersonalizerFilterClause[]) => void;
}

const filterFields: FilterField[] = [
  { value: 'content-type', label: 'Content type', placeholder: 'Choose content types…', options: [{ value: 'movie', label: 'Movies' }, { value: 'series', label: 'Series' }] },
  { value: 'genre', label: 'Genre', placeholder: 'Choose genres…', options: [{ value: 'action', label: 'Action' }, { value: 'drama', label: 'Drama' }, { value: 'comedy', label: 'Comedy' }, { value: 'documentary', label: 'Documentary' }, { value: 'thriller', label: 'Thriller' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'horror', label: 'Horror' }, { value: 'crime', label: 'Crime' }, { value: 'animation', label: 'Animation' }, { value: 'fantasy', label: 'Fantasy' }] },
  { value: 'cast-member', label: 'Cast member', placeholder: 'Choose cast members…', options: [{ value: 'viola-davis', label: 'Viola Davis' }, { value: 'pedro-pascal', label: 'Pedro Pascal' }, { value: 'zendaya', label: 'Zendaya' }] },
  { value: 'audience-rating', label: 'Audience rating', placeholder: 'Choose ratings…', options: [{ value: 'g', label: 'G' }, { value: 'pg', label: 'PG' }, { value: 'pg-13', label: 'PG-13' }, { value: 'r', label: 'R' }, { value: 'nc-17', label: 'NC-17' }] },
  { value: 'keyword', label: 'Keyword', placeholder: 'Enter keywords…', options: [], allowCreate: true },
  { value: 'language', label: 'Language', placeholder: 'Choose languages…', options: [{ value: 'english', label: 'English' }, { value: 'spanish', label: 'Spanish' }, { value: 'french', label: 'French' }, { value: 'german', label: 'German' }] },
  { value: 'runtime', label: 'Runtime', placeholder: 'Choose runtime bands…', options: [{ value: 'under-30', label: 'Under 30 minutes' }, { value: '30-60', label: '30–60 minutes' }, { value: '60-90', label: '60–90 minutes' }, { value: '90-150', label: '90–150 minutes' }, { value: 'over-150', label: 'Over 150 minutes' }] },
];

const operatorOptions = [
  { value: 'IN', label: 'IN · matches any' },
  { value: 'NOT_IN', label: 'NOT IN · excludes any' },
];

export function PersonalizerFilterBuilder({ clauses, onChange }: PersonalizerFilterBuilderProps) {
  const updateClause = (id: string, updates: Partial<PersonalizerFilterClause>) => {
    onChange(clauses.map((clause) => clause.id === id ? { ...clause, ...updates } : clause));
  };
  const addClause = () => {
    const field = filterFields.find((candidate) => !clauses.some((clause) => clause.field === candidate.value));
    if (!field) return;
    onChange([...clauses, { id: `filter-${Date.now()}`, field: field.value, operator: 'IN', values: [] }]);
  };

  return <section className="personalizer-filter-builder" aria-labelledby="personalizer-filter-builder-title">
    <header className="personalizer-filter-builder__heading">
      <div><h3 id="personalizer-filter-builder-title">Content filters</h3><p>Include or exclude any matching values from recommendations.</p></div>
      <span>{clauses.length} of {filterFields.length}</span>
    </header>
    <div className="personalizer-filter-builder__clauses">
      {clauses.map((clause, index) => {
        const field = filterFields.find((candidate) => candidate.value === clause.field) ?? filterFields[0];
        const availableFields = filterFields.map((candidate) => ({ value: candidate.value, label: candidate.label, disabled: candidate.value !== clause.field && clauses.some((item) => item.field === candidate.value) }));
        return <article className="personalizer-filter-builder__clause" key={clause.id} aria-label={`Filter ${index + 1}`}>
          <div className="personalizer-filter-builder__clause-heading"><strong>Filter {index + 1}</strong><IconButton variant="ghost" size="small" aria-label={`Remove filter ${index + 1}`} disabled={clauses.length === 1} onClick={() => onChange(clauses.filter((item) => item.id !== clause.id))}><Trash2 size={15} /></IconButton></div>
          <div className="personalizer-filter-builder__rule">
            <Select label="Field" size="compact" value={clause.field} options={availableFields} onChange={(value) => updateClause(clause.id, { field: value, values: [] })} />
            <Select label="Operator" size="compact" value={clause.operator} options={operatorOptions} onChange={(value) => updateClause(clause.id, { operator: value as PersonalizerFilterOperator })} />
          </div>
          <MultiSelect label="Values" value={clause.values} options={field.options} allowCreate={field.allowCreate ?? false} placeholder={field.placeholder} onChange={(values) => updateClause(clause.id, { values })} />
          <p className="personalizer-filter-builder__summary"><strong>{clause.operator === 'IN' ? 'Include' : 'Exclude'}</strong> content matching any selected value.</p>
        </article>;
      })}
    </div>
    <OutlineButton className="personalizer-filter-builder__add" onClick={addClause} disabled={clauses.length === filterFields.length}><Plus size={15} /> Add filter</OutlineButton>
  </section>;
}