import { JoinRoomOK, Room } from '../../models/room'

const JOIN_ROOM_OK = 'app/Room/JOIN_ROOM_OK'
const JOIN_ROOMS_ERR = 'app/Room/JOIN_ROOMS_ERR'

type Types = {
  JOIN_ROOM_OK: typeof JOIN_ROOM_OK
  JOIN_ROOMS_ERR: typeof JOIN_ROOMS_ERR
}

export const types: Types = {
  JOIN_ROOM_OK,
  JOIN_ROOMS_ERR,
}

export type Action =
  | ReturnType<JoinRoomOK<Types['JOIN_ROOM_OK']>>

export type State = Pick<Room, 'id' | 'name'>
