import Checkbox from "atomics/Checkbox";
import MultiSelect from "atomics/MultiSelect";
import { useChurchContext } from "context/ChurchContext";
import { CheckboxFieldset, FilterType, InfoFieldset } from "../Header.styles";

export default function TitleFilter ({ value, onToggle, onChange }) {
  const { church } = useChurchContext()
  const churchTitles = church.titles.map(title => ({ label: title, value: title }))

  const handleChange = (title) => {
    if (value.includes(title))
      onChange(value.filter(oldTitle => oldTitle !== title))
    else
      onChange([...value, title])
  }

  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id="filterByTitle"
          onChange={onToggle}
        />
        <label htmlFor="filterByTitle">Titulo</label>
      </CheckboxFieldset>
      {value != null && (
        <InfoFieldset>
          <MultiSelect
            defaultOptionPlaceholder="Selecione titulos"
            initialValues={value}
            initialOptions={churchTitles}
            clearValues={() => onChange([])}
            onChange={handleChange}
          />
        </InfoFieldset>
      )}
    </FilterType>

  )
}
