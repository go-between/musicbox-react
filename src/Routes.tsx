import * as React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router'
import { connect } from 'react-redux'

import { actions as cableActions } from 'cable'
import { State } from './reducers'
import Auth from './Auth'
import Lobby from './Lobby'
import Room from './Room'

type ComponentState = { auth: State['auth'], cable: State['cable'] }
type Props = State & typeof cableActions
class Routes extends React.Component<Props> {
  componentDidMount() {
    if (this.props.auth.token) {
      this.props.connect()
    }
  }

  render() {
    if (!this.props.auth.token) {
      return (
        <Switch>
          <Route exact={true} path="/login" component={Auth}/>
          <Redirect to={{pathname: '/login', state: { redirect: location.pathname }}} />
        </Switch>
      )
    }

    if (!this.props.cable.connected) {
      return null
    }

    return (
      <Switch>
        <Route
          exact={true}
          path="/lobby"
          component={Lobby}
        />
        <Route
          exact={true}
          path="/room/:id"
          component={Room}
        />
      </Switch>
    )
  }
}

type MapStateToProps = (state: State) => ComponentState
const mapStateToProps: MapStateToProps = state => ({ auth: state.auth, cable: state.cable })
export default withRouter(
  connect<ComponentState, typeof cableActions, any>(
    mapStateToProps,
    cableActions,
  )(Routes),
)
