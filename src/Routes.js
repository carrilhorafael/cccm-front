import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './modules/Header'
import { useAuthContext } from './context/AuthContext'
import { Churches, Cults, FormUser, General, Login, Ministeries, PasswordChange, Users } from 'pages'

export default function Routes () {
  const { authenticated } = useAuthContext()

  return (
    <Router>
      <Header/>
      {!authenticated ?
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/account" component={PasswordChange}/>
          <Route path="*"><Redirect to="/login" /></Route>
        </Switch>
        :
        <Switch>
          <Route path="/churches" component={Churches}/>
          <Route path="/church/general" component={General}/>
          <Route path="/church/users" component={Users}/>
          <Route path="/church/user" component={FormUser}/>
          <Route path="/church/ministeries" component={Ministeries}/>
          <Route path="/church/cults" component={Cults}/>
          {/* <Route path="/church/proselytes" component={ChurchProselytesPage}/> */}
          {/* {user.president_pastor && <Route path="*"/> && <Redirect to="/churches"/>} */}
          <Route path="*"> <Redirect to="/church/general"/> </Route>
        </Switch>
      }
    </Router>
)

}
