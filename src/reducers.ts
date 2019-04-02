import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'

import { reducer as auth, State as AuthState } from './Auth/redux'
import { reducer as library, State as LibraryState } from './Library/redux'
import { reducer as room, State as RoomState } from './Room/redux'
import { reducer as youtubeSearch, State as YoutubeSearchState } from './YoutubeSearch/redux'

export type State = Readonly<{
  auth: AuthState
  library: LibraryState
  room: RoomState
  router: RouterState
  youtubeSearch: YoutubeSearchState
}>

export default history =>
  combineReducers<State>({
    auth,
    library,
    room,
    router: connectRouter(history),
    youtubeSearch,
  })
