import { Action, types, State } from './types'

export const initialState: State = {
  roomId: null,
  users: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.GET_USER_OK:
      return { ...state, users: [...state.users, action.user] }
    default:
      return state
  }
}
