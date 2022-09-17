import React, { useState } from 'react'
import ProselytesLastSemester from '../../modules/proselyteLastSemester'
import { useChurchContext } from '../../context/ChurchContext'
import BirthdatePerMonth from './components/birthdatePerMonth'
import { GeneralLayout, Item } from './styles'
import { useEffect } from 'react'
import { getChurchResume } from '../../services/Api.service'
import { useOverlayContext } from '../../context/OverlayContext'
import LoadingLocker from '../../modules/LoadingLocker'

export default function ChurchGeneralPage () {
  const { church } = useChurchContext()
  const { fireToast } = useOverlayContext()
  const [resume, setResume] = useState({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!church) return
    getChurchResume(church.id)
      .then(({ data }) => setResume(data))
      .catch(() => fireToast('negative', 'Ops, algo deu errado em nosso servidor.'))
      .finally(() => setLoading(false))
  }, [church, fireToast])

  return (
    <GeneralLayout>
      {isLoading &&
        <LoadingLocker message="Carregando informações da igreja"/>
      }
      {resume.users_grouped_by_birthdate_month && (
        <Item>
          <BirthdatePerMonth birthdates={resume.users_grouped_by_birthdate_month}/>
        </Item>
      )}
      {resume.proselytes_in_last_semester && (
        <Item>
          <ProselytesLastSemester graph={resume.proselytes_in_last_semester}/>
        </Item>
      )}
    </GeneralLayout>
  )
}

