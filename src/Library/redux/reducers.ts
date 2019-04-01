import { Action, types, State } from './types'

export const initialState: State = {
  songs: [],
  userId: null,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case(types.GET_SONG_OK):
      return { ...state, songs: [ ...state.songs, action.song ] }
    default:
      return state
  }
}
