import React, {useState, useEffect, createContext} from 'react'
import { api, postLogin, getValidateUser } from '../services/Api.service'


export const AuthContext = createContext()

export function AuthProvider ({children}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [userChurch, setUserChurch] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("authtoken")
    if (token){
      api.defaults.headers.Authorization = token
      getValidateUser(token)
      .then(({data}) => {
        setUser(data)
        setUserChurch(data.church)
        setAuthenticated(true)
      })
    }
  }, [])

  const handleLogin = (email, password) => {

    let emailData = {
      user: {
        email,
        password
      }
    }

    postLogin(emailData)
    .then(({data}) => {
      setUser(data.user)
      setUserChurch(data.user.church)
      api.defaults.headers.Authorization = data.token
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  const handleLogout = () => {
    console.log("logout")
  }

  return (
    <AuthContext.Provider value={{user, userChurch, authenticated, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )

}
