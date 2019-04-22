import { Action, types, State } from './types'

export const initialState: State = {
  enqueuedSongs: []
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.ENQUEUE_SONGS:
      return { ...state, enqueuedSongs: [ ...state.enqueuedSongs, ...action.songs ]}
    case types.GET_USER_QUEUE_OK:
      return { ...state, enqueuedSongs: [ ...action.queue ] }
    default:
      return state
  }
}
