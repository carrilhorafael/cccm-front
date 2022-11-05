import React from 'react'
import Button from 'atomics/Button'
import { Footer } from 'atomics/Modal/styles'
import Sidebar from 'atomics/Sidebar'
import { FilterBody, FilterSubtitle, OrderBody } from '../UsersFilter.styles'
import BaptismFilter from './BaptismFilter'
import MinisteriesFilter from './MinisteriesFilter'
import NameFilter from './NameFilter'
import RadioOrder from './RadioOrder'
import SystemAccessFilter from './SystemAccessFilter'
import TitleFilter from './TitleFilter'
import { sortOptions } from '../sortOptions'

export default function FilterSidebar ({
  filter,
  onChangeOrder,
  onChangeRestriction,
  onToggleCheckbox,
  onHide,
  onSubmit
}) {
  return (
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
  )
}
