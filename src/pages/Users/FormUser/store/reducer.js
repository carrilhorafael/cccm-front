import ActionStatus from './ActionStatus'
import ActionType from './ActionType'

function reducer(state, action) {
  switch (action.type) {
    case ActionType.SET_ERRORS:
      return {
        ...state,
        status: ActionStatus.FAILED,
        errors: action.payload
      }

    case ActionType.SET_LOADING:
      return {
        ...state,
        status: ActionStatus.LOADING
      }

    case ActionType.UPDATE_USER:{
      state.user[action.payload.key] = action.payload.value
      return {
        ...state,
        user: state.user
      }
    }

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export default reducer
