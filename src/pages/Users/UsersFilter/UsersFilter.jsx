import Button from "atomics/Button"
import IconButton from "atomics/IconButton"
import { Footer } from "atomics/Modal/styles"
import Sidebar from "atomics/Sidebar"
import { useState } from "react"
import OrderFilter from "./components/OrderFilter"
import RestrictionFilter from "./components/RestrictionFilter"
import { SidebarBody } from "./UsersFilter.styles"

const defaultRestrictionValues = {
  name: '',
  titles: [],
  is_baptized: false,
  ministeries: [],
  system_access: true
}

export default function UsersFilter ({ filter, onChange, onHide, onSubmit }) {
  const handleCheckRestriction = (key) => () => {
    let newRestriction = { ...filter.restriction }


    if (newRestriction.hasOwnProperty(key)) {
      delete newRestriction[key]
    } else {
      newRestriction[key] = defaultRestrictionValues[key]
    }

    onChange({ ...filter, restriction: newRestriction})
  }

  const handleChangeRestriction = (key) => (value) => {
    let newRestriction = { ...filter.restriction }
    newRestriction[key] = value

    onChange({ ...filter, restriction: newRestriction })
  }

  const handleChangeSortable = (value) => {
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
      <RestrictionFilter
        restriction={filter.restriction}
        onCheck={handleCheckRestriction}
        onChange={handleChangeRestriction}
      />
      <OrderFilter
        sortable={filter.sortable}
        onChange={handleChangeSortable}
      />
    </Sidebar>
  )

}
