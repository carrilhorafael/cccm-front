import ActionStatus from './ActionStatus'
import ActionType from './ActionType'

function reducer(state, action) {
  switch (action.type) {
    case ActionType.SET_INITIAL_STATE:
      return {
        ...state,
        status: ActionStatus.COMPLETED,
        ...action.payload
      }

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export default reducer
