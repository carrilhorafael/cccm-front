import { showToast } from "global"
import { getUsers } from "services/User.service"
import { ActionType } from "../store"

export default async function loadUsers (dispatch, church) {
  try {
    const { data } = await getUsers(church.id, { with_my_filter: true })

    dispatch({
      type: ActionType.SET_USERS,
      payload: data
    })
  } catch ({ response }) {
    showToast('negative', 'Ops, algo deu errado em nosso servidor.')
  }
}
