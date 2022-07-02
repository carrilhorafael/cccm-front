import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './modules/Header'
import { useAuthContext } from './context/AuthContext'
import ChurchesPage from './pages/churches'
import LoginPage from './pages/login'
import ChurchGeneralPage from './pages/general'
import ChurchUsersPage from './pages/users'
import ChurchFormUserPage from './pages/formUser'
import ChurchMinisteriesPage from './pages/ministeries'
import PasswordChangePage from './pages/passwordChange'

export default function Routes () {
  const { authenticated } = useAuthContext()

  return (
    <Router>
      <Header/>
      {!authenticated ?
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/account" component={PasswordChangePage}/>
          <Route path="*"><Redirect to="/login" /></Route>
        </Switch>
        :
        <Switch>
          <Route path="/churches" component={ChurchesPage}></Route>
          <Route path="/church/general" component={ChurchGeneralPage}/>
          <Route path="/church/users" component={ChurchUsersPage}/>
          <Route path="/church/user" component={ChurchFormUserPage}/>
          <Route path="/church/ministeries" component={ChurchMinisteriesPage}/>
          {/* <Route path="/church/proselytes" component={ChurchProselytesPage}/> */}
          {/* {user.president_pastor && <Route path="*"/> && <Redirect to="/churches"/>} */}
          <Route path="*"> <Redirect to="/church/general"/> </Route>
        </Switch>
      }
    </Router>
)

}
