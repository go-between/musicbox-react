import { Action, types, State } from './types'

export const initialState: State = {
  users: []
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case(types.GET_USERS_OK):
      return { users: action.users }
    default:
      return state
  }
}
