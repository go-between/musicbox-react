import { GetUsersOK, User } from '../../models/user'
import { Song } from '../../models/song'

const GET_USERS_OK = 'app/Room/GET_USERS_OK'
const GET_USERS_ERR = 'app/Room/GET_USERS_ERR'
const RECEIVE_SONGS = 'app/Room/RECEIVE_SONGS'

type Types = {
  GET_USERS_OK: typeof GET_USERS_OK
  GET_USERS_ERR: typeof GET_USERS_ERR
  RECEIVE_SONGS: typeof RECEIVE_SONGS
}

export const types: Types = {
  GET_USERS_OK,
  GET_USERS_ERR,
  RECEIVE_SONGS,
}

type ReceiveSongs = (songs: Song[]) => {
  type: typeof RECEIVE_SONGS
  songs: Song[]
}

export type Action =
  | ReturnType<GetUsersOK<Types['GET_USERS_OK']>>
  | ReturnType<ReceiveSongs>

export type ActionCreators = {
  ReceiveSongs: ReceiveSongs
}

export type State = {
  users: User[]
  songs: Song[]
}
