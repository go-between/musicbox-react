import { Action, types, State } from './types'

export const initialState: State = {
  rooms: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case(types.GET_ROOMS_OK):
      return { ...state, rooms: [ ...action.rooms ] }
    default:
      return state
  }
}
