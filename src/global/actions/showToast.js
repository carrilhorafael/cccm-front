import ActionType from '../store/ActionType'

const showToast = (theme, message) => {
  window.dispatch({
    type: ActionType.SHOW_TOAST,
    payload: {
      theme: theme,
      message: message
    }
  })

  setTimeout(() => {
    window.dispatch({ type: ActionType.REMOVE_TOAST })
  }, 5000);
}
export default showToast
