import ActionStatus from './ActionStatus'
import ActionType from './ActionType'

function reducer(state, action) {
  switch (action.type) {
    case ActionType.SET_USERS:
      return {
        ...state,
        users: action.payload
      }

    case ActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
        actualFilter: action.payload
      }

    case ActionType.COMPLETE_LOADING:
      return {
        ...state,
        status: ActionStatus.COMPLETED
      }

    case ActionType.ADD_TO_USERS:
      return {
        ...state,
        users: [...state.users, action.payload]
      }

    case ActionType.UPDATE_USER: {
      const actualIndex = state.users.findIndex(({ id }) => id === action.payload.id)

      return {
        ...state,
        users: [
          ...state.users.slice(0, actualIndex - 1),
          action.payload,
          ...state.users.slice(actualIndex + 1)
        ]
      }
    }

    case ActionType.CLOSE_USERS_FILTER:
      return {
        ...state,
        showUsersFilter: false,
        filter: state.actualFilter
      }

    case ActionType.OPEN_USERS_FILTER:
      return {
        ...state,
        showUsersFilter: true,
      }

    case ActionType.REMOVE_USER:
      return {
        ...state,
        users: [...state.users.filter(({ id }) => id !== action.payload)]
      }

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

export default reducer
