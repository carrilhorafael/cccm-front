import IconButton from "atomics/IconButton"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { updateFilter } from "../actions"
import { ActionType } from "../store"
import FilterSidebar from "./components/FilterSidebar"
import { UsersPageHeader } from "./Header.styles"

export default function Header ({ dispatch, filter }) {
  const history = useHistory()
  const [show, setShow] = useState(false)

  const handleChange = (filterParams) => {
    dispatch({
      type: ActionType.SET_FILTER,
      payload: filterParams
    })
  }

  const handleHide = () => {
    dispatch({
      type: ActionType.RESET_FILTER
    })
    setShow(false)
  }

  const handleSubmit = () => {
    updateFilter(dispatch, filter)
    setShow(false)
  }

  return (
    <>
      {show && (
        <FilterSidebar
          filter={filter}
          onHide={handleHide}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      <UsersPageHeader>
        <span/>
        <div>
          <IconButton theme='secondary' icon="fa-solid fa-filter" onClick={() => setShow(true)} />
          <IconButton theme='primary' icon="fa-solid fa-user-plus" onClick={() => history.push("/church/user")} />
        </div>
      </UsersPageHeader>
    </>
  )

}
