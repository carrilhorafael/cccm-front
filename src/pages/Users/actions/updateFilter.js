import { showToast } from "global";
import { putFilter } from "services/User.service";
import { ActionType } from "../store";


export default function updateFilter (dispatch, filter, church) {
  putFilter(filter)
  .then(({ data }) => {
    dispatch({
      type: ActionType.SET_FILTER,
      payload: data
    })

    dispatch({
      type: ActionType.LOAD_USERS
    })

    showToast('positive', 'Filtro alterado com sucesso')
  })
  .catch(() => {
    showToast('negative', 'Não foi possível alterar seu filtro')
  })
}
