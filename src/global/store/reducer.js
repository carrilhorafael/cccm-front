import ActionType from './ActionType'

function reducer(state, action) {
  switch (action.type) {
    case ActionType.SHOW_MODAL_OVERLAY:
      return {
        ...state,
        modal: {
          Component: action.payload,
          visible: true
        }
      }

    case ActionType.CLOSE_MODAL_OVERLAY:
      return {
        ...state,
        modal: {
          Component: null,
          visible: false
        }
      }

    case ActionType.SHOW_TOAST:
      return {
        ...state,
        toast: {
          visible: true,
          theme: action.payload.theme,
          message: action.payload.message
        }
      }
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toast: {
          visible: false,
          theme: null,
          message: null
        }
      }

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export default reducer
