import { ActionCreators, types } from './types'

const getUsers: ActionCreators['GetUsers'] = (returnOK, returnERR) => ({
  type: types.GET_USERS,
  returnOK,
  returnERR,
})

const getUserOK: ActionCreators['GetUserOK'] = (returnOK, user) => ({
  type: returnOK,
  user,
})

const getUsersERR: ActionCreators['GetUsersERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  getUsers,
  getUserOK,
  getUsersERR
}
