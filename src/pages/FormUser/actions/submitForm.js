import { handleRequestErrors, showToast } from 'global'
import { postUser, putUser } from 'services/User.service'
import { ActionType } from '../store'

const submitForm = async (dispatch, user, history, church) => {
  dispatch({
    type: ActionType.SET_LOADING
  })

  try {
    user.id !== null ? await putUser(user.id, user) : await postUser(church.id, user)
    showToast('positive', `Usuário criado com sucesso`)
    history.push(`/church/users`)
  } catch(error) {
    handleRequestErrors(error)
    .then((errors) => {
      showToast('negative', 'Não foi possível criar esse usuário, verifique as informações concedidas')

      dispatch({
        type: ActionType.SET_ERRORS,
        payload: errors
      })
    })
  }
}

export default submitForm
