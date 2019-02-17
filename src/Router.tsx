import * as React from 'react'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

import Room from './Room'
import { history } from './store'

export default class Router extends React.Component<{}, {}> {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            exact={true}
            path="/room"
            component={Room}
          />
        </Switch>
      </ConnectedRouter>
    )
  }
}
