import ActionStatus from './ActionStatus'

const initialState = {
  users: [],
  filter: {},
  actualFilter: {},
  status: ActionStatus.LOADING,
  showUsersFilter: false
}

export default initialState
