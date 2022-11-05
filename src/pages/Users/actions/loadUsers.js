import { handleRequestErrors } from "global"
import { getUsers } from "services/User.service"
import { ActionType } from "../store"

export default async function loadUsers (dispatch, churchId) {
  try {
    const { data } = await getUsers(churchId, { with_my_filter: true })

    dispatch({
      type: ActionType.SET_USERS,
      payload: data
    })
  } catch (error) {
    handleRequestErrors(error)
  }
}
