import { showToast } from "global"
import { getChurches } from "services/Api.service"
import { ActionType } from "../store"

const loadChurches = async (dispatch) => {
  try {
    const { data } = await getChurches()

    dispatch({
      type: ActionType.SET_INITIAL_STATE,
      payload: data
    })
  } catch ({ response }) {

    showToast(response.data)
  }
}
export default loadChurches
