import React, { useContext } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/header'
import { AuthContext } from './context/AuthContext'
import ChurchesPage from './pages/churches'
import ChurchPage from './pages/church'
import LoginPage from './pages/login'

// function CustomRoute({ pastorPresidentOnly, pageManager,  ...rest }) {
//   const {user, church, authenticated} = useContext(AuthContext)

//   if(!authenticated && rest.path !== "/login") return <Redirect to="/login"/>
//   else if(pastorPresidentOnly && !user.pastor_president) return <Redirect to="/403"/>
//   else if(authenticated && user.pastor_president && (rest.path === "/login" || rest.path === "/")) return <Redirect to="/churches"/>
//   else if(authenticated && (rest.path === "/login" || rest.path === "/")) return <Redirect to={{pathname: `/church`, state: { id: church.id }}}/>

//   return <Route {...rest}/>
// }


export default function Routes () {
  const { user, church, authenticated } = useContext(AuthContext)
  console.log(authenticated)
  return (
    <Router>
        <Header/>
        {!authenticated ?
          <Switch>
            <Route exact path="/"><Redirect to="/login" /></Route>
            <Route exact path="/login" component={LoginPage}/>
          </Switch>
            :
          <Switch>
            {user.president_pastor ? <Route path="/churches" component={ChurchesPage}/> : <Redirect to={`/church?id=${church.id}`}/>}
            <Route path="/church" component={ChurchPage}/>
            <Route path="*">{ user.president_pastor ? <Redirect to="/churches"/> : <Redirect to={`/church?id=${church.id}`} /> }</Route>
          </Switch>
        }
    </Router>
)

}
