import React, { createContext, useState } from 'react'
import { api } from '../services/Api.service'

export const ChurchContext = createContext()

export function ChurchProvider ({churchProvided, children}) {
  const [church, setChurch] = useState(churchProvided)
  const [users, setUsers] = useState([])
  const [ministeries, setMinisteries] = useState([])
  const [resume, setResume] = useState([])
  const [proselytes, setProselytes] = useState([])


}
