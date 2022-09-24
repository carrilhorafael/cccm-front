import React, { useReducer } from 'react'
import { useChurchContext } from 'context/ChurchContext'
import { GeneralLayout, Item, LoadingWrapper } from './Users.styles'
import Loading from 'atomics/Loading'
import { ActionStatus, initialState, reducer } from './store'
import Accordion from './Accordion/Accordion'
import Header from './Header/Header'
import { useEffect } from 'react'
import { loadUsers, setInitialState} from './actions'

export default function Users () {
  const [{ users, filter, status }, dispatch] = useReducer(reducer, initialState)
  const { church } = useChurchContext()

  useEffect(() => {
    if (status === ActionStatus.LOADING_USERS) {
      console.log('entrei LOADING_USERS')
      loadUsers(dispatch, church.id)
    }
  }, [church, status])

  useEffect(() => {
    console.log('entrei LOADING')
    setInitialState(dispatch, church.id)
  }, [church])

  return (
    <GeneralLayout>
        {status === ActionStatus.LOADING ?
          <LoadingWrapper>
            <Loading size='md' theme='primary' />
          </LoadingWrapper>
          :
          <Item>
            <Header dispatch={dispatch} filter={filter} />
            <Accordion dispatch={dispatch} users={users} />
          </Item>
        }
    </GeneralLayout>
  )
}
