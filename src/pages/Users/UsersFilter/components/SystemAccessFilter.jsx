import Checkbox from "atomics/Checkbox";
import { CheckboxFieldset, FilterType } from "../UsersFilter.styles";

export default function SystemAccessFilter ({value, onCheck}) {

  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id="filterBySystemAccess"
          onChange={onCheck}/>
        <label htmlFor="filterBySystemAccess">Tem acesso ao sistema</label>
      </CheckboxFieldset>
    </FilterType>
  )
}
