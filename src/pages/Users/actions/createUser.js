
import { closeModal, showToast } from 'global'
import { postUser } from 'services/User.service'
import { ActionType } from '../store'

const createUser = async (dispatch, userParams) => {
  try {
    const { data } = await postUser(userParams)

    dispatch({
      type: ActionType.ADD_TO_USERS,
      payload: data
    })

    showToast('positive', `Usuário criado com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default createUser
