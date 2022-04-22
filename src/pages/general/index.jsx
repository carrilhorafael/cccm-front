import React, { useContext, useEffect, useState } from 'react'
import IconButton from '../../common/iconButton'
import Loading from '../../common/loading'
import ProselyteModal from '../../common/modals/proselytesModal'
import { AuthContext } from '../../context/AuthContext'
import { ChurchesContext } from '../../context/ChurchesContext'
import BirthdatePerMonth from './components/birthdatePerMonth'
import ProselytesLastYear from './components/proselytesLastYear'
import './styles.css'

export default function ChurchGeneralPage () {
  const { loadedResources, church, setChurch, getChurch, loadResources } = useContext(ChurchesContext)
  const { user, userChurch } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [chartType, setChartType] = useState('bar')

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

    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  }, [])

  return (
    <main className='pageLayout'>
      {isLoading ?
        <Loading message="Carregando informações"/>
        :
        <div className='mainGeneralLayout'>
          <BirthdatePerMonth />
          <div className='chartMainLayout'>
            <h3>Convertidos por mês (ultimo semestre)</h3>
            <div className='chartMain'>
              <ProselytesLastYear type={chartType}/>
              <div className='actionsProselyteGraph'>
                <IconButton
                  icon={chartType === 'line' ? 'fa-solid fa-chart-simple' : 'fa-solid fa-chart-line'}
                  onClick={() => setChartType(chartType === 'line' ? 'bars' : 'line')}
                />
                <IconButton
                  icon="fa-solid fa-square-arrow-up-right"
                  onClick={() => console.log('teste')}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </main>
  )
}
