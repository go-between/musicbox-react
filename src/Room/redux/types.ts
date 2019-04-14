import { State as PlayerState } from '../components/Player/redux'
import { State as RoomSongState } from '../components/RoomSong/redux'
import { State as UsersState } from '../components/Users/redux'

import { JoinRoomOK, Room } from 'models/room'

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

export type State = {
  base: Pick<Room, 'id' | 'name'>
  player: PlayerState
  roomSong: RoomSongState
  users: UsersState
}
