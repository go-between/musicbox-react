import { types as roomTypes } from 'Room/redux/types'
import { Action, State } from './types'

export const initialState: State = {
  users: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case roomTypes.JOIN_ROOM_OK:
      return { ...state, users: action.room.users }
    default:
      return state
  }
}
