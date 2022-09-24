import { useAuthContext } from "context/AuthContext";
import { showModal } from "global";
import ResourcesAccordion from "modules/AccordionTable";
import { DeleteUserModal, GrantAccessModal, RevokeAccessModal, MinisteriesAssignModal } from "../modals";
import { useHistory } from "react-router-dom";
import { deleteUser, updateUser } from "../actions";
import { getMemberCard } from "services/User.service";
import LineBody from "./components/LineBody";
import LineHeader from "./components/LineHeader";

export default function UsersAccordion ({ dispatch, users }) {
  const { user } = useAuthContext()
  const history = useHistory()

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
        onClick: () => {
          showModal(MinisteriesAssignModal, {
            user: resource,
            onConfirm: () => {}
          })
        }
      },
      {
        icon: resource.has_access ? "fa-solid fa-lock" : "fa-solid fa-unlock",
        title: resource.has_access ? "Revogar acesso" : "Conceder acesso",
        hasIcon: true,
        isDanger: resource.has_access,
        hidden: resource.president_pastor,
        onClick: () => {
          showModal(
            resource.has_access ? RevokeAccessModal : GrantAccessModal,
            {
              user: resource,
              onConfirm:  (userParams) => updateUser(dispatch, resource, userParams)
            }
          )
        }
      },
      {
        icon: "fa-solid fa-trash" ,
        title: "Apagar membro",
        hasIcon: true,
        isDanger: true,
        hidden: resource.president_pastor,
        onClick: () => {
          showModal(
            DeleteUserModal,
            {
              user: resource,
              onConfirm:  () => deleteUser(dispatch, resource)
            }
          )
        }
      }
    ]
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
    <ResourcesAccordion
      resources={users}
      resourceName="Membros"
      CardHeader={LineHeader}
      CardBody={LineBody}
      getMenuConfigs={getMenuConfigs}
      getBodyHeight={getBodyHeight}
      hasMenu
    />
  )

}
