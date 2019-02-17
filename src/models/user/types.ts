const GET_USERS = 'models/user/GET_USERS'

type Types = {
  GET_USERS: typeof GET_USERS
}

export const types: Types = {
  GET_USERS
}

type GetUsers = (returnOK, returnERR) => {
  type: typeof GET_USERS,
  returnOK,
  returnERR,
}

export type GetUsersOK<T> = (type: T, users: User[]) => {
  type: T,
  users: User[],
}

export type GetUsersERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

export type ActionCreators = {
  GetUsers: GetUsers
  GetUsersOK: GetUsersOK<any>
  GetUsersERR: GetUsersERR<any>
}

export type User = {
  name: string
  email: string
}
