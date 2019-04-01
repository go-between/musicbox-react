import { Action, types, State } from './types'

export const initialState: State = {
  query: '',
  results: [],
}

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case(types.CHANGE_QUERY):
      return { ...state, query: action.query}
    case(types.GET_RESULTS_OK):
      return {...state, results: action.results}
    default:
      return state
  }
}
