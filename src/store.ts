import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { compose, createStore, applyMiddleware, Store } from 'redux'

import reducer from './reducers'

export const history = createBrowserHistory()
const routeMiddleware = routerMiddleware(history)

const initialState = {
}

const composeEnhancers =
  typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

export const store: Store<any> = createStore(
  reducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(routeMiddleware),
  ),
)
