import { Action, types, State } from './types'

export const initialState: State = {
  id: '',
  name: '',
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.JOIN_ROOM_OK:
      return { ...state, id: action.room.id, name: action.room.name }
    default:
      return state
  }
}
