
import { closeModal, showToast } from 'global'
import { destroyUser } from 'services/User.service'
import { ActionType } from '../store'

const deleteUser = async (dispatch, user) => {
  try {
    await destroyUser(user.id)

    dispatch({
      type: ActionType.REMOVE_USER,
      payload: user.id
    })

    showToast('positive', `Usuário excluido com sucesso`)
    closeModal()
  } catch({ response }) {
    showToast(response.data)
  }
}

export default deleteUser
