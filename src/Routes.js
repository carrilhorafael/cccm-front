import React, { useContext } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import CreateUserPage from './pages/CreateUserPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'

function CustomRoute({ pageMaster, pageManager,  ...rest }) {
  const {user, authenticated} = useContext(AuthContext)
  if(!authenticated && rest.path !== "/login") return <Redirect to="/login"/>
  else if(pageMaster && !user.is_master) return <Redirect to="/403"/>
  else if(pageManager && !(user.is_master || user.is_manager)) return <Redirect to="/403"/>
  else if(authenticated && rest.path === "/login") return <Redirect to="/"/>

  return <Route {...rest}/>
}


export default function Routes () {
  return (
    <Router>
        {/* <Header/> */}
        <Switch>
            <CustomRoute exact path="/login" component={LoginPage}/>
            <CustomRoute pageManager exact path="/" component={UsersPage}/>
            <CustomRoute pageManager exact path="/create_users" component={CreateUserPage}/>
        </Switch>
    </Router>
)

}
