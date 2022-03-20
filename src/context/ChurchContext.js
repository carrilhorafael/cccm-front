import React, {useState, createContext} from 'react'


export const ChurchContext = createContext()

export function ChurchProvider ({children}) {
  const [church, setChurch] = useState({})
  const [resource, setResource] = useState({})
  const [tab, setTab] = useState('general')

  const getMinisteriesItems = () => {
    let ministeries = []
    church.ministeries.forEach((ministery) => {
      if (!ministeries.includes(ministery)) {
          ministeries.push(ministery);
      }
    })
    return ministeries.map(ministery => ({ label: ministery.name, value: ministery.id }))
  }

  const getChurchTitles = () => {
    let filterTitles = []

    church.users.forEach((user) => {
      if (!filterTitles.includes(user.title)) {
          filterTitles.push(user.title);
      }
    });

    return filterTitles.map(title => ({ label: title, value: title }))
  }

  const handleUpdateResource = (newResource, resourceType) => {
    if (resourceType === 'ministery'){
      let newMinisteries = church.ministeries
      const resourceIndex = newMinisteries.findIndex(user => user.id === newResource.id)

      newMinisteries = [
        ...newMinisteries.slice(0, resourceIndex),
        newResource,
        ...newMinisteries.slice(resourceIndex + 1)
      ]
      setChurch(prevState => ({...prevState, ministeries: newMinisteries}))

    } else if (resourceType === 'user') {
      let newUsers = church.users
      const resourceIndex = newUsers.findIndex(user => user.id === newResource.id)

      newUsers = [
        ...newUsers.slice(0, resourceIndex),
        newResource,
        ...newUsers.slice(resourceIndex + 1)
      ]
      setChurch(prevState => ({...prevState, users: newUsers}))

    }
  }
  const handleDestroyResource = (resourceType) => {
    if (resourceType === 'ministery'){
      let newMinisteries = church.ministeries.filter(ministery => ministery.id !== resource.id)
      setChurch(prevState => ({...prevState, ministeries: newMinisteries}))
    } else if(resourceType === 'user') {
      let newUsers = church.users.filter(user => user.id !== resource.id)
      setChurch(prevState => ({...prevState, users: newUsers}))
    }
  }
  const handleCreateResource = (newResource, resourceType) => {
    if (resourceType === 'ministery'){
      let newMinisteries = church.ministeries
      let position = newMinisteries.findIndex(ministery => !ministery.is_leader)

      newMinisteries = [
        ...newMinisteries.slice(0, position),
        newResource,
        ...newMinisteries.slice(position)
      ]
      setChurch(prevState => ({ ...prevState, ministeries: newMinisteries }))
    } else if (resourceType === 'user'){
      let newUsers = church.users
      let position = newUsers.findIndex(user => !user.is_leader)

      newUsers = [
        ...newUsers.slice(0, position),
        newResource,
        ...newUsers.slice(position)
      ]
      setChurch(prevState => ({ ...prevState, users: newUsers }))
    }
  }

  return (
    <ChurchContext.Provider value={{
      church,
      tab,
      resource,
      setChurch,
      setTab,
      setResource,
      handleCreateResource,
      handleUpdateResource,
      handleDestroyResource,
      getChurchTitles,
      getMinisteriesItems
    }}>

      {children}
    </ChurchContext.Provider>
  )

}
