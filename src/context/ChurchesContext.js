import React, {useState, createContext, useEffect} from 'react'
import { api } from '../services/Api.service'

export const ChurchesContext = createContext()

export function ChurchesProvider ({children}) {
  const [churches, setChurches] = useState([])
  const [church, setChurch] = useState(null)
  const [users, setUsers] = useState([])
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])
  const [loadedResources, setLoadedResources] = useState(false)

  const getMinisteriesItems = () => {
    return ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))
  }

  const getChurchTitles = () => {
    return church?.titles.map(title => ({ label: title, value: title }))
  }

  const loadResources = async (churchId) => {
    await getUsers(churchId)
    await getMinisteries(churchId)
    await getResume(churchId)
    setLoadedResources(true)
  }

  const getChurch = async (churchId) => {
    api.get(`churches/${churchId}`)
    .then(({data}) => setChurch(data))
  }

  const getChurches = () => {
    api.get("churches/")
    .then(({data}) => setChurches(data))
  }

  const getResume = (churchId) => {
    api.get(`churches/${churchId}/resume`)
    .then(({data}) => setResume(data))
  }

  const getUsers = (churchId) => {
    api.get(`churches/${churchId}/users`)
    .then(({data}) => setUsers(data))
  }

  const getMinisteries = (churchId) => {
    api.get(`churches/${churchId}/ministeries`)
    .then(({data}) => setMinisteries(data))
  }

  const getProselytes = (churchId) => {
    api.get(`churches/${churchId}/proselytes`)
    .then(({data}) => setProselytes(data))
  }

  const destroyMinistery = async (ministeryId) => {
    api.delete(`ministeries/${ministeryId}`)
    .then(() => {setMinisteries(ministeries.filter(ministery => ministery.id !== ministeryId))})
  }

  const destroyUser = async (userId) => {
    api.delete(`users/${userId}`)
    .then(() => {
      let resources = users
      const trash = resources.find(user => user.id === userId)
      resources = resources.filter(user => user.id !== userId)
      if (!resources.map(e => e.title).includes(trash.title)) setChurch(prevState => ({...prevState, titles: prevState.titles.filter(title => title !== trash.title)}))
      setUsers(resources)
    })
  }

  const destroyChurch = async (churchId) => {
    api.delete(`churches/${churchId}`)
    .then(() => setChurches(churches.filter(church => church.id !== churchId)))
  }

  const getMemberCard = (userId) => {
    window.open(`${api.defaults.baseURL}/users/${userId}/member_card`)
  }

  const createUser = async (userParams) => {
    api.post(`churches/${church.id}/users`, userParams)
    .then(({data}) => {
      let newUsers = users
      let position = newUsers.findIndex(user => !user.is_leader)

      newUsers = [
        ...newUsers.slice(0, position),
        data,
        ...newUsers.slice(position)
      ]

      if (!church.titles.includes(data.title)) setChurch(prevState => ({...prevState, titles: [...prevState.titles, data.title]}))
      setUsers(newUsers)
    })
  }

  const createMinistery = async (ministeryParams) => {
    api.post(`churches/${church.id}/ministeries`, ministeryParams)
    .then(({data}) => {
      setMinisteries([...ministeries, data])
    })
  }

  const createChurch = async (churchParams) => {
    api.post("churches", churchParams)
    .then(({data}) => setChurches([...churches, data]))
  }

  const updateUser = async (userId, userParams) => {
    api.put(`users/${userId}`, userParams)
    .then(({data}) => {
      let newUsers = users
      const resourceIndex = newUsers.findIndex(user => user.id === data.id)

      newUsers = [
        ...newUsers.slice(0, resourceIndex),
        data,
        ...newUsers.slice(resourceIndex + 1)
      ]
      if (church.titles.includes(data.title)) setChurch(prevState => ({...prevState, titles: [...prevState.titles, data.title]}))
      setUsers(newUsers)
    })
  }

  const updateMinistery = async (ministeryId, ministeryParams) => {
    api.put(`ministeries/${ministeryId}`, ministeryParams)
    .then(({data}) => {
      let newMinisteries = ministeries
      const resourceIndex = newMinisteries.findIndex(ministery => ministery.id === data.id)

      newMinisteries = [
        ...newMinisteries.slice(0, resourceIndex),
        data,
        ...newMinisteries.slice(resourceIndex + 1)
      ]
      setMinisteries(newMinisteries)
    })
  }

  const updateChurch = async (churchId, churchParams) => {
    api.put(`churches/${churchId}`, churchParams)
    .then(({data}) => {
      let newChurches = churches
      const position = newChurches.findIndex(church => church.id === data.id)

      newChurches = [
        ...newChurches.slice(0, position),
        data,
        ...newChurches.slice(position + 1)
      ]
      setChurches(newChurches)
    })
  }

  const revokeUserAccess = async (userId) => {
    api.put(`users/${userId}/revoke_access`)
    .then(({data}) => {
      let newUsers = users
      const resourceIndex = newUsers.findIndex(user => user.id === data.id)

      newUsers = [
        ...newUsers.slice(0, resourceIndex),
        data,
        ...newUsers.slice(resourceIndex + 1)
      ]
      setUsers(newUsers)
    })
  }

  const grantUserAccess = async (userId) => {
    api.put(`users/${userId}/grant_access`)
    .then(({data}) => {
      let newUsers = users
      const resourceIndex = newUsers.findIndex(user => user.id === data.id)

      newUsers = [
        ...newUsers.slice(0, resourceIndex),
        data,
        ...newUsers.slice(resourceIndex + 1)
      ]
      setUsers(newUsers)
    })
  }

  return (
    <ChurchesContext.Provider value={{
      church,
      users,
      ministeries,
      churches,
      resume,
      proselytes,
      loadedResources,
      setChurch,
      getChurch,
      getUsers,
      getMinisteries,
      loadResources,
      getChurches,
      getMemberCard,
      updateUser,
      updateMinistery,
      updateChurch,
      revokeUserAccess,
      grantUserAccess,
      createUser,
      createMinistery,
      createChurch,
      destroyUser,
      destroyMinistery,
      destroyChurch,
      getChurchTitles,
      getProselytes,
      getMinisteriesItems
    }}>

      {children}
    </ChurchesContext.Provider>
  )

}
