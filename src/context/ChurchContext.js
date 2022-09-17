import React, { createContext, useContext, useEffect, useState } from 'react'
import LoadingLocker from '../modules/LoadingLocker'
import {
  deleteMinistery,
  deleteProselyte,
  deleteUser,
  getChurch,
  postChurchCult,
  postChurchMinistery,
  postCultProselyte,
  postChurchUser,
  putMinistery,
  putProselyte,
  putUser,
} from '../services/Api.service'

export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [church, setChurch] = useState(null)
  const [users, setUsers] = useState([])
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])
  const [cults, setCults] = useState([])

  function updateChurch(params) {
    let newObj = {...church}

    setChurch({...newObj, ...params})
  }

  async function createUser(userParams) {
    return postChurchUser(church.id, userParams)
    .then(({data}) => {
      let newUsers = users
      let position = newUsers.findIndex(user => !user.is_leader)

      newUsers = [
        ...newUsers.slice(0, position),
        data,
        ...newUsers.slice(position)
      ]

      updateChurch({
        users: newUsers
      })
    })
  }

  async function createMinistery(ministeryParams) {
    return postChurchMinistery(church.id, ministeryParams)
  }

  async function createProselyte(cultDate, proselyteParams) {
    return postChurchCult(church.id, cultDate)
    .then(({data}) => {

      postCultProselyte(data.id, proselyteParams)
      .then(({data}) => {
        setProselytes([data, ...proselytes])
        let object_keys = Object.keys(resume.proselytes_in_last_semester)
        const object_key = object_keys[object_keys.length - 1]

        let newResume = resume
        newResume.proselytes_in_last_semester[object_key].push(data)
        setResume(newResume)
      })
    })
  }

  async function updateMinistery(ministeryId, ministeryParams) {
    return putMinistery(ministeryId, ministeryParams)
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
    return putUser(userId, userParams)
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
    return putProselyte(proselyteId, proselyteParams)
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
    return deleteMinistery(ministeryId)
    .then(() => setMinisteries(ministeries.filter(ministery => ministery.id !== ministeryId)))
  }

  async function destroyUser(userId){
    return deleteUser(userId)
    .then(() => setUsers(users.filter(user => user.id !== userId)))
  }

  async function destroyProselyte(proselyteId){
    return deleteProselyte(proselyteId)
    .then(() => setProselytes(proselytes.filter(proselyte => proselyte.id !== proselyteId)))
  }

  return (
    <ChurchContext.Provider value={{

      church,
      updateUser,
      updateMinistery,
      updateProselyte,
      createMinistery,
      createUser,
      createProselyte,
      destroyMinistery,
      destroyUser,
      destroyProselyte,
      setChurch
    }}>
      {children}
    </ChurchContext.Provider>
  )
}
export const useChurchContext = () => {
  const context = useContext(ChurchContext)
  return context
}
