import React, { createContext, useContext,  useState } from 'react'
import {
  deleteProselyte,
  postChurchCult,
  postChurchMinistery,
  postCultProselyte,
  putMinistery,
  putProselyte
} from 'services/Api.service'

export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [church, setChurch] = useState(null)
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])

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


  async function destroyProselyte(proselyteId){
    return deleteProselyte(proselyteId)
    .then(() => setProselytes(proselytes.filter(proselyte => proselyte.id !== proselyteId)))
  }

  return (
    <ChurchContext.Provider value={{

      church,
      updateMinistery,
      updateProselyte,
      createMinistery,
      createProselyte,
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
