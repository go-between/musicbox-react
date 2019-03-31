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
import { default as youtubeSearchSaga } from './YoutubeSearch/redux/sagas'
import { default as websocketSaga } from './cable/sagas'

cableClient({ debug: true })
graphClient(
  `${API_HOST}/api/v1/graphql`,
  'a163fef29888ac08a8c987fdf49c097ec7675e98d455304f81188b38fd7091d8',
  { debug: true }
)

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const websocketSagaMiddleware = createSagaMiddleware()

const initialState = {}

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

function* rootSaga() {
  yield fork(userSaga)
  yield fork(songSaga)
  yield fork(youtubeSearchSaga)
}

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(websocketSaga)
