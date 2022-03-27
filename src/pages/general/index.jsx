import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChurchesContext } from '../../context/ChurchesContext'
import './styles.css'

export default function ChurchGeneralPage () {
  const { church, setChurch, getChurch, loadResources } = useContext(ChurchesContext)
  const { user, userChurch } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const churchId = parseInt(window.location.search.split("?church_id=")[1])
    if(!church){
      if (user.president_pastor && userChurch.id !== churchId){
        getChurch(churchId)
      } else {
        setChurch(userChurch)
      }
    }
    loadResources(churchId)
    setIsLoading(false)
  }, [])

  return (
    <main className='pageLayout'>
      {isLoading ?
        <p>Carregando...</p>
        :
        <p>Essa é a página geral</p>
      }
    </main>
  )
}
