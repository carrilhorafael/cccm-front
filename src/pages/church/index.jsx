import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ChurchHeader from '../../components/church_header'
import { AuthContext } from '../../context/AuthContext'
import { getChurch } from '../../services/Api.service'
import ChurchGeneralPage from './components/general'
import ChurchMinisteriesPage from './components/ministeries'
import ChurchUsersPage from './components/users'

export default function ChurchSwitch(props) {
  const history = useHistory()
  const [churchShow, setChurchShow] = useState()
  const {user, userChurch} = useContext(AuthContext)

  useEffect(() => {
    let churchId = props.location.search.split('?id=')[1]
    if(user.president_pastor || churchId === userChurch.id){
      getChurch(churchId)
        .then(({data}) => {
          setChurchShow(data)
        })
        .catch(err => {
          console.log("Igreja não encontrada")
          history.push(`/church?id=${userChurch.id}`)
        })
    } else {
      history.push(`/church?id=${userChurch.id}`)
    }
  }, [])

  return(
    <>
      <ChurchHeader name={userChurch.name} />
      <Switch>
        <Route path={`church/general?id=${userChurch.id}`} component={ChurchGeneralPage}/>
        <Route path={`church/users?id=${userChurch.id}`} component={ChurchUsersPage}/>
        <Route path={`church/ministeries?id=${userChurch.id}`} component={ChurchMinisteriesPage}/>
      </Switch>
    </>
  )

}
