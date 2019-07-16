import { combineReducers } from 'redux'

import { reducer as playerReducer } from '../components/Player/redux'
import { reducer as roomSongReducer } from '../components/RoomSong/redux'
import { reducer as usersReducer } from '../components/Users/redux'
import { reducer as userSongReducer } from '../components/UserSong/redux'
import { reducer as historyReducer } from '../components/History/redux'
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
  users: usersReducer,
  userSong: userSongReducer,
  history: historyReducer,
})
