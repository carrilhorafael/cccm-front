import React, { createContext, useEffect, useState } from 'react'
import Loading from '../common/loading'
import { deleteMinistery, deleteProselyte, deleteUser, getChurchMinisteries, getChurchProselytes, getChurchResume, getChurchUsers, postChurchMinistery, postChurchProselyte, postChurchUser, putMinistery, putProselyte, putUser } from '../services/Api.service'

export const ChurchContext = createContext()

export function ChurchProvider ({churchProvided, children}) {
  const [isLoading, setIsLoading] = useState(false)
  const [church, setChurch] = useState(churchProvided)
  const [users, setUsers] = useState([])
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])

  useEffect(() => {
    if(!churchProvided || JSON.stringify(churchProvided) === "{}"){
      setUsers([])
      setResume({})
      setMinisteries([])
      setProselytes([])
    }
    setChurch(churchProvided)
  }, [churchProvided])

  useEffect(() => {
    async function reloadChurch() {
      setIsLoading(true)
      await loadResources()
      setTimeout(() => {setIsLoading(false)}, 500);
    }
    if (church && JSON.stringify(church) !== "{}") reloadChurch()
  }, [church])

  async function loadResources() {
    await getChurchUsers(church.id).then(({data}) => setUsers(data))
    await getChurchMinisteries(church.id).then(({data}) => setMinisteries(data))
    await getChurchResume(church.id).then(({data}) => setResume(data))
    await getChurchProselytes(church.id).then(({data}) => setProselytes(data))
  }

  async function createUser(userParams) {
    postChurchUser(church.id, userParams)
    .then(({data}) => {
      let newUsers = users
      let position = newUsers.findIndex(user => !user.is_leader)

      newUsers = [
        ...newUsers.slice(0, position),
        data,
        ...newUsers.slice(position)
      ]

      setUsers(newUsers)
    })
  }

  async function createMinistery(ministeryParams) {
    postChurchMinistery(church.id, ministeryParams)
    .then(({data}) => setMinisteries([...ministeries, data]))
  }

  async function createProselyte(proselyteParams) {
    postChurchProselyte(church.id, proselyteParams)
    .then(({data}) => setProselytes([data, ...proselytes]))
  }

  async function updateMinistery(ministeryId, ministeryParams) {
    putMinistery(ministeryId, ministeryParams)
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

  async function updateUser(userId, userParams) {
    putUser(userId, userParams)
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

  async function updateProselyte(proselyteId, proselyteParams) {
    putProselyte(proselyteId, proselyteParams)
    .then(({data}) => {
      let newProselytes = proselytes
      const resourceIndex = newProselytes.find(proselyte => proselyte.id === data.id)

      newProselytes = [
        ...newProselytes.slice(0, resourceIndex),
        data,
        ...newProselytes.slice(resourceIndex + 1)
      ]

      setProselytes(newProselytes)
    })
  }

  async function destroyMinistery(resource){
    deleteMinistery(resource.id)
    .then(({data}) => setMinisteries(ministeries.filter(ministery => ministery.id !== data.id)))
  }

  async function destroyUser(resource){
    deleteUser(resource.id)
    .then(({data}) => setUsers(users.filter(user => user.id !== data.id)))
  }

  async function destroyProselyte(resource){
    deleteProselyte(resource.id)
    .then(({data}) => setProselytes(proselytes.filter(proselyte => proselyte.id !== data.id)))
  }

  return (
    <ChurchContext.Provider value={{
      church,
      users,
      ministeries,
      resume,
      proselytes,
      updateUser,
      updateMinistery,
      updateProselyte,
      createMinistery,
      createUser,
      createProselyte,
      destroyMinistery,
      destroyUser,
      destroyProselyte
    }}>
      {isLoading &&
        <Loading message="Carregando informações da igreja"/>
      }
      {children}
    </ChurchContext.Provider>
  )
}
