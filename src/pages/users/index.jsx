import React, { useContext, useState } from 'react'
import ResourcesAccordion from '../../common/AccordionTable'
import { ChurchContext } from '../../context/ChurchContext'
import { AuthContext } from '../../context/AuthContext'
import IconButton from '../../common/iconButton'
import GrantAccessModal from '../../common/modals/grantAccessModal'
import RevokeAccessModal from '../../common/modals/revokeAccessModal'
import DeleteUserModal from '../../common/modals/deleteUserModal'
import FilterSidebar from './components/filterSidebar'
import MinisteriesAssignModal from '../../common/modals/ministeriesAssignModal'
import { useHistory } from 'react-router-dom'
import { getMemberCard } from '../../services/Api.service'
import {
  AccessTitle,
  AccessWrapper,
  AccordionRow,
  Icon,
  ItemHeader,
  ItemTitle,
  NoAccessTitle,
  PageTitle,
  UsersPageHeader
} from './styles'
import getFormattedDate from '../../actions/getFormattedDate'
import getFormattedTimestamp from '../../actions/getFormattedTimestamp'
import MainMenu from '../../common/mainMenu'
import './styles.css'

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

  const CardHeader = ({resource}) => {
    return (
      <ItemHeader>
        <div>
          <ItemTitle>{resource.name}</ItemTitle>
          {resource.has_access && resource.is_leader && <Icon className="fa-solid fa-star"></Icon>}
        </div>
      </ItemHeader>
    )
  }

  const CardBody = ({resource}) => {
    const ministeriesTxt = resource.ministeries.map(m => m.name).join(', ')
    return (
    <>
      <AccordionRow displayGrid>
        <p><b>{resource.title}</b></p>
        <p>Gênero: <b>{resource.gender}</b></p>
        <p>Estado civil: <b>{resource.marital_status}</b></p>
        <p><b>{resource.is_baptized ? "Batizado(a)" : "Não batizado(a)"}</b></p>
      </AccordionRow>

      <AccordionRow displayGrid>
        <p>Email: <b>{resource.email}</b></p>
        <p>Telefone: <b>{resource.phone}</b></p>
        <p>Membro desde: <b>{getFormattedDate(resource.member_since)}</b></p>
        <p>Nascimento: <b>{getFormattedDate(resource.birthdate)} ({resource.age} anos)</b></p>
      </AccordionRow>

      {resource.ministeries.length !== 0 && (
        <AccordionRow>
          <p>Participa dos ministérios: <b>{ministeriesTxt}</b></p>
        </AccordionRow>
      )}

      <AccordionRow>
        <p>Endereço: <b>{resource.location}</b></p>
      </AccordionRow>


      {!!resource.notes && (
        <AccordionRow>
          <p>Observações: <b>{resource.notes}</b></p>
        </AccordionRow>
      )}

      <AccordionRow>
        {resource.has_access ?
          <AccessWrapper>
            <AccessTitle>Tem acesso ao sistema</AccessTitle>
            <div>
              <p>Acesso{resource.is_leader ? " de administrador": ""} garatido por {resource.access_garantied_by} em {getFormattedTimestamp(resource.access_garantied_at)}</p>
              {resource.last_time_logged_at && (<p>Ultimo acesso em {getFormattedTimestamp(resource.last_time_logged_at)}</p>) }
            </div>
          </AccessWrapper>
          :
          <NoAccessTitle>Não tem acesso ao sistema</NoAccessTitle>
        }
      </AccordionRow>
    </>
    )
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
        <UsersPageHeader>
          <span/>
          {/* <PageTitle>Membros da igreja</PageTitle> */}
          <div>
            <IconButton icon="fa-solid fa-filter" onClick={() => setShowFilterSidebar(true)} />
            <IconButton icon="fa-solid fa-user-plus" onClick={() => history.push("/church/user")} />
          </div>
        </UsersPageHeader>
        <ResourcesAccordion
          resources={users}
          resourceName="Membros"
          CardHeader={CardHeader}
          CardBody={CardBody}
          getMenuConfigs={getMenuConfigs}
          hasMenu
        />
      </>
    </main>
  )
}
