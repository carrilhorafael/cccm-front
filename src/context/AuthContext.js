import React, {useState, useEffect, createContext} from 'react'
import { useContext } from 'react'
import LoadingLocker from '../modules/LoadingLocker'
import { api, postLogin, getValidateToken, postResetPassword } from '../services/Api.service'
import { useChurchContext } from './ChurchContext'

export const AuthContext = createContext()

export function AuthProvider ({children}) {
  const { setChurch, loadResources } = useChurchContext()
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
      setChurch(data.church)
      setUserChurch(data.church)
    })
    .catch(()=>{
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    loadResources()
  }, [filter])

  const handleLogin = (email, password) => {
    let loginData = {
      user: {
        email,
        password
      }
    }

    return postLogin(loginData)
    .then(({data}) => {
      setUser(data.user)
      setFilter(data.filter)
      api.defaults.headers.Authorization = data.token
      setChurch(data.church)
      setUserChurch(data.church)
      localStorage.setItem("authtoken", data.token)
      setAuthenticated(true)
    })
  }

  const updateFilter = (filterParams) => {
    return api.put(`filters/${filter.id}`, filterParams)
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
    return postResetPassword(data)
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
      <LoadingLocker/>
      :
      children}
    </AuthContext.Provider>
  )

}

export function useAuthContext () {
  const context = useContext(AuthContext)
  return context
}
