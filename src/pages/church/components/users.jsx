import React, { useContext, useState } from 'react'
import ResourcesAccordion from '../../../components/accordionTable'
import { ChurchContext } from '../../../context/ChurchContext'
import { AuthContext } from '../../../context/AuthContext'
import { CardBody, CardHeader } from './accordionItems'
import IconButton from '../../../components/iconButton'
import GrantAccessModal from '../../../components/modals/grantAccessModal'
import RevokeAccessModal from '../../../components/modals/revokeAccessModal'
import DeleteUserModal from '../../../components/modals/deleteUserModal'
import FilterSidebar from './filterSidebar'
import MinisteriesAssignModal from '../../../components/modals/ministeriesAssignModal'

export default function ChurchUsersPage () {
  const { church, setResource, setTab } = useContext(ChurchContext)
  const { user } = useContext(AuthContext)
  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false)
  const [showRevokeAccessModal, setShowRevokeAccessModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showMinisteriesAssignModal, setShowMinisteriesAssignModal] = useState(false)
  const [showFilterSidebar, setShowFilterSidebar] = useState(false)

  const getMenuConfigs = (resource) => {
    return [
      {
        icon: "fa-solid fa-user-pen",
        title: "Editar informações",
        hidden: !user.president_pastor && resource.president_pastor,
        hasIcon: true,
        onClick: () => {
          setResource(resource)
          setTab('update_user')
        }
      },
      {
        icon: "fa-solid fa-id-card",
        title: "Gerar a carteirinha",
        hasIcon: true,
        onClick: () => {
          alert("Funcionalidade em desenvolvimento ainda, aguarde mais um pouco")
        }
      },
      {
        icon: "fa-solid fa-person-praying",
        title: "Ministérios",
        hasIcon: true,
        onClick: () => {
          setResource(resource)
          setShowMinisteriesAssignModal(true)
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

  return (
    <>
      <MinisteriesAssignModal show={showMinisteriesAssignModal} onHide={() => setShowMinisteriesAssignModal(false)}/>
      <DeleteUserModal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)}/>
      <GrantAccessModal show={showGrantAccessModal} onHide={() => setShowGrantAccessModal(false)}/>
      <RevokeAccessModal show={showRevokeAccessModal} onHide={() => setShowRevokeAccessModal(false)}/>
      <FilterSidebar show={showFilterSidebar} onHide={() => setShowFilterSidebar(false)}/>
      <section className='usersPageHeader'>
        <IconButton icon="fa-solid fa-filter" onClick={() => setShowFilterSidebar(true)} />
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
