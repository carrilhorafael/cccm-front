import Checkbox from "atomics/Checkbox";
import { CheckboxFieldset, FilterType, RadioFieldset } from "../UsersFilter.styles";

export default function BaptismFilter ({ value, onToggle, onChange }) {
  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id="filterByBaptism"
          onChange={onToggle}
        />
        <label htmlFor="filterByBaptism">Batismo</label>
      </CheckboxFieldset>
      {value != null && (
        <div>
          <RadioFieldset>
            <input
              type="radio"
              value={true}
              name="baptismFilter"
              defaultChecked={value}
              id="filterByBaptized"
              onClick={() => onChange(true)}
              />
            <label htmlFor="filterByBaptized">É batizado</label>
          </RadioFieldset>
          <RadioFieldset>
            <input
              type="radio"
              value={false}
              name="baptismFilter"
              defaultChecked={value === false}
              id="filterByNotBaptized"
              onClick={() => onChange(false)}
              />
            <label htmlFor="filterByNotBaptized">Não é batizado</label>
          </RadioFieldset>
        </div>
      )}
    </FilterType>
  )
}
