import { Plus, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';
import { MultiSelect, MultiSelectOption } from './MultiSelect';
import { NumberInput } from './NumberInput';
import { OutlineButton } from './OutlineButton';
import { Select } from './Select';
import './PersonalizerFilterBuilder.css';

export type PersonalizerFilterOperator = 'in' | 'not_in' | 'gt' | 'gte' | 'lt' | 'lte';

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
  valueType?: 'integer';
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
  { value: 'runtime', label: 'Runtime', placeholder: 'Enter runtime…', options: [], valueType: 'integer' },
];

const membershipOperatorOptions = [
  { value: 'in', label: 'IN · matches any' },
  { value: 'not_in', label: 'NOT IN · excludes any' },
];
const runtimeOperatorOptions = [
  { value: 'gt', label: 'Greater than' },
  { value: 'gte', label: 'Greater than or equal' },
  { value: 'lt', label: 'Less than' },
  { value: 'lte', label: 'Less than or equal' },
];
const defaultOperator = (field: FilterField): PersonalizerFilterOperator => field.valueType === 'integer' ? 'gte' : 'in';
const runtimeOperatorLabel = (operator: PersonalizerFilterOperator) => runtimeOperatorOptions.find((option) => option.value === operator)?.label ?? operator;

export function PersonalizerFilterBuilder({ clauses, onChange }: PersonalizerFilterBuilderProps) {
  const updateClause = (id: string, updates: Partial<PersonalizerFilterClause>) => {
    onChange(clauses.map((clause) => clause.id === id ? { ...clause, ...updates } : clause));
  };
  const addClause = () => {
    const field = filterFields.find((candidate) => !clauses.some((clause) => clause.field === candidate.value));
    if (!field) return;
    onChange([...clauses, { id: `filter-${Date.now()}`, field: field.value, operator: defaultOperator(field), values: [] }]);
  };

  return <section className="personalizer-filter-builder" aria-labelledby="personalizer-filter-builder-title">
    <header className="personalizer-filter-builder__heading">
      <div><h3 id="personalizer-filter-builder-title">Content filters</h3><p>Match values or compare runtime in minutes.</p></div>
      <span>{clauses.length} of {filterFields.length}</span>
    </header>
    <div className="personalizer-filter-builder__clauses">
      {clauses.map((clause, index) => {
        const field = filterFields.find((candidate) => candidate.value === clause.field) ?? filterFields[0];
        const operatorOptions = field.valueType === 'integer' ? runtimeOperatorOptions : membershipOperatorOptions;
        const availableFields = filterFields.map((candidate) => ({ value: candidate.value, label: candidate.label, disabled: candidate.value !== clause.field && clauses.some((item) => item.field === candidate.value) }));
        return <article className="personalizer-filter-builder__clause" key={clause.id} aria-label={`Filter ${index + 1}`}>
          <div className="personalizer-filter-builder__clause-heading"><strong>Filter {index + 1}</strong><IconButton variant="ghost" size="small" aria-label={`Remove filter ${index + 1}`} disabled={clauses.length === 1} onClick={() => onChange(clauses.filter((item) => item.id !== clause.id))}><Trash2 size={15} /></IconButton></div>
          <div className="personalizer-filter-builder__rule">
            <Select label="Field" size="compact" value={clause.field} options={availableFields} onChange={(value) => { const nextField = filterFields.find((candidate) => candidate.value === value) ?? filterFields[0]; updateClause(clause.id, { field: value, operator: defaultOperator(nextField), values: [] }); }} />
            <Select label="Operator" size="compact" value={clause.operator} options={operatorOptions} onChange={(value) => updateClause(clause.id, { operator: value as PersonalizerFilterOperator })} />
          </div>
          {field.valueType === 'integer'
            ? <NumberInput label="Value (minutes)" value={clause.values[0] === undefined ? '' : Number(clause.values[0])} onValueChange={(value) => updateClause(clause.id, { values: value === '' ? [] : [String(value)] })} min={0} step={1} placeholder="Minutes" />
            : <MultiSelect label="Values" value={clause.values} options={field.options} allowCreate={field.allowCreate ?? false} placeholder={field.placeholder} onChange={(values) => updateClause(clause.id, { values })} />}
          <p className="personalizer-filter-builder__summary">{field.valueType === 'integer'
            ? <><strong>{runtimeOperatorLabel(clause.operator)}</strong> {clause.values[0] ?? '…'} minutes</>
            : <><strong>{clause.operator === 'in' ? 'Include' : 'Exclude'}</strong> content matching any selected value.</>}</p>
        </article>;
      })}
    </div>
    <OutlineButton className="personalizer-filter-builder__add" onClick={addClause} disabled={clauses.length === filterFields.length}><Plus size={15} /> Add filter</OutlineButton>
  </section>;
}