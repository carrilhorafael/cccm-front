import React, { useContext, useState } from 'react'
import ResourcesAccordion from '../../../components/accordionTable'
import { ChurchContext } from '../../../context/ChurchContext'
import { CardBody, CardHeader } from './accordionItems'
import IconButton from '../../../components/iconButton'
import GrantAccessModal from '../../../components/modals/grantAccessModal'
import RevokeAccessModal from '../../../components/modals/revokeAccessModal'
import { deleteUser, grantUserAccess, revokeUserAccess } from '../../../services/Api.service'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DeleteUserModal from '../../../components/modals/deleteUserModal'

export default function ChurchUsersPage () {
  const history = useHistory()
  const { church, setChurch, setTab } = useContext(ChurchContext)
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false)
  const [showRevokeAccessModal, setShowRevokeAccessModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [resource, setResource] = useState({})

  const getMenuConfigs = (resource) => {
    return [
      {
        icon: "fa-solid fa-user-pen",
        title: "Editar informações",
        hasIcon: true,
        onClick: () => {
          console.log("Editar informações de " + resource.name)
        }
      },
      {
        icon: resource.has_access ? "fa-solid fa-lock" : "fa-solid fa-unlock",
        title: resource.has_access ? "Revogar acesso" : "Conceder acesso",
        hasIcon: true,
        isDanger: resource.has_access,
        hidden: resource.president_pastor,
        onClick: () => {
          setResource(resource)
          if (resource.has_access) {
            setShowRevokeAccessModal(true)
          } else {
            setShowGrantAccessModal(true)
          }
        }
      },
      {
        icon: "fa-solid fa-trash" ,
        title: "Apagar membro",
        hasIcon: true,
        isDanger: true,
        hidden: resource.president_pastor,
        onClick: () => {
          setResource(resource)
          setShowDeleteUserModal(true)
        }
      }
    ]
  }

  const handleUpdateResource = (resource) => {
    let newUsers = church.users
    const resourceIndex = newUsers.findIndex(user => user.id === resource.id)

    newUsers = [
      ...newUsers.slice(0, resourceIndex),
      resource,
      ...newUsers.slice(resourceIndex + 1)
    ]
    setChurch(prevState => ({...prevState, users: newUsers}))
  }

  const handleDestroyResource = () => {
    let newUsers = church.users.filter(user => user.id !== resource.id)
    setChurch(prevState => ({...prevState, users: newUsers}))
  }

  const grantAccess = (accessParams) => {
    grantUserAccess(resource.id, accessParams)
      .then(({data}) => {
        handleUpdateResource(data)
        setResource({})
        setShowGrantAccessModal(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const revokeAccess = () => {
    revokeUserAccess(resource.id)
      .then(({data}) => {
        handleUpdateResource(data)
        setResource({})
        setShowRevokeAccessModal(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteMember = () => {
    deleteUser(resource.id)
      .then(() => {
        handleDestroyResource()
        setShowDeleteUserModal(false)
      })
  }

  return (
    <>
      <DeleteUserModal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)} onConfirm={deleteMember}/>
      <GrantAccessModal resource={resource} show={showGrantAccessModal} onHide={() => setShowGrantAccessModal(false)} onConfirm={grantAccess}/>
      <RevokeAccessModal show={showRevokeAccessModal} onHide={() => setShowRevokeAccessModal(false)} onConfirm={revokeAccess}/>
      <section className='usersPageHeader'>
        <IconButton icon="fa-solid fa-filter" onClick={() => console.log("teste")} />
        <IconButton icon="fa-solid fa-user-plus" onClick={() => setTab("create_user")} />
      </section>
      <ResourcesAccordion
        resources={church.users}
        resource_name="Membros"
        CardBody={CardBody}
        CardHeader={CardHeader}
        getMenuConfigs={getMenuConfigs}
        hasMenu
      />
    </>
  )
}
