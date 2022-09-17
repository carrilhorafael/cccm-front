
import { closeModal, showToast } from 'global'
import { destroyChurch } from 'services/Api.service'
import { ActionType } from '../store'

const deleteChurch = async (dispatch, church) => {
  try {
    await destroyChurch(church.id)

    dispatch({
      type: ActionType.REMOVE_CHURCH,
      payload: church.id
    })

    showToast('positive', `Igreja excluida com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default deleteChurch
