import { types as roomTypes } from 'Room/redux/types'
import { Action, State, types } from './types'

export const initialState: State = {
  queue: []
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case roomTypes.JOIN_ROOM_OK:
      return { ...state, queue: action.room.queue }
    case types.UPDATE_QUEUE:
      return { ...state, queue: action.queue }
    default:
      return state
  }
}
