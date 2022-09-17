import React, { useState } from 'react'
import Button from '../../../atomics/Button'
import { Footer } from '../../../atomics/Modal/styles'
import Sidebar from '../../../atomics/Sidebar'
import { useAuthContext } from '../../../context/AuthContext'
import { useOverlayContext } from '../../../context/OverlayContext'
import { FilterBody, FilterSubtitle, OrderBody } from '../styles'
import BaptismFilter from './BaptismFilter'
import MinisteriesFilter from './MinisteriesFilter'
import NameFilter from './NameFilter'
import RadioOrder from './RadioOrder'
import SystemAccessFilter from './SystemAccessFilter'
import TitleFilter from './TitleFilter'

const sortOptions = [
  { type: 'system_access', label: 'Acesso ao sistema' },
  { type: 'name', label: 'Nome' },
  { type: 'birthdate', label: 'Data de nascimento' },
  { type: 'title', label: 'Titulo' },
  { type: 'last_time_logged_at', label: 'Ultimo acesso' },
  { type: 'member_since', label: 'Membro desde' },
]

export default function FilterSidebar ({show, onHide}) {
  const { filter, updateFilter } = useAuthContext()
  const { fireToast } = useOverlayContext()

  const [filterParams, setFilterParams] = useState({
    restriction: filter.restriction,
    sortable: filter.sortable
  })

  const submitFilter = async () => {
    updateFilter(filterParams)
    .then(() => fireToast('positive', 'Filtro alterado com sucesso'))
    .catch(() => fireToast('negative', 'Não foi possível alterar seu filtro'))
  }

  const handleHide = () => {
    onHide()
  }

  const handleToggleCheckbox = (key, defaultValue) => () => {
    let newRestriction = { ...filterParams.restriction }

    if (newRestriction.hasOwnProperty(key)) {
      delete newRestriction[key]
    } else {
      newRestriction[key] = defaultValue
    }

    setFilterParams({ ...filterParams, restriction: newRestriction })
  }

  const handleChangeRestriction = (key) => (value) => {
    let newRestriction = { ...filterParams.restriction }
    newRestriction[key] = value

    setFilterParams({ ...filterParams, restriction: newRestriction })
  }

  const handleChangeOrder = (value) => {
    setFilterParams({ ...filterParams, sortable: value })
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
        <NameFilter
          value={filterParams.restriction.name}
          onChange={handleChangeRestriction('name')}
          onToggle={handleToggleCheckbox('name', '')}
        />
        <TitleFilter
          value={filterParams.restriction.titles}
          onChange={handleChangeRestriction('titles')}
          onToggle={handleToggleCheckbox('titles', [])}
        />
        <BaptismFilter
          value={filterParams.restriction.is_baptized}
          onChange={handleChangeRestriction('is_baptized')}
          onToggle={handleToggleCheckbox('is_baptized', null)}
        />
        <MinisteriesFilter
          value={filterParams.restriction.ministeries}
          onChange={handleChangeRestriction('ministeries')}
          onToggle={handleToggleCheckbox('ministeries', {})}
        />
        <SystemAccessFilter
          value={filterParams.restriction.system_access}
          onToggle={handleToggleCheckbox('system_access', true)}
        />
      </FilterBody>

      <FilterBody>
        <FilterSubtitle>Ordenar tabela por:</FilterSubtitle>

        <OrderBody>
          {sortOptions.map(({ type, label }) => (
            <RadioOrder
              value={filterParams.sortable}
              type={type}
              label={label}
              onChange={handleChangeOrder}
            />
          ))}
        </OrderBody>
      </FilterBody>
    </Sidebar>
  )
}
