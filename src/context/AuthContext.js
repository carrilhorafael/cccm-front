import React, {useState, useEffect, createContext} from 'react'
import Loading from '../common/loading'
import { api, postLogin, getValidateToken, postResetPassword } from '../services/Api.service'

export const AuthContext = createContext()

export function AuthProvider ({children}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [filter, setFilter] = useState({})
  const [userChurch, setUserChurch] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    let token = localStorage.getItem("authtoken")
    getValidateToken(token)
    .then(({data}) => {
      setUser(data.user)
      setFilter(data.filter)
      setLoading(false)
      setAuthenticated(true)
      setUserChurch(data.church)
    })
    .catch(()=>{
      setLoading(false)
    })
  }, [])

  const handleLogin = (email, password) => {
    let loginData = {
      user: {
        email,
        password
      }
    }

    postLogin(loginData)
    .then(({data}) => {
      setUser(data.user)
      setFilter(data.filter)
      api.defaults.headers.Authorization = data.token
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  const updateFilter = (filterParams) => {
    api.put(`filters/${filter.id}`, filterParams)
    .then(({data}) => setFilter(data))
  }

  const handleLogout = () => {
    localStorage.removeItem('authtoken')
    setUser({})
    setUserChurch({})
    setFilter({})
    setAuthenticated(false)
  }

  const handleChangePassword = (data) => {
    postResetPassword(data)
    .then(({ data }) => {
      setUser(data.user)
      setUserChurch(data.church)
      setFilter(data.filter)
      api.defaults.headers.Authorization = data.token
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userChurch,
        filter,
        authenticated,
        handleLogin,
        handleChangePassword,
        updateFilter,
        handleLogout
      }}>
      {loading?
      <Loading/>
      :
      children}
    </AuthContext.Provider>
  )

}
