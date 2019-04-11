import { combineReducers } from 'redux'

import { reducer as playerReducer } from '../components/Player/redux'
import { reducer as roomSongReducer } from '../components/RoomSong/redux'
import { Action, types, State } from './types'

export const initialState: State['base'] = {
  id: null,
  name: null,
}

export function reducer(state: State['base'] = initialState, action: Action): State['base'] {
  switch (action.type) {
    case types.JOIN_ROOM_OK:
      return { ...state, id: action.room.id, name: action.room.name }
    default:
      return state
  }
}

export default combineReducers({
  base: reducer,
  player: playerReducer,
  roomSong: roomSongReducer,
})
