import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { compose, createStore, applyMiddleware, Store } from 'redux'

import { setupSingleton as cableClient } from './cable'
import { setupSingleton as graphClient } from './graphql'
import { API_HOST } from './lib/constants'
import reducer from './reducers'

import { default as songSaga } from './models/song/sagas'
import { default as userSaga } from './models/user/sagas'
import { default as authSaga } from './Auth/redux/sagas'
import { default as youtubeSearchSaga } from './YoutubeSearch/redux/sagas'
import { default as websocketSaga } from './cable/sagas'

import { initialState as authState } from './Auth/redux/reducers'

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const websocketSagaMiddleware = createSagaMiddleware()

const persistedState = JSON.parse(localStorage.getItem('musicbox') || '{}')
const initialState = {
  auth: {
    ...authState,
    token: persistedState.auth && persistedState.auth.token,
  }
}

cableClient({ debug: true })
graphClient(
  `${API_HOST}/api/v1/graphql`,
  initialState.auth.token,
  { debug: true }
)

const composeEnhancers =
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const store: Store<any> = createStore(
  reducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(routeMiddleware),
    applyMiddleware(sagaMiddleware),
    applyMiddleware(websocketSagaMiddleware),
  ),
)

store.subscribe(() => {
  const { auth } = store.getState()
  localStorage.setItem('musicbox', JSON.stringify({ auth: { token: auth.token } }))
})

function* rootSaga() {
  yield fork(authSaga)
  yield fork(userSaga)
  yield fork(songSaga)
  yield fork(youtubeSearchSaga)
}

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(websocketSaga)
