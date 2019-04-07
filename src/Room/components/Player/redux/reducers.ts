import { types as roomTypes } from 'Room/redux/types'
import { Action, State } from './types'

export const initialState: State = {
  currentSong: null,
  currentSongStart: null,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case roomTypes.JOIN_ROOM_OK:
      return { ...state, currentSong: action.room.currentSong, currentSongStart: action.room.currentSongStart }
    default:
      return state
  }
}
