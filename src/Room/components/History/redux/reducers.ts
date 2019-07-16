import { Action, types, State } from './types'

export const initialState: State = {
  historicalSongs: []
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.GET_HISTORY_OK:
      return { ...state, historicalSongs: [ ...action.historicalSongs ] }
    default:
      return state
  }
}
