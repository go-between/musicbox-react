import { Action, types, State } from './types'

export const initialState: State = {
  users: [],
  songs: []
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case(types.GET_USERS_OK):
      return { users: action.users, songs: state.songs }
    case(types.RECEIVE_SONGS):
      return { users: state.users, songs: action.songs }
    default:
      return state
  }
}
