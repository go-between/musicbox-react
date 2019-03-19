import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { compose, createStore, applyMiddleware, Store } from 'redux'

import { setupSingleton as cableClient } from './cable'
import { setupSingleton as apiClient } from './client'
import { API_HOST } from './lib/constants'
import reducer from './reducers'
import { sagas } from './Room/redux'
import { default as songSaga } from './models/song/sagas'
import { default as userSaga } from './models/user/sagas'
import { default as websocketSaga } from './cable/sagas'

apiClient(API_HOST, '')
cableClient({ debug: false })

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
  yield fork(sagas)
}

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(websocketSaga)
