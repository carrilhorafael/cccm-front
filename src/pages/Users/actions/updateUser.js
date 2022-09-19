
import { closeModal, showToast } from 'global'
import { putUser } from '../services/User.service'
import { ActionType } from '../store'

const updateUser = async (dispatch, user, userParams) => {
  try {
    const { data } = await putUser(user.id, userParams)

    dispatch({
      type: ActionType.UPDATE_USER,
      payload: data
    })

    showToast('positive', `Igreja ${data.name} editada com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default updateUser
