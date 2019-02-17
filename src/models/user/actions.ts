import { ActionCreators, types } from './types'

const getUsers: ActionCreators['GetUsers'] = (returnOK, returnERR) => ({
  type: types.GET_USERS,
  returnOK,
  returnERR,
})

const getUsersOK: ActionCreators['GetUsersOK'] = (returnOK, users) => ({
  type: returnOK,
  users,
})

const getUsersERR: ActionCreators['GetUsersERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  getUsers,
  getUsersOK,
  getUsersERR
}
