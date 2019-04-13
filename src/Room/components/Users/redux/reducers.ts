import { types as roomTypes } from 'Room/redux/types'
import { Action, State, types } from './types'

export const initialState: State = {
  users: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case roomTypes.JOIN_ROOM_OK:
      return { ...state, users: [...action.room.users] }
    case types.UPDATE_USERS:
      return { ...state, users: [...action.users] }
    default:
      return state
  }
}
