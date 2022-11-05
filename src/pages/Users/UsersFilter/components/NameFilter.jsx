import Checkbox from "atomics/Checkbox";
import TextInput from "atomics/TextInput";
import { CheckboxFieldset, FilterType, InfoFieldset } from "../UsersFilter.styles";

export default function NameFilter ({ value, onCheck, onChange }) {
  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id='nameCheckbox'
          onChange={onCheck}
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
