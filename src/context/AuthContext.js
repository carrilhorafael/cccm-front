import React, {useState, useEffect, createContext} from 'react'
import { api, postLogin, getValidateUser } from '../services/Api.service'


export const AuthContext = createContext()

export function AuthProvider ({children}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("authtoken")
    if (token){
      console.log(token)
      api.defaults.headers.Authorization = token
      getValidateUser(token)
      .then(({data}) => {
        setUser(data)
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
      api.defaults.headers.Authorization = data.token
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  const handleLogout = () => {
    console.log("logout")
  }

  return (
    <AuthContext.Provider value={{user, authenticated, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  )

}
