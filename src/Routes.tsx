import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router'
import { connect } from 'react-redux'

import { State } from './reducers'
import Auth from './Auth'
import Room from './Room'

type Props = State['auth']
class Routes extends React.Component<Props> {
  render() {
    if (!this.props.token) {
      return (
        <Switch>
          <Route component={Auth} />
        </Switch>
      )
    }

    return (
      <Switch>
        <Route
          exact={true}
          path="/room/:id"
          component={Room}
        />
      </Switch>
    )
  }
}

type MapStateToProps = (state: State) => Props
const mapStateToProps: MapStateToProps = state => state.auth
export default withRouter(
  connect<Props, any, any>(
    mapStateToProps,
    {},
  )(Routes),
)
