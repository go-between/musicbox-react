import { Moment } from 'moment'

import { Queue } from '../queue'
import { Song } from '../song'
import { User } from '../user'

const JOIN_ROOM = 'models/room/JOIN_ROOM'

type Types = {
  JOIN_ROOM: typeof JOIN_ROOM
}

export const types: Types = {
  JOIN_ROOM,
}

type JoinRoom = <OK, ERR>(
    roomId: Room['id'],
    returnOK: OK,
    returnERR: ERR,
  ) => {
  type: typeof JOIN_ROOM,
  roomId: Room['id'],
  returnOK: OK,
  returnERR: ERR,
}

export type JoinRoomOK<T> = (type: T, room: Room) => {
  type: T,
  room: Room,
}

export type JoinRoomERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

export type ActionCreators = {
  JoinRoom: JoinRoom
  JoinRoomOK: JoinRoomOK<any>
  JoinRoomERR: JoinRoomERR<any>
}

export type Room = {
  currentSong: Song
  currentSongStart: Moment
  id: string
  name: string
  queue: Queue[]
  users: User[]
}
