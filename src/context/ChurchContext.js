import React, { createContext, useContext, useEffect, useState } from 'react'
import LoadingLocker from '../modules/LoadingLocker'
import { deleteMinistery, deleteProselyte, deleteUser, getChurchMinisteries, getChurchProselytes, getChurchResume, getChurchUsers, postChurchCult, postChurchMinistery, postCultProselyte, postChurchUser, putMinistery, putProselyte, putUser } from '../services/Api.service'
import { AuthContext } from './AuthContext'

export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [isLoading, setIsLoading] = useState(false)
  const [church, setChurch] = useState(null)
  const [users, setUsers] = useState([])
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])


  useEffect(() => {
    async function reloadChurch() {
      setIsLoading(true)
      await loadResources()
      setTimeout(() => {setIsLoading(false)}, 500);
    }
    if(!church){
      setUsers([])
      setResume({})
      setMinisteries([])
      setProselytes([])
    } else {
      reloadChurch()
    }
  }, [church])

  // useEffect(() => {
  //   getChurchUsers(church.id).then(({data}) => setUsers(data))
  // }, [filter])

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

  async function createProselyte(cultDate, proselyteParams) {
    postChurchCult(church.id, cultDate)
    .then(({data}) => {

      postCultProselyte(data.id, proselyteParams)
      .then(({data}) => {
        setProselytes([data, ...proselytes])
        let object_keys = Object.keys(resume.proselytes_in_last_semester)
        const object_key = object_keys[object_keys.length - 1]

        let newResume = resume
        newResume.proselytes_in_last_semester[object_key].push(data)
        console.log(newResume)
        setResume(newResume)
      })
    })
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

  async function destroyMinistery(ministeryId){
    deleteMinistery(ministeryId)
    .then(() => setMinisteries(ministeries.filter(ministery => ministery.id !== ministeryId)))
  }

  async function destroyUser(userId){
    deleteUser(userId)
    .then(() => setUsers(users.filter(user => user.id !== userId)))
  }

  async function destroyProselyte(proselyteId){
    deleteProselyte(proselyteId)
    .then(() => setProselytes(proselytes.filter(proselyte => proselyte.id !== proselyteId)))
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
      destroyProselyte,
      setChurch,
    }}>
      {isLoading &&
        <LoadingLocker message="Carregando informações da igreja"/>
      }
      {children}
    </ChurchContext.Provider>
  )
}
export const useChurchContext = () => {
  const context = useContext(ChurchContext)
  return context
}
