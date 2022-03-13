import React, { useContext, useRef, useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import Checkbox from '../../../components/checkbox'
import SearchInput from '../../../components/searchInput'
import { ChurchContext } from '../../../context/ChurchContext'

export default function FilterSidebar ({show, onHide}) {
  const { church, setChurch } = useContext(ChurchContext)
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
  const [ministeries, setMinisteries] = useState([])

  const getTitlesToFilter = () => {
    let filterTitles = []

    church.users.forEach((user) => {
      if (!filterTitles.includes(user.title)) {
          filterTitles.push(user.title);
      }
    });

    return filterTitles
  }
  const getMinisteriesToFilter = () => {
    let ministeries = []

    church.ministeries.forEach((ministery) => {
      if (!ministeries.includes(ministery.name)) {
          ministeries.push(ministery.name);
      }
    });

    return ministeries
  }

  const submitFilter = () => {
    let filterBody = {
      filter: {},
      order_by: orderBy
    }
    if (filterByName) filterBody.filter.name = name
    if (filterByTitle) filterBody.filter.titles = titles
    if (filterByBaptism) filterBody.filter.is_baptized = isBaptized
    if (filterBySystemAccess) filterBody.filter.access_system = filterBySystemAccess
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
      setMinisteries([])
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

  const insertTitle = title => setTitles([...titles, title])
  const insertMinistery = ministery => setMinisteries([...ministeries, ministery])
  const removeTitle = title => setTitles(titles.filter(oldTitle => oldTitle !== title))
  const removeMinistery = ministery => setMinisteries(ministeries.filter(oldMinistery => oldMinistery !== ministery))


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
                  <SearchInput type="partial" partialInputProps={{
                    value: name,
                    setValue: (e) => setName(e.target.value)
                  }}
                  />
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
                  <label htmlFor="nameInput">Selecione titulos para filtrar:</label>
                  <SearchInput type="multi-selectable" multiSelectableProps={{
                    values: titles,
                    items: getTitlesToFilter(),
                    clearValues: () => setTitles([]),
                    insertValue: insertTitle,
                    removeValue: removeTitle
                  }}/>
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
                      <Checkbox id="chooseMinisteriesCheckbox" checked={ministeriesFilterTypes.includes("choose-ministeries")} handleToggle={() => handleToggleMinisteriesTypeFilter('choose-ministeries')}/>
                      <label htmlFor="chooseMinisteriesCheckbox">Escolha os ministérios</label>
                    </fieldset>
                  </fieldset>
                  {ministeriesFilterTypes.includes("choose-ministeries") && (
                    <fieldset className='infoFieldset'>
                      <label htmlFor="nameInput">Escolha os ministérios:</label>
                      <SearchInput type="multi-selectable" multiSelectableProps={{
                        values: ministeries,
                        items: getMinisteriesToFilter(),
                        clearValues: () => setMinisteries([]),
                        insertValue: insertMinistery,
                        removeValue: removeMinistery
                      }}/>
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
