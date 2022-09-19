import React, { useReducer } from 'react'
import { useChurchContext } from 'context/ChurchContext'
import { GeneralLayout, Item, LoadingWrapper } from './Users.styles'
import Loading from 'atomics/Loading'
import { ActionStatus, initialState, reducer } from './store'
import Accordion from './Accordion/Accordion'
import Header from './Header/Header'
import { useEffect } from 'react'
import { loadFilter, loadUsers } from './actions'

export default function Users () {
  const [{ users, filter, status }, dispatch] = useReducer(reducer, initialState)
  const { church } = useChurchContext()

  useEffect(() => {
    loadUsers(dispatch, church)
    loadFilter(dispatch)
  }, [church])

  return (
    <GeneralLayout>
        {status === ActionStatus.LOADING ?
          <LoadingWrapper>
            <Loading size='md' theme='primary' />
          </LoadingWrapper>
          :
          <Item>
            <Header dispatch={dispatch} filter={filter} church={church} />
            <Accordion dispatch={dispatch} users={users} />
          </Item>
        }
    </GeneralLayout>
  )
}
