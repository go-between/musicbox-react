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
    case types.UPDATE_ORDER:
      const card = state.enqueuedSongs[action.dragIndex]
      const songs = state.enqueuedSongs
      songs.splice(action.dragIndex, 1)
      songs.splice(action.hoverIndex, 0, card)
      return { ...state, enqueuedSongs: [...songs] }
    default:
      return state
  }
}
