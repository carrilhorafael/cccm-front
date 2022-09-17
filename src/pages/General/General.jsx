import React, { useReducer } from 'react'
import { useChurchContext } from '../../context/ChurchContext'
import BirthdatePerMonth from './components/BirthdatePerMonth'
import { GeneralLayout, Item } from './General.styles'
import { useEffect } from 'react'
import LoadingLocker from '../../modules/LoadingLocker'
import { ActionStatus, initialState, reducer } from './store'
import loadChurchResume from './actions/loadChurchResume'
import ProselytesAtSemester from './components/ProselytesAtSemester'

export default function General () {
  const [{ birthdates, proselytesAtSemester, status }, dispatch] = useReducer(reducer, initialState)

  const { church } = useChurchContext()

  useEffect(() => {
    if (!church) return
    loadChurchResume(dispatch, church)
  }, [church])

  return (
    <GeneralLayout>
      {status === ActionStatus.LOADING &&
        <LoadingLocker message="Carregando informações da igreja"/>
      }
      {status === ActionStatus.COMPLETED && birthdates && (
        <Item>
          <BirthdatePerMonth birthdates={birthdates}/>
        </Item>
      )}
      {status === ActionStatus.COMPLETED && proselytesAtSemester && (
        <Item>
          <ProselytesAtSemester graph={proselytesAtSemester}/>
        </Item>
      )}
    </GeneralLayout>
  )
}

