import React, { useContext, useRef, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import Checkbox from '../../../components/checkbox'
import MultiSelect from '../../../components/multiSelect'
import PartialInput from '../../../components/partialInput'
import SearchInput from '../../../components/partialInput'
import { ChurchContext } from '../../../context/ChurchContext'

export default function FilterSidebar ({show, onHide}) {
  const { setChurch, getChurchTitles, getMinisteriesItems } = useContext(ChurchContext)
  const [filterByName, setFilterByName] = useState(false)
  const [filterByTitle, setFilterByTitle] = useState(false)
  const [filterByMinisteries, setFilterByMinisteries] = useState(false)
  const [ministeriesFilterTypes, setMinisteriesFilterTypes] = useState(null)
  const [filterByBaptism, setFilterByBaptism] = useState(false)
  const [filterBySystemAccess, setFilterBySystemAccess] = useState(false)
  const [isBaptized, setIsBaptized] = useState(null)
  const [orderBy, setOrderBy] = useState('default')
  const [name, setName] = useState("")
  const [titles, setTitles] = useState([])
  const [ministeriesIds, setMinisteriesIds] = useState([])

  const submitFilter = () => {
    let filterBody = {
      filter: {},
      order_by: orderBy
    }
    if (filterByName) filterBody.filter.name = name
    if (filterByTitle) filterBody.filter.titles = titles
    if (filterByBaptism) filterBody.filter.is_baptized = isBaptized
    if (filterBySystemAccess) filterBody.filter.access_system = filterBySystemAccess
    if (filterByMinisteries) {
      filterBody.filter.ministeries_filter_types = ministeriesFilterTypes
      if (ministeriesFilterTypes.includes('choosed-ministeries')) filterBody.filter.ministeries_ids = ministeriesIds
    }
    console.log(filterBody)
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



  return (
    <Offcanvas show={show} onHide={onHide} placement="end" name="filter">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filtros</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
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
                  <MultiSelect defaultOptionPlaceholder="Selecione titulos" initialOptions={getChurchTitles()} clearValues={() => setTitles([])} onChange={onChangeTitles}/>
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
                      <Checkbox id="noMinisteryCheckbox" checked={ministeriesFilterTypes.includes("no-ministery")} handleToggle={() => handleToggleMinisteriesTypeFilter('no-ministery')}/>
                      <label htmlFor="noMinisteryCheckbox">Sem ministério</label>
                    </fieldset>
                  </fieldset>
                  <fieldset className='infoFieldset'>
                    <fieldset className='checkboxFieldset'>
                      <Checkbox id="chooseMinisteriesCheckbox" checked={ministeriesFilterTypes.includes("choosed-ministeries")} handleToggle={() => handleToggleMinisteriesTypeFilter('choosed-ministeries')}/>
                      <label htmlFor="chooseMinisteriesCheckbox">Escolha os ministérios</label>
                    </fieldset>
                  </fieldset>
                  {ministeriesFilterTypes.includes("choosed-ministeries") && (
                    <fieldset className='infoFieldset'>
                      <MultiSelect defaultOptionPlaceholder="Selecione ministérios" initialOptions={getMinisteriesItems()} clearValues={() => setMinisteriesIds([])} onChange={onChangeMinisteries}/>
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
                onClick={() => setOrderBy("default")}
                defaultChecked
                />
              <label htmlFor="orderBySystemAccess">Acesso ao sistema</label>
            </fieldset>
            <fieldset className='radioFieldset'>
              <input
                type="radio"
                className="radioInput"
                name="orderRadio"
                id="orderByName"
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
                onClick={() => setOrderBy("member_since")}
                />
              <label htmlFor="orderByMemberSince">Membro desde</label>
            </fieldset>
          </div>
          <div className='buttonWrapper'>
            <Button variant="primary" onClick={submitFilter}>Salvar</Button>
          </div>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
