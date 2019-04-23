import { Moment } from 'moment'

import { Queue } from '../queue'
import { Song } from '../song'
import { User } from '../user'

const GET_ROOMS = 'models/room/GET_ROOMS'
const JOIN_ROOM = 'models/room/JOIN_ROOM'

type Types = {
  GET_ROOMS: typeof GET_ROOMS
  JOIN_ROOM: typeof JOIN_ROOM
}

export const types: Types = {
  GET_ROOMS,
  JOIN_ROOM,
}

type GetRooms = <OK, ERR>(returnOK: OK, returnERR: ERR) => {
  type: typeof GET_ROOMS
  returnOK: OK
  returnERR: ERR
}

export type GetRoomsOK<T> = (type: T, rooms: Room[]) => {
  type: T
  rooms: Room[]
}

export type GetRoomsERR<T> = (type: T, error: Error) => {
  type: T
  error: Error
}

type JoinRoom = <OK, ERR>(
  roomId: string,
  returnOK: OK,
  returnERR: ERR,
) => {
  type: typeof JOIN_ROOM,
  roomId: string,
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
  GetRooms: GetRooms
  GetRoomsOK: GetRoomsOK<any>
  GetRoomsERR: GetRoomsERR<any>
  JoinRoom: JoinRoom
  JoinRoomOK: JoinRoomOK<any>
  JoinRoomERR: JoinRoomERR<any>
}

export type Room = {
  currentSong: Song | null
  currentSongStart: Moment | null
  id: string | null
  name: string | null
  queue: Queue[]
  users: User[]
}
