import { Moment } from 'moment'
import { Room } from 'models/room'
import { Song } from 'models/song'
import { Action as RoomAction } from 'Room/redux/types'

const UPDATE_NOW_PLAYING = 'app/Room/Player/UPDATE_NOW_PLAYING'

type Types = {
  UPDATE_NOW_PLAYING: typeof UPDATE_NOW_PLAYING
}

export const types: Types = {
  UPDATE_NOW_PLAYING
}

type UpdateNowPlaying = (payload: {song: Song, startedAt: Moment}) => {
  type: typeof UPDATE_NOW_PLAYING
  song: Song
  startedAt: Moment
}

export type Action =
  | RoomAction
  | ReturnType<UpdateNowPlaying>

export type ActionCreators = {
  UpdateNowPlaying: UpdateNowPlaying
}

export type State = Pick<Room, 'currentSong' | 'currentSongStart'>
