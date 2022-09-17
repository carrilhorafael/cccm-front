import { useEffect, useMemo, useState } from "react";
import Checkbox from "../../../atomics/Checkbox";
import MultiSelect from "../../../atomics/MultiSelect";
import { useChurchContext } from "../../../context/ChurchContext";
import { getChurchMinisteries } from "../../../services/Api.service";
import { CheckboxFieldset, FilterType, InfoFieldset } from "../styles";

export default function MinisteriesFilter ({ value, onToggle, onChange }) {
  const { church } = useChurchContext()
  const [ministeries, setMinisteries] = useState([])
  const churchMinisteries = useMemo(() => ministeries.map(ministery => ({ label: ministery.name, value: ministery.id })), [ministeries])

  useEffect(()=>{
    getChurchMinisteries(church.id)
    .then(({data}) => {
      setMinisteries(data)
    })
  }, [])

  const handleToggleMinisteriesTypeFilter = (filterType) => {
    console.log(value, value.filter_types)
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
          onChange={onToggle}
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
