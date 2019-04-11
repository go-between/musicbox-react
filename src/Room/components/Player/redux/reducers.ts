import { types as roomTypes } from 'Room/redux/types'
import { Action, State, types } from './types'

export const initialState: State = {
  currentSong: null,
  currentSongStart: null,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case roomTypes.JOIN_ROOM_OK:
      return { ...state, currentSong: action.room.currentSong, currentSongStart: action.room.currentSongStart }
    case types.UPDATE_NOW_PLAYING:
      return {...state, currentSong: action.song, currentSongStart: action.startedAt}
    default:
      return state
  }
}
