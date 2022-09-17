import { showToast } from "global"
import { getChurchResume } from "services/Api.service"
import { ActionType } from "../store"

const loadChurchResume = async (dispatch, church) => {
  try {
    const { data } = await getChurchResume(church.id)

    dispatch({
      type: ActionType.SET_INITIAL_STATE,
      payload: {
        birthdates: data.users_grouped_by_birthdate_month,
        proselytesAtSemester: data.proselytes_in_last_semester
      }
    })
  } catch (e) {
    showToast('negative', 'Ops, algo deu errado em nosso servidor.')
  }
}

export default loadChurchResume
