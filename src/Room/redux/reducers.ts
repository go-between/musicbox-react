import { Action, types, State } from './types'
import { types as songTypes } from '../../models/song'

export const initialState: State = {
  users: [],
  songs: []
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case(types.GET_USERS_OK):
      return { users: action.users }
    case(songTypes.RECEIVE_SONGS):
      return { users: state.users, songs: action.songs }
    default:
      return state
  }
}
