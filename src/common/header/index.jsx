import React, { useContext } from 'react'
import { ChurchesContext } from '../../context/ChurchesContext'
import ChurchHeader from '../churchHeader'

export default function Header () {
  const { church } = useContext(ChurchesContext)

  return (
    <header>
      <h1>CCCM</h1>
      {church && <ChurchHeader/>}
    </header>
  )
}
