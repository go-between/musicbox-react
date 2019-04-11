import { Room } from 'models/room'
import { Action as RoomAction } from 'Room/redux/types'

const UPDATE_NOW_PLAYING = 'app/Room/Player/UPDATE_NOW_PLAYING'

type Types = {
  UPDATE_NOW_PLAYING: typeof UPDATE_NOW_PLAYING
}

export const types: Types = {
  UPDATE_NOW_PLAYING
}

type UpdateNowPlaying = (payload: State) => {
  type: typeof UPDATE_NOW_PLAYING
  currentSong: State['currentSong']
  currentSongStart: State['currentSongStart']
}

export type Action =
  | RoomAction
  | ReturnType<UpdateNowPlaying>

export type ActionCreators = {
  UpdateNowPlaying: UpdateNowPlaying
}

export type State = Pick<Room, 'currentSong' | 'currentSongStart'>
