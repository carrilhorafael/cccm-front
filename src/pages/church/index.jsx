import React, { useContext, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ChurchHeader from '../../components/church_header'
import { AuthContext } from '../../context/AuthContext'
import { ChurchContext } from '../../context/ChurchContext'
import { getChurch } from '../../services/Api.service'
import GeneralPage from './components/general'
import MinisteriesPage from './components/ministeries'
import UsersPage from './components/users'

export default function ChurchPage(props) {
  const history = useHistory()
  const { tab, setChurch } = useContext(ChurchContext)
  const { user, userChurch } = useContext(AuthContext)

  useEffect(() => {
    let churchId = props.location.search.split('?id=')[1]
    if(user.president_pastor || churchId === userChurch.id){
      getChurch(churchId)
        .then(({data}) => {
          setChurch(data)
        })
        .catch(err => {
          console.log("Igreja não encontrada")
          setChurch(userChurch)
          history.push(`/church?id=${userChurch.id}`)
        })
      } else {
      setChurch(userChurch)
      history.push(`/church?id=${userChurch.id}`)
    }
  }, [])

  const getTabScreen = () => {
    switch (tab) {
      case "general":
        return <GeneralPage/>
      case "users":
        return <UsersPage/>
      case "ministeries":
        return <MinisteriesPage/>
      default:
        break;
    }
  }

  return(
    <main className='churchLayout'>
      <ChurchHeader/>
      {getTabScreen()}
    </main>
  )

}
