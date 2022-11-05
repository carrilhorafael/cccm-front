import React, { createContext, useContext,  useState } from 'react'
import {
  deleteProselyte,
  postChurchCult,
  postCultProselyte,
  putProselyte
} from 'services/Api.service'

export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [church, setChurch] = useState(null)
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])


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
      updateProselyte,
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
