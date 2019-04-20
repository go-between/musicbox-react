import { ActionCreators, types } from './types'

const updateUsers: ActionCreators['UpdateUsers'] = ({ users }) => ({
  type: types.UPDATE_USERS,
  users,
})

export default {
  updateUsers
}
