import React, {useState, useEffect, createContext, useContext} from 'react'
import Loading from '../common/loading'
import { api } from '../services/Api.service'
import { ChurchesContext } from './ChurchesContext'

export const AuthContext = createContext()

export function AuthProvider ({children}) {
  const [authenticated, setAuthenticated] = useState(false)
  const { church, setChurch, getUsers } = useContext(ChurchesContext)
  const [user, setUser] = useState({})
  const [filter, setFilter] = useState({})
  const [userChurch, setUserChurch] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function tryAutenticate(token) {
      setLoading(true)
      api.defaults.headers.Authorization = token
      await api.get("validate_user")
      .then(({data}) => {
        setUser(data.user)
        setFilter(data.filter)
        setUserChurch(data.church)
        if (!data.user.president_pastor) setChurch(data.church)
        setAuthenticated(true)
      })
      setLoading(false)
    }
    let token = localStorage.getItem("authtoken")
    tryAutenticate(token)
  }, [])

  const handleLogin = (email, password) => {
    let loginData = {
      user: {
        email,
        password
      }
    }

    api.post("auth/login", loginData)
    .then(({data}) => {
      setUser(data.user)
      setFilter(data.filter)
      if (!data.user.president_pastor) setChurch(data.church)
      api.defaults.headers.Authorization = data.token
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  const updateFilter = (filterParams) => {
    api.put(`filters/${filter.id}`, filterParams)
    .then(({data}) => {
      getUsers(church.id)
      setFilter(data)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('authtoken')
    setUser({})
    setUserChurch({})
    setFilter({})
    setChurch()
    setAuthenticated(false)
  }

  const handleChangePassword = (data) => {
    api.post('auth/reset', data)
    .then(({ data }) => {
      setUser(data.user)
      setFilter(data.filter)
      if (!data.user.president_pastor) setChurch(data.church)
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
        setFilter,
        handleLogin,
        handleChangePassword,
        updateFilter,
        handleLogout
      }}>
      {loading && <Loading/> }
      {children}
    </AuthContext.Provider>
  )

}
