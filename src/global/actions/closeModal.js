import ActionType from '../store/ActionType'

const closeModal = () => {
  window.dispatch({ type: ActionType.CLOSE_MODAL_OVERLAY })
}

export default closeModal
