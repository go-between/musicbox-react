import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'

import { reducer as room, State as RoomState } from './Room/redux'

export type State = Readonly<{
  room: RoomState
  router: RouterState
}>

export default history =>
  combineReducers<State>({
    room,
    router: connectRouter(history),
  })
