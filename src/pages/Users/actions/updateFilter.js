import { showToast } from "global";
import { putFilter } from "services/User.service";
import { ActionType } from "../store";
import loadUsers from "./loadUsers";


export default function updateFilter (dispatch, filter, church) {
  putFilter(filter)
  .then(({ data }) => {
    dispatch({
      type: ActionType.SET_FILTER,
      payload: data
    })

    loadUsers(dispatch, church)
    showToast('positive', 'Filtro alterado com sucesso')
  })
  .catch(() => {
    showToast('negative', 'Não foi possível alterar seu filtro')
  })
}
