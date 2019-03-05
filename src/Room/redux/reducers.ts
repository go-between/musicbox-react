import { Action, types, State } from './types'

export const initialState: State = {
  users: [],
  songs: [],
  query: '',
  results: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case(types.GET_USERS_OK):
      return { ...state, users: action.users}
    case(types.RECEIVE_SONGS):
      return { ...state, songs: action.songs }
    case(types.CHANGE_QUERY):
      return { ...state, query: action.query}
    case(types.GET_RESULTS_OK):
      return {...state, results: action.results}
    default:
      return state
  }
}
