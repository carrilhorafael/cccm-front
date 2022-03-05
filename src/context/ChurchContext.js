import React, {useState, useEffect, createContext} from 'react'


export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [church, setChurch] = useState({})
  const [tab, setTab] = useState('general')

  return (
    <ChurchContext.Provider value={{church, tab, setChurch, setTab}}>
      {children}
    </ChurchContext.Provider>
  )

}
