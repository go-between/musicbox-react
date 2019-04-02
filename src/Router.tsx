import * as React from 'react'
import { ConnectedRouter } from 'connected-react-router'

import Routes from './Routes'
import { history } from './store'

export default class Router extends React.Component<{}, {}> {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    )
  }
}
