import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import { actions } from '../models/user'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const Container = system({
  is: 'p',
  display: ['block', 'flex'],
  flex: '1',
})

type Props = State & typeof actions
class Room extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.getUsers(types.GET_USERS_OK, types.GET_USERS_ERR)
  }

  render() {
    const users = this.props.users.map(u => u.name)
    return <Container>Hi: {users}</Container>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof actions, {}>(
  mapStateToProps,
  actions,
)(Room)
