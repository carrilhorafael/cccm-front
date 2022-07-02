import React, { useEffect, useState } from 'react'
import Button from '../../../atomics/Button'
import Checkbox from '../../../atomics/Checkbox'
import { Footer } from '../../../atomics/Modal/styles'
import MultiSelect from '../../../atomics/MultiSelect'
import Sidebar from '../../../atomics/Sidebar'
import TextInput from '../../../atomics/TextInput'
import { useAuthContext } from '../../../context/AuthContext'
import { useChurchContext } from '../../../context/ChurchContext'
import { useOverlayContext } from '../../../context/OverlayContext'
import {
  CheckboxFieldset,
  FilterBody,
  FilterSubtitle,
  FilterType,
  InfoFieldset,
  OrderBody,
  RadioFieldset
} from '../styles'

export default function FilterSidebar ({show, onHide}) {
  const { church, ministeries } = useChurchContext()
  const { filter, updateFilter } = useAuthContext()
  const { fireToast } = useOverlayContext()

  const churchTitles = church.titles.map(title => ({ label: title, value: title }))
  const churchMinisteries = ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))

  const [filterByName, setFilterByName] = useState(filter.restriction.hasOwnProperty('name'))
  const [filterByTitle, setFilterByTitle] = useState(filter.restriction.hasOwnProperty('titles'))
  const [filterByMinisteries, setFilterByMinisteries] = useState(filter.restriction.hasOwnProperty('ministeries'))
  const [ministeriesFilterTypes, setMinisteriesFilterTypes] = useState(filter.restriction.ministeries?.filter_types || [])
  const [filterByBaptism, setFilterByBaptism] = useState(filter.restriction.hasOwnProperty('is_baptized'))
  const [filterBySystemAccess, setFilterBySystemAccess] = useState(filter.restriction.hasOwnProperty('system_access'))
  const [orderBy, setOrderBy] = useState(filter.sortable || 'system_access')
  const [name, setName] = useState(filter.restriction.name || '')
  const [titles, setTitles] = useState(filter.restriction.titles || [])
  const [isBaptized, setIsBaptized] = useState(filter.restriction.is_baptized || null)
  const [ministeriesIds, setMinisteriesIds] = useState(filter.restriction.ministeries?.choosed_ministeries_ids || [])

  useEffect(() => handleHide(), [filter])

  const submitFilter = async () => {
    let filterBody = {
      filter: {
        restriction: {},
        sortable: orderBy
      }
    }
    if (filterByName) filterBody.filter.restriction.name = name
    if (filterByTitle) filterBody.filter.restriction.titles = titles
    if (filterByBaptism) filterBody.filter.restriction.is_baptized = isBaptized
    if (filterBySystemAccess) filterBody.filter.restriction.system_access = filterBySystemAccess
    if (filterByMinisteries) {
      filterBody.filter.restriction.ministeries = {}
      filterBody.filter.restriction.ministeries.filter_types = ministeriesFilterTypes
      if (ministeriesFilterTypes.includes('choosen-ministeries')) filterBody.filter.restriction.ministeries.choosed_ministeries_ids = ministeriesIds
    }

    updateFilter(filterBody)
    .then(() => fireToast('positive', 'Filtro alterado com sucesso'))
    .catch(() => fireToast('negative', 'Não foi possível alterar seu filtro'))
  }

  const handleToggleBaptism = () => {
    setFilterByBaptism(!filterByBaptism)
    if(!filterByBaptism) {
      setIsBaptized(null)
    }
  }

  const handleToggleName = () => {
    setFilterByName(!filterByName)
    if(!filterByName) {
      setName(null)
    }
  }

  const handleToggleTitle = () => {
    setFilterByTitle(!filterByTitle)
    if(!filterByTitle) {
      setTitles([])
    }
  }

  const handleToggleMinisteries = () => {
    setFilterByMinisteries(!filterByMinisteries)
    if(!filterByMinisteries) {
      setMinisteriesFilterTypes([])
    }
  }

  const handleToggleMinisteriesTypeFilter = (method) => {
    if (ministeriesFilterTypes.includes(method)) {
      setMinisteriesFilterTypes(ministeriesFilterTypes.filter(old => old !== method))
    } else {
      setMinisteriesFilterTypes([...ministeriesFilterTypes, method])
    }
  }

  const onChangeTitles = titleLabel => {
    if (titles.includes(titleLabel))
      setTitles(titles.filter(oldTitle => oldTitle !== titleLabel))
    else
      setTitles([...titles, titleLabel])
  }
  const onChangeMinisteries = ministeryId => {
    if (ministeriesIds.includes(ministeryId))
      setMinisteriesIds(ministeriesIds.filter(ministeriesIds => ministeriesIds !== ministeryId))
    else
      setMinisteriesIds([...ministeriesIds, ministeryId])
  }

  const handleHide = () => {
    setFilterByName(filter.restriction.hasOwnProperty('name'))
    setFilterByTitle(filter.restriction.hasOwnProperty('titles'))
    setFilterByMinisteries(filter.restriction.hasOwnProperty('ministeries'))
    setMinisteriesFilterTypes(filter.restriction.ministeries?.filter_types || [])
    setFilterByBaptism(filter.restriction.hasOwnProperty('is_baptized'))
    setFilterBySystemAccess(filter.restriction.hasOwnProperty('system_access'))
    setOrderBy(filter.sortable || 'system_access')
    setName(filter.restriction.name || '')
    setTitles(filter.restriction.titles || [])
    setIsBaptized(filter.restriction.is_baptized || null)
    setMinisteriesIds(filter.restriction.ministeries?.choosed_ministeries_ids || [])
    onHide()
  }

  return (
    <Sidebar
      show={show}
      onHide={handleHide}
      title="Filtros"
      placement="right"
      Footer={
        <Footer>
          <Button theme="primary" onClick={submitFilter} title='Salvar filtro'/>
        </Footer>
      }
    >
      <FilterBody>
        <FilterSubtitle>Filtrar tabela por:</FilterSubtitle>

        <FilterType>
          <CheckboxFieldset>
            <Checkbox checked={filterByName} id="filterByName" onChange={handleToggleName}/>
            <label htmlFor="filterByName">Nome</label>
          </CheckboxFieldset>
          {filterByName && (
            <InfoFieldset>
              <label htmlFor="nameInput">Inclui:</label>
              <TextInput
                startIcon='fa-solid fa-magnifying-glass'
                value={name}
                onChange={(e) => setName(e.target.value)}
                hasStartIcon
              />
            </InfoFieldset>
          )}
        </FilterType>

        <FilterType>
          <CheckboxFieldset>
            <Checkbox checked={filterByTitle} id="filterByTitle" onChange={handleToggleTitle}/>
            <label htmlFor="filterByTitle">Titulo</label>
          </CheckboxFieldset>
          {filterByTitle && (
            <InfoFieldset>
              <MultiSelect defaultOptionPlaceholder="Selecione titulos" initialValues={titles} initialOptions={churchTitles} clearValues={() => setTitles([])} onChange={onChangeTitles}/>
            </InfoFieldset>
          )}
        </FilterType>

        <FilterType>
          <CheckboxFieldset>
            <Checkbox checked={filterByBaptism} id="filterByBaptism" onChange={handleToggleBaptism}/>
            <label htmlFor="filterByBaptism">Batismo</label>
          </CheckboxFieldset>
          {filterByBaptism && (
            <div>
              <RadioFieldset>
                <input
                  type="radio"
                  value={true}

                  name="baptismFilter"
                  defaultChecked={isBaptized}
                  id="filterByBaptized"
                  onClick={() => setIsBaptized(true)}
                  />
                <label htmlFor="filterByBaptized">É batizado</label>
              </RadioFieldset>
              <RadioFieldset>
                <input
                  type="radio"

                  value={false}
                  name="baptismFilter"
                  defaultChecked={isBaptized === false}
                  id="filterByNotBaptized"
                  onClick={() => setIsBaptized(false)}
                  />
                <label htmlFor="filterByNotBaptized">Não é batizado</label>
              </RadioFieldset>
            </div>
          )}
        </FilterType>

        <FilterType>
          <CheckboxFieldset>
            <Checkbox checked={filterByMinisteries} id="filterByMinisteries" onChange={handleToggleMinisteries}/>
            <label htmlFor="filterByMinisteries">Ministerios</label>
          </CheckboxFieldset>
          {filterByMinisteries && (
            <>
              <InfoFieldset>
                <CheckboxFieldset>
                  <Checkbox id="noMinisteryCheckbox" checked={ministeriesFilterTypes.includes("no-ministeries")} onChange={() => handleToggleMinisteriesTypeFilter('no-ministeries')}/>
                  <label htmlFor="noMinisteryCheckbox">Sem ministério</label>
                </CheckboxFieldset>
              </InfoFieldset>
              <InfoFieldset>
                <CheckboxFieldset>
                  <Checkbox id="chooseMinisteriesCheckbox" checked={ministeriesFilterTypes.includes("choosen-ministeries")} onChange={() => handleToggleMinisteriesTypeFilter('choosen-ministeries')}/>
                  <label htmlFor="chooseMinisteriesCheckbox">Escolha os ministérios</label>
                </CheckboxFieldset>
              </InfoFieldset>
              {ministeriesFilterTypes.includes("choosen-ministeries") && (
                <InfoFieldset>
                  <MultiSelect defaultOptionPlaceholder="Selecione ministérios" initialValues={ministeriesIds} initialOptions={churchMinisteries} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
                </InfoFieldset>
              )}
            </>
          )}
        </FilterType>

        <FilterType>
          <CheckboxFieldset>
            <Checkbox checked={filterBySystemAccess} id="filterBySystemAccess" onChange={() => setFilterBySystemAccess(!filterBySystemAccess)}/>
            <label htmlFor="filterBySystemAccess">Tem acesso ao sistema</label>
          </CheckboxFieldset>
        </FilterType>
      </FilterBody>

      <FilterBody>
        <FilterSubtitle>Ordenar tabela por:</FilterSubtitle>

        <OrderBody>
          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderBySystemAccess"
              defaultChecked={filter.sortable === 'system_access'}
              onClick={() => setOrderBy("system_access")}
              />
            <label htmlFor="orderBySystemAccess">Acesso ao sistema</label>
          </RadioFieldset>

          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderByName"
              defaultChecked={filter.sortable === 'name'}
              onClick={() => setOrderBy("name")}
              />
            <label htmlFor="orderByName">Nome</label>
          </RadioFieldset>

          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderByBirthdate"
              defaultChecked={filter.sortable === 'birthdate'}
              onClick={() => setOrderBy("birthdate")}
              />
            <label htmlFor="orderByBirthdate">Nascimento</label>
          </RadioFieldset>

          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderByTitle"
              defaultChecked={filter.sortable === 'title'}
              onClick={() => setOrderBy("title")}
              />
            <label htmlFor="orderByTitle">Titulo</label>
          </RadioFieldset>

          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderByLastLoginAt"
              defaultChecked={filter.sortable === 'last_time_logged_at'}
              onClick={() => setOrderBy("last_time_logged_at")}
              />
            <label htmlFor="orderByLastLoginAt">Ultimo acesso</label>
          </RadioFieldset>

          <RadioFieldset>
            <input
              type="radio"
              name="orderRadio"
              id="orderByMemberSince"
              defaultChecked={filter.sortable === 'member_since'}
              onClick={() => setOrderBy("member_since")}
              />
            <label htmlFor="orderByMemberSince">Membro desde</label>
          </RadioFieldset>
        </OrderBody>
      </FilterBody>
    </Sidebar>
  )
}
