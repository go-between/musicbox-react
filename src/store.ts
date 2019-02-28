import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { compose, createStore, applyMiddleware, Store } from 'redux'

import { setupSingleton as cableClient } from './cable'
import { setupSingleton as apiClient } from './client'

import reducer from './reducers'
import { default as userSaga } from './models/user/sagas'

import { default as websocketSaga } from './cable/sagas'

apiClient('http://localhost:3000', '')
cableClient({ debug: true })

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
}

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(websocketSaga)
