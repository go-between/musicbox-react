import { Action, types, State } from './types'

export const initialState: State = {
  connected: false,
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.CONNECT:
      return { ...state, connected: false }
    case types.CONNECT_OK:
      return { ...state, connected: true }
    default:
      return state
  }
}
