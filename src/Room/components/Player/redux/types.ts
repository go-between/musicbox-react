import { Room } from 'models/room'
import { Action as RoomAction } from 'Room/redux/types'

type Types = {
}

export const types: Types = {
}

export type Action =
  | RoomAction

export type State = Pick<Room, 'currentSong' | 'currentSongStart'>
