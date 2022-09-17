
import { closeModal, showToast } from 'global'
import { putChurch } from 'services/Api.service'
import { ActionType } from '../store'

const updateChurch = async (dispatch, church, churchParams) => {
  try {
    const { data } = await putChurch(church.id, churchParams)

    dispatch({
      type: ActionType.UPDATE_CHURCH,
      payload: data
    })

    showToast('positive', `Igreja ${data.name} editada com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default updateChurch
