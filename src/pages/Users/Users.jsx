import React, { useReducer } from 'react'
import { useChurchContext } from 'context/ChurchContext'
import { useAuthContext } from 'context/AuthContext'
import { GeneralLayout, Item, LoadingWrapper, UsersPageHeader } from './Users.styles'
import Loading from 'atomics/Loading'
import { ActionStatus, ActionType, initialState, reducer } from './store'
import { useEffect } from 'react'
import { setInitialState, updateFilter} from './actions'
import ResourcesAccordion from 'modules/AccordionTable'
import AccordionLineHeader from './components/AccordionLineHeader'
import AccordionLineBody from './components/AccordionLineBody'
import { getBodyHeight, getMenuConfigs } from './utils'
import { useHistory } from 'react-router-dom'
import IconButton from 'atomics/IconButton'
import UsersFilter from './UsersFilter/UsersFilter'

export default function Users () {
  const [{ users, filter, status, showUsersFilter }, dispatch] = useReducer(reducer, initialState)
  const { church } = useChurchContext()
  const { user } = useAuthContext()
  const history = useHistory()

  useEffect(() => {
    setInitialState(dispatch, church.id)
  }, [church])

  const setFilter = (filterParams) => {
    dispatch({
      type: ActionType.SET_FILTER,
      payload: filterParams
    })
  }

  const closeUsersFilter = () => {
    dispatch({
      type: ActionType.CLOSE_USERS_FILTER
    })
  }

  const openUsersFilter = () => {
    dispatch({
      type: ActionType.OPEN_USERS_FILTER
    })
  }

  return (
    <GeneralLayout>
      {showUsersFilter && (
        <UsersFilter
          filter={filter}
          onChange={setFilter}
          onHide={closeUsersFilter}
          onSubmit={() => updateFilter(dispatch, filter, church)}
        />
      )}
      {status === ActionStatus.LOADING ?
        <LoadingWrapper>
          <Loading size='md' theme='primary' />
        </LoadingWrapper>
        :
        <Item>
          <UsersPageHeader>
            <span/>
            <div>
              <IconButton
                theme='secondary'
                icon="fa-solid fa-filter"
                onClick={openUsersFilter}
              />
              <IconButton
                theme='primary'
                icon="fa-solid fa-user-plus"
                onClick={() => history.push("/church/user")}
              />
            </div>
          </UsersPageHeader>
          <ResourcesAccordion
            resources={users}
            resourceName="Membros"
            CardHeader={AccordionLineHeader}
            CardBody={AccordionLineBody}
            getMenuConfigs={getMenuConfigs(dispatch, user, history)}
            getBodyHeight={getBodyHeight}
            hasMenu
          />
        </Item>
      }
    </GeneralLayout>
  )
}
