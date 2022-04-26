import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './common/header'
import { AuthContext } from './context/AuthContext'
import ChurchesPage from './pages/churches'
import LoginPage from './pages/login'
import ChurchGeneralPage from './pages/general'
import ChurchUsersPage from './pages/users'
import ChurchFormUserPage from './pages/formUser'
import ChurchMinisteriesPage from './pages/ministeries'
import PasswordChangePage from './pages/passwordChange'
import { ChurchProvider } from './context/ChurchContext'

// function CustomRoute({ pastorPresidentOnly, pageManager,  ...rest }) {
//   const {user, church, authenticated} = useContext(AuthContext)

//   if(!authenticated && rest.path !== "/login") return <Redirect to="/login"/>
//   else if(pastorPresidentOnly && !user.pastor_president) return <Redirect to="/403"/>
//   else if(authenticated && user.pastor_president && (rest.path === "/login" || rest.path === "/")) return <Redirect to="/churches"/>
//   else if(authenticated && (rest.path === "/login" || rest.path === "/")) return <Redirect to={{pathname: `/church`, state: { id: church.id }}}/>

//   return <Route {...rest}/>
// }


export default function Routes () {
  const { user, authenticated, userChurch } = useContext(AuthContext)
  const [churchProvided, setChurchProvided] = useState({})

  const resetChurchProvided = () => setChurchProvided({})

  return (
    <Router>
      <ChurchProvider churchProvided={churchProvided}>
        <Header churchProvided={churchProvided} resetChurchProvided={resetChurchProvided}/>
        {!authenticated ?
          <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/account" component={PasswordChangePage}/>
            <Route path="*"><Redirect to="/login" /></Route>
          </Switch>
          :
          <Switch>
            <Route path="/churches"> <ChurchesPage setChurchProvided={(church) => setChurchProvided(church)}/></Route>
            <Route path="/church/general" component={ChurchGeneralPage}/>
            <Route path="/church/users" component={ChurchUsersPage}/>
            <Route path="/church/user" component={ChurchFormUserPage}/>
            <Route path="/church/ministeries" component={ChurchMinisteriesPage}/>
            {/* <Route path="/church/proselytes" component={ChurchProselytesPage}/> */}
            {user.president_pastor && <Route path="*"/> && <Redirect to="/churches"/>}
            <Route path="*"> <Redirect to="/church/general"/> </Route>
          </Switch>
        }
      </ChurchProvider>
    </Router>
)

}
