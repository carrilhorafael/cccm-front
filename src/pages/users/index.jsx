import React, { useEffect, useState } from 'react'
import ResourcesAccordion from '../../modules/AccordionTable'
import { useChurchContext } from '../../context/ChurchContext'
import { useAuthContext } from '../../context/AuthContext'
import IconButton from '../../atomics/IconButton'
import GrantAccessModal from '../../modules/GrantAccessModal'
import RevokeAccessModal from '../../modules/RevokeAccessModal'
import DeleteUserModal from '../../modules/DeleteUserModal'
import FilterSidebar from './components/filterSidebar'
import MinisteriesAssignModal from '../../modules/MinisteriesAssignModal'
import { useHistory } from 'react-router-dom'
import { getChurchUsers, getMemberCard } from '../../services/Api.service'
import {
  AccessTitle,
  AccessWrapper,
  AccordionRow,
  GeneralLayout,
  Icon,
  Item,
  ItemHeader,
  ItemTitle,
  LoadingWrapper,
  NoAccessTitle,
  UsersPageHeader
} from './styles'
import getFormattedDate from '../../actions/getFormattedDate'
import getFormattedTimestamp from '../../actions/getFormattedTimestamp'
import Loading from '../../atomics/Loading'
import { showModal, showToast } from 'global'

export default function ChurchUsersPage () {
  const history = useHistory()
  const { church } = useChurchContext()
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const { user } = useAuthContext()

  useEffect(() => {
    if (!church) return
    getChurchUsers(church.id, { with_my_filter: true })
      .then(({ data }) => setUsers(data))
      .catch(() => showToast('negative', 'Ops, algo deu errado em nosso servidor.'))
      .finally(() => setLoading(false))
  }, [church])


  const [showFilterSidebar, setShowFilterSidebar] = useState(false)

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
        onClick: () => getMemberCard(resource.id)
      },
      {
        icon: "fa-solid fa-person-praying",
        title: "Ministérios",
        hasIcon: true,
        onClick: () => showModal(MinisteriesAssignModal, { user: resource })
      },
      {
        icon: resource.has_access ? "fa-solid fa-lock" : "fa-solid fa-unlock",
        title: resource.has_access ? "Revogar acesso" : "Conceder acesso",
        hasIcon: true,
        isDanger: resource.has_access,
        hidden: resource.president_pastor,
        onClick: () => {
          if (resource.has_access) {
            showModal(RevokeAccessModal, { user: resource })
          } else {
            showModal(GrantAccessModal, { user: resource })
          }
        }
      },
      {
        icon: "fa-solid fa-trash" ,
        title: "Apagar membro",
        hasIcon: true,
        isDanger: true,
        hidden: resource.president_pastor,
        onClick: () => showModal(DeleteUserModal, { user: resource })
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
  const getBodyHeight = (resource) => {
    let height = 216

    if (resource.ministeries.length !== 0) {
      height = height + 52
    }

    if (!!resource.notes) {
      height = height + 52
    }

    if (resource.has_access) {
      height = height + 12
    }

    return height
  }

  return (
    <GeneralLayout>
      <Item>
        <FilterSidebar show={showFilterSidebar} onHide={() => setShowFilterSidebar(false)}/>
        <UsersPageHeader>
          <span/>
          <div>
            <IconButton theme='primary' icon="fa-solid fa-filter" onClick={() => setShowFilterSidebar(true)} />
            <IconButton theme='primary' icon="fa-solid fa-user-plus" onClick={() => history.push("/church/user")} />
          </div>
        </UsersPageHeader>
        {isLoading ?
          <LoadingWrapper>
            <Loading size='md' theme='primary'/>
          </LoadingWrapper>
          :
          <ResourcesAccordion
            resources={users}
            resourceName="Membros"
            CardHeader={CardHeader}
            CardBody={CardBody}
            getMenuConfigs={getMenuConfigs}
            getBodyHeight={getBodyHeight}
            hasMenu
          />
        }
      </Item>
    </GeneralLayout>
  )
}
