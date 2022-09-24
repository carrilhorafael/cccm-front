import { showToast } from "global"
import { getFilter, getUsers } from "services/User.service"
import { ActionType } from "../store"

async function resolveUsers (churchId) {
  const { data } = await getUsers(churchId, { with_my_filter: true })

  return data
}

async function resolveFilter () {
  const { data } = await getFilter()

  return data
}

export default async function setInitialState (dispatch, churchId) {
  try {
    const [users, filter] = await Promise.all([resolveUsers(churchId), resolveFilter()])

    dispatch({
      type: ActionType.SET_USERS,
      payload: users
    })

    dispatch({
      type: ActionType.SET_FILTER,
      payload: filter
    })

    dispatch({
      type: ActionType.COMPLETE_LOADING
    })

  } catch (e) {
    showToast('negative', 'Ops, algo deu errado em nosso servidor.')
  }
}
