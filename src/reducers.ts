import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'

export type State = Readonly<{
  router: RouterState
}>

export default history =>
  combineReducers<State>({
    router: connectRouter(history),
  })
