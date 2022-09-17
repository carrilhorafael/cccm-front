import Checkbox from "../../../atomics/Checkbox";
import TextInput from "../../../atomics/TextInput";
import { CheckboxFieldset, FilterType, InfoFieldset } from "../styles";

export default function FilterItem ({ value, onToggle, onChange }) {

  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id='nameCheckbox'
          onChange={onToggle}
        />
        <label htmlFor='nameCheckbox'>Nome</label>
      </CheckboxFieldset>
      {value != null && (
        <InfoFieldset>
          <label>Inclui:</label>
          <TextInput
            startIcon='fa-solid fa-magnifying-glass'
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            hasStartIcon
          />
        </InfoFieldset>
      )}
    </FilterType>
  )
}
