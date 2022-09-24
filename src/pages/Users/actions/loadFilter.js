import { getFilter } from "services/User.service"
import { ActionType } from "../store"

export default async function loadFilter (dispatch) {
  const { data } = await getFilter()

  dispatch({
    type: ActionType.SET_FILTER,
    payload: data
  })
}
