import React, { useContext } from 'react'
import ProselytesLastSemester from '../../common/proselyteLastSemester'
import { ChurchContext } from '../../context/ChurchContext'
import BirthdatePerMonth from './components/birthdatePerMonth'
import './styles.css'

export default function ChurchGeneralPage () {
  const { resume } = useContext(ChurchContext)

  return (
    <main className='pageLayout'>
      <div className='mainGeneralLayout'>
        {resume.users_grouped_by_birthdate_month && <BirthdatePerMonth />}
        {resume.proselytes_in_last_semester && <ProselytesLastSemester />}
      </div>
    </main>
  )
}

