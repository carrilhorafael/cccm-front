
import { closeModal, handleRequestErrors, showToast } from 'global'
import { putUser } from 'services/User.service'
import { ActionType } from '../store'

const updateUser = async (dispatch, user, userParams) => {
  try {
    const { data } = await putUser(user.id, userParams)

    dispatch({
      type: ActionType.UPDATE_USER,
      payload: data
    })

    showToast('positive', `Usuário editado com sucesso`)
    closeModal()
  } catch(error) {
    handleRequestErrors(error)
  }
}

export default updateUser
