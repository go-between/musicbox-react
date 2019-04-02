import { Action, types, State } from './types'

export const initialState: State = {
  email: '',
  error: '',
  password: '',
  token: '',
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.CHANGE_FIELD:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}
