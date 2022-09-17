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

    case ActionType.ADD_TO_CHURCHES:
      return {
        ...state,
        churches: [...state.churches, action.payload]
      }

    case ActionType.UPDATE_CHURCH: {
      const actualIndex = state.churches.findIndex(({ id }) => id === action.payload.id)

      return {
        ...state,
        churches: [
          ...state.churches.slice(0, actualIndex - 1),
          action.payload.data,
          ...state.churches.slice(actualIndex + 1)
        ]
      }
    }

    case ActionType.REMOVE_CHURCH:
      return {
        ...state,
        churches: [...state.churches.filter(({ id }) => id !== action.payload)]
      }



    case ActionType.SET_FETCHING:
      return {
        ...state,
        status: ActionStatus.FETCHING
      }

    case ActionType.UPDATE_COMPLETE:
      return {
        ...state,
        status: ActionStatus.COMPLETED
      }

    case ActionType.CREATE:
      return {
        ...state
      }

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export default reducer
