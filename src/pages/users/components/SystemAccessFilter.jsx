import Checkbox from "../../../atomics/Checkbox";
import { CheckboxFieldset, FilterType } from "../styles";

export default function SystemAccessFilter ({value, onToggle}) {

  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id="filterBySystemAccess"
          onChange={onToggle}/>
        <label htmlFor="filterBySystemAccess">Tem acesso ao sistema</label>
      </CheckboxFieldset>
    </FilterType>
  )
}
