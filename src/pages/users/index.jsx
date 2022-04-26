import React, { useContext, useState } from 'react'
import ResourcesAccordion from '../../common/accordionTable'
import { ChurchContext } from '../../context/ChurchContext'
import { AuthContext } from '../../context/AuthContext'
import { CardBody, CardHeader } from './components/accordionItems'
import IconButton from '../../common/iconButton'
import GrantAccessModal from '../../common/modals/grantAccessModal'
import RevokeAccessModal from '../../common/modals/revokeAccessModal'
import DeleteUserModal from '../../common/modals/deleteUserModal'
import FilterSidebar from './components/filterSidebar'
import './styles.css'
import MinisteriesAssignModal from '../../common/modals/ministeriesAssignModal'
import { useHistory } from 'react-router-dom'
import { getMemberCard } from '../../services/Api.service'

export default function ChurchUsersPage () {
  const history = useHistory()
  const { users } = useContext(ChurchContext)
  const { user } = useContext(AuthContext)

  const [showGrantAccessModal, setShowGrantAccessModal] = useState(false)
  const [showRevokeAccessModal, setShowRevokeAccessModal] = useState(false)
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
  const [showMinisteriesAssignModal, setShowMinisteriesAssignModal] = useState(false)
  const [showFilterSidebar, setShowFilterSidebar] = useState(false)
  const [resource, setResource] = useState({})

  const getMenuConfigs = (resource) => {
    return [
      {
        icon: "fa-solid fa-user-pen",
        title: "Editar informações",
        hidden: !user.president_pastor && resource.president_pastor,
        hasIcon: true,
        onClick: () => {
          history.push({
            pathname: `/church/user`,
            state: resource
          })
        }
      },
      {
        icon: "fa-solid fa-id-card",
        title: "Gerar a carteirinha",
        hasIcon: true,
        onClick: () => {
          getMemberCard(resource.id)
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
    <main className='pageLayout'>
      <>
        <MinisteriesAssignModal
          user={resource}
          show={showMinisteriesAssignModal}
          onHide={() => setShowMinisteriesAssignModal(false)}
          />
        <DeleteUserModal
          user={resource}
          show={showDeleteUserModal}
          onHide={() => setShowDeleteUserModal(false)}
          />
        <GrantAccessModal
          user={resource}
          show={showGrantAccessModal}
          onHide={() => setShowGrantAccessModal(false)}
          />
        <RevokeAccessModal
          user={resource}
          show={showRevokeAccessModal}
          onHide={() => setShowRevokeAccessModal(false)}
          />
        <FilterSidebar show={showFilterSidebar} onHide={() => setShowFilterSidebar(false)}/>
        <section className='usersPageHeader'>
          <IconButton icon="fa-solid fa-filter" onClick={() => setShowFilterSidebar(true)} />
          <IconButton icon="fa-solid fa-user-plus" onClick={() => history.push("/church/user")} />
        </section>
        <ResourcesAccordion
          resources={users}
          resourceName="Membros"
          CardBody={CardBody}
          CardHeader={CardHeader}
          getMenuConfigs={getMenuConfigs}
          hasMenu
        />
      </>
    </main>
  )
}
