import ActionType from '../store/ActionType'

const showModal = (Component, props) => {
  window.dispatch({
    type: ActionType.SHOW_MODAL_OVERLAY,
    payload: () => (
      <Component {...props}/>
    )
  })
}

export default showModal
