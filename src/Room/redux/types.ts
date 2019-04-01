import { GetUserOK, User } from '../../models/user'

const GET_USER_OK = 'app/Room/GET_USER_OK'
const GET_USERS_ERR = 'app/Room/GET_USERS_ERR'

type Types = {
  GET_USER_OK: typeof GET_USER_OK
  GET_USERS_ERR: typeof GET_USERS_ERR
}

export const types: Types = {
  GET_USER_OK,
  GET_USERS_ERR,
}

export type Action =
  | ReturnType<GetUserOK<Types['GET_USER_OK']>>

export type State = {
  roomId: string | null
  users: User[]
}
