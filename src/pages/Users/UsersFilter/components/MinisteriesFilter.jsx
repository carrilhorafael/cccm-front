import { useMemo } from "react";
import Checkbox from "atomics/Checkbox";
import MultiSelect from "atomics/MultiSelect";
import { CheckboxFieldset, FilterType, InfoFieldset } from "../UsersFilter.styles";
import useChurchMinisteries from "pages/Users/hooks/useChurchMinisteries";

export default function MinisteriesFilter ({ value, onCheck, onChange }) {
  const { ministeries } = useChurchMinisteries()
  const churchMinisteries = useMemo(() => ministeries.map(ministery => ({ label: ministery.name, value: ministery.id })), [ministeries])

  const handleToggleMinisteriesTypeFilter = (filterType) => {
    if (value.filter_types?.includes(filterType)) {
      if (filterType === 'choosen-ministeries') {
        return onChange({ filter_types: value.filter_types.filter(old => old !== filterType) })
      }
      return onChange({ ...value, filter_types: value.filter_types.filter(old => old !== filterType) })
    }
    onChange({ ...value, filter_types: [...(value.filter_types ?? []), filterType] })
  }

  const handleChangeMinisteryIds = (ministeryId) => {
    if (value.choosed_ministeries_ids?.includes(ministeryId))
      onChange({ ...value, choosed_ministeries_ids: value.choosed_ministeries_ids.filter(old => old !== ministeryId) })
    else
      onChange({ ...value, choosed_ministeries_ids: [...(value.choosed_ministeries_ids ?? []), ministeryId] })
  }

  return (
    <FilterType>
      <CheckboxFieldset>
        <Checkbox
          checked={value != null}
          id="filterByMinisteries"
          onChange={onCheck}
        />
        <label htmlFor="filterByMinisteries">Ministerios</label>
      </CheckboxFieldset>
      {value != null && (
        <>
          <InfoFieldset>
            <CheckboxFieldset>
              <Checkbox
                id="noMinisteryCheckbox"
                checked={value.filter_types?.includes("no-ministeries")}
                onChange={() => handleToggleMinisteriesTypeFilter('no-ministeries')}
              />
              <label htmlFor="noMinisteryCheckbox">Sem ministério</label>
            </CheckboxFieldset>
          </InfoFieldset>
          <InfoFieldset>
            <CheckboxFieldset>
              <Checkbox
                id="chooseMinisteriesCheckbox"
                checked={value.filter_types?.includes("choosen-ministeries")}
                onChange={() => handleToggleMinisteriesTypeFilter('choosen-ministeries')}
              />
              <label htmlFor="chooseMinisteriesCheckbox">Escolha os ministérios</label>
            </CheckboxFieldset>
          </InfoFieldset>
          {value.filter_types?.includes("choosen-ministeries") && (
            <InfoFieldset>
              <MultiSelect
                defaultOptionPlaceholder="Selecione ministérios"
                initialValues={value.choosed_ministeries_ids}
                initialOptions={churchMinisteries}
                clearValues={() => onChange({ ...value, choosed_ministeries_ids: [] })}
                onChange={handleChangeMinisteryIds}
              />
            </InfoFieldset>
          )}
        </>
      )}
    </FilterType>
  )
}
