import { showModal } from "global"
import { getMemberCard } from "services/User.service"
import { deleteUser, updateUser } from "../actions"
import { DeleteUserModal, GrantAccessModal, MinisteriesAssignModal, RevokeAccessModal } from "../components"

export const getMenuConfigs = (dispatch, user, history) => (resource) => {
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
          onConfirm: (ministeriesParams) => updateUser(dispatch, resource, ministeriesParams)
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
