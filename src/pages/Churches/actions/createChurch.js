
import { closeModal, showToast } from 'global'
import { postChurch } from 'services/Api.service'
import { ActionType } from '../store'

const createChurch = async (dispatch, churchParams) => {
  try {
    const { data } = await postChurch(churchParams)

    dispatch({
      type: ActionType.ADD_TO_CHURCHES,
      payload: data
    })

    showToast('positive', `Igreja ${data.name} criada com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default createChurch
