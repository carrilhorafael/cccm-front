import React, { useContext } from 'react'
import ProselytesLastSemester from '../../modules/proselyteLastSemester'
import { ChurchContext } from '../../context/ChurchContext'
import BirthdatePerMonth from './components/birthdatePerMonth'
import { GeneralLayout } from './styles'

export default function ChurchGeneralPage () {
  const { resume } = useContext(ChurchContext)

  return (
    <GeneralLayout>
      {resume.users_grouped_by_birthdate_month && <BirthdatePerMonth />}
      {resume.proselytes_in_last_semester && <ProselytesLastSemester />}
    </GeneralLayout>
  )
}

