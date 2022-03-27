import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import Checkbox from '../../../common/checkbox'
import MultiSelect from '../../../common/multiSelect'
import PartialInput from '../../../common/partialInput'
import { AuthContext } from '../../../context/AuthContext'
import { ChurchesContext } from '../../../context/ChurchesContext'

export default function FilterSidebar ({show, onHide}) {
  const { setChurch, getChurchTitles, getMinisteriesItems } = useContext(ChurchesContext)
  const { filter, updateFilter } = useContext(AuthContext)
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

  useEffect(() => {handleHide()}, [filter])

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

    await updateFilter(filterBody)
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
    <Offcanvas show={show} onHide={handleHide} placement="end" name="filter">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filtros</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
          <div className='filterBodyWrapper'>
            <div className='filterBody'>
              <p className='filterSubtitle'>Filtrar tabela por:</p>
              <div className='filterType'>
                <fieldset className='checkboxFieldset'>
                  <Checkbox checked={filterByName} id="filterByName" handleToggle={handleToggleName}/>
                  <label htmlFor="filterByName">Nome</label>
                </fieldset>
                {filterByName && (
                  <fieldset className='infoFieldset'>
                    <label htmlFor="nameInput">Inclui:</label>
                    <PartialInput value={name} onChange={(e) => setName(e.target.value)}/>
                  </fieldset>
                )}
              </div>
              <div className='filterType'>
                <fieldset className='checkboxFieldset'>
                  <Checkbox checked={filterByTitle} id="filterByTitle" handleToggle={handleToggleTitle}/>
                  <label htmlFor="filterByTitle">Titulo</label>
                </fieldset>
                {filterByTitle && (
                  <fieldset className='infoFieldset'>
                    <MultiSelect defaultOptionPlaceholder="Selecione titulos" initialValues={titles} initialOptions={getChurchTitles()} clearValues={() => setTitles([])} onChange={onChangeTitles}/>
                  </fieldset>
                )}
              </div>
              <div className='filterType'>
                <fieldset className='checkboxFieldset'>
                  <Checkbox checked={filterByBaptism} id="filterByBaptism" handleToggle={handleToggleBaptism}/>
                  <label htmlFor="filterByBaptism">Batismo</label>
                </fieldset>
                {filterByBaptism && (
                  <div>
                    <fieldset className='radioFieldset'>
                      <input
                        type="radio"
                        value={true}
                        className="radioInput"
                        name="baptismFilter"
                        defaultChecked={isBaptized}
                        id="filterByBaptized"
                        onClick={() => setIsBaptized(true)}
                        />
                      <label htmlFor="filterByBaptized">É batizado</label>
                    </fieldset>
                    <fieldset className='radioFieldset'>
                      <input
                        type="radio"
                        className="radioInput"
                        value={false}
                        name="baptismFilter"
                        defaultChecked={isBaptized === false}
                        id="filterByNotBaptized"
                        onClick={() => setIsBaptized(false)}
                        />
                      <label htmlFor="filterByNotBaptized">Não é batizado</label>
                    </fieldset>
                  </div>
                )}
              </div>
              <div className='filterType'>
                <fieldset className='checkboxFieldset'>
                  <Checkbox checked={filterByMinisteries} id="filterByMinisteries" handleToggle={handleToggleMinisteries}/>
                  <label htmlFor="filterByMinisteries">Ministerios</label>
                </fieldset>
                {filterByMinisteries && (
                  <>
                    <fieldset className='infoFieldset'>
                      <fieldset className='checkboxFieldset'>
                        <Checkbox id="noMinisteryCheckbox" checked={ministeriesFilterTypes.includes("no-ministeries")} handleToggle={() => handleToggleMinisteriesTypeFilter('no-ministeries')}/>
                        <label htmlFor="noMinisteryCheckbox">Sem ministério</label>
                      </fieldset>
                    </fieldset>
                    <fieldset className='infoFieldset'>
                      <fieldset className='checkboxFieldset'>
                        <Checkbox id="chooseMinisteriesCheckbox" checked={ministeriesFilterTypes.includes("choosen-ministeries")} handleToggle={() => handleToggleMinisteriesTypeFilter('choosen-ministeries')}/>
                        <label htmlFor="chooseMinisteriesCheckbox">Escolha os ministérios</label>
                      </fieldset>
                    </fieldset>
                    {ministeriesFilterTypes.includes("choosen-ministeries") && (
                      <fieldset className='infoFieldset'>
                        <MultiSelect defaultOptionPlaceholder="Selecione ministérios" initialValues={ministeriesIds} initialOptions={getMinisteriesItems()} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
                      </fieldset>
                    )}
                  </>
                )}
              </div>
              <div className='filterType'>
                <fieldset className='checkboxFieldset'>
                  <Checkbox checked={filterBySystemAccess} id="filterBySystemAccess" handleToggle={() => setFilterBySystemAccess(!filterBySystemAccess)}/>
                  <label htmlFor="filterBySystemAccess">Tem acesso ao sistema</label>
                </fieldset>
              </div>
            </div>
            <p className='filterSubtitle'>Ordenar tabela por:</p>
            <div className='orderBody'>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderBySystemAccess"
                  defaultChecked={filter.sortable === 'system_access'}
                  onClick={() => setOrderBy("system_access")}
                  />
                <label htmlFor="orderBySystemAccess">Acesso ao sistema</label>
              </fieldset>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderByName"
                  defaultChecked={filter.sortable === 'name'}
                  onClick={() => setOrderBy("name")}
                  />
                <label htmlFor="orderByName">Nome</label>
              </fieldset>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderByBirthdate"
                  defaultChecked={filter.sortable === 'birthdate'}
                  onClick={() => setOrderBy("birthdate")}
                  />
                <label htmlFor="orderByBirthdate">Nascimento</label>
              </fieldset>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderByTitle"
                  defaultChecked={filter.sortable === 'title'}
                  onClick={() => setOrderBy("title")}
                  />
                <label htmlFor="orderByTitle">Titulo</label>
              </fieldset>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderByLastLoginAt"
                  defaultChecked={filter.sortable === 'last_time_logged_at'}
                  onClick={() => setOrderBy("last_time_logged_at")}
                  />
                <label htmlFor="orderByLastLoginAt">Ultimo acesso</label>
              </fieldset>
              <fieldset className='radioFieldset'>
                <input
                  type="radio"
                  className="radioInput"
                  name="orderRadio"
                  id="orderByMemberSince"
                  defaultChecked={filter.sortable === 'member_since'}
                  onClick={() => setOrderBy("member_since")}
                  />
                <label htmlFor="orderByMemberSince">Membro desde</label>
              </fieldset>
            </div>
          </div>
          <div className='buttonWrapper'>
            <Button variant="primary" onClick={submitFilter}>Salvar</Button>
          </div>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
