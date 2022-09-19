import React from 'react'
import Button from 'atomics/Button'
import { Footer } from 'atomics/Modal/styles'
import Sidebar from 'atomics/Sidebar'
import { FilterBody, FilterSubtitle, OrderBody } from '../Header.styles'
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

export default function FilterSidebar ({ filter, onHide, onChange, onSubmit }) {
  const handleToggleCheckbox = (key, defaultValue) => () => {
    let newRestriction = { ...filter.restriction }


    if (newRestriction.hasOwnProperty(key)) {
      delete newRestriction[key]
    } else {
      newRestriction[key] = defaultValue
    }

    onChange({ ...filter, restriction: newRestriction})
  }

  const handleChangeRestriction = (key) => (value) => {
    let newRestriction = { ...filter.restriction }
    newRestriction[key] = value

    onChange({ ...filter, restriction: newRestriction })
  }

  const handleChangeOrder = (value) => {
    onChange({ ...filter, sortable: value })
  }

  return (
    <Sidebar
      onHide={onHide}
      title="Filtros"
      placement="right"
      Footer={
        <Footer>
          <Button theme="primary" onClick={onSubmit} title='Salvar filtro'/>
        </Footer>
      }
    >
      <FilterBody>
        <FilterSubtitle>Filtrar tabela por:</FilterSubtitle>
        <NameFilter
          value={filter.restriction.name}
          onChange={handleChangeRestriction('name')}
          onToggle={handleToggleCheckbox('name', '')}
        />
        <TitleFilter
          value={filter.restriction.titles}
          onChange={handleChangeRestriction('titles')}
          onToggle={handleToggleCheckbox('titles', [])}
        />
        <BaptismFilter
          value={filter.restriction.is_baptized}
          onChange={handleChangeRestriction('is_baptized')}
          onToggle={handleToggleCheckbox('is_baptized', false)}
        />
        <MinisteriesFilter
          value={filter.restriction.ministeries}
          onChange={handleChangeRestriction('ministeries')}
          onToggle={handleToggleCheckbox('ministeries', {})}
        />
        <SystemAccessFilter
          value={filter.restriction.system_access}
          onToggle={handleToggleCheckbox('system_access', true)}
        />
      </FilterBody>

      <FilterBody>
        <FilterSubtitle>Ordenar tabela por:</FilterSubtitle>

        <OrderBody>
          {sortOptions.map(({ type, label }) => (
            <RadioOrder
              value={filter.sortable}
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
