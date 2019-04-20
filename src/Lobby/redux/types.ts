import { GetRoomsOK, Room } from '../../models/room'

const GET_ROOMS_OK = 'app/Lobby/GET_ROOMS_OK'
const GET_ROOMS_ERR = 'app/Lobby/GET_ROOMS_ERR'

type Types = {
  GET_ROOMS_OK: typeof GET_ROOMS_OK
  GET_ROOMS_ERR: typeof GET_ROOMS_ERR
}

export const types: Types = {
  GET_ROOMS_OK,
  GET_ROOMS_ERR,
}

export type Action =
  | ReturnType<GetRoomsOK<Types['GET_ROOMS_OK']>>

export type State = {
  rooms: Room[]
}
