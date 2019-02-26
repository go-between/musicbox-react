import { GetUsersOK, User } from '../../models/user'
import { Song, Action } from '../../models/song'

const GET_USERS_OK = 'app/Room/GET_USERS_OK'
const GET_USERS_ERR = 'app/Room/GET_USERS_ERR'

type Types = {
  GET_USERS_OK: typeof GET_USERS_OK
  GET_USERS_ERR: typeof GET_USERS_ERR
}

export const types: Types = {
  GET_USERS_OK,
  GET_USERS_ERR,
}

export type Action =
  | ReturnType<GetUsersOK<Types['GET_USERS_OK']>>
  | Action

export type State = {
  users: User[]
  songs: Song[]
}
