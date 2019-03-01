import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import { getSingleton, QUEUES_CHANNEL } from '../cable'
import { actions as userActions } from '../models/user'

import { State as RootState } from '../reducers'
import { actions, State, types } from './redux'

import ReactPlayer from 'react-player'

const Container = system({
  is: 'p',
  display: ['block', 'flex'],
  flex: '1',
})

type Props = State & typeof userActions
class Room extends React.Component<Props, {}> {
  componentWillMount() {
    // Actions sent to subscribe are dispatched by the cable saga
    // and should not be previously wrapped in dispatch
    getSingleton().subscribe(QUEUES_CHANNEL, 'room', actions.receiveSongs)
    this.props.getUsers(types.GET_USERS_OK, types.GET_USERS_ERR)
  }

  render() {
    const {
      users,
      songs,
    } = this.props

    const player = songs.length > 0 ? <ReactPlayer url={songs[0].url} playing={true} /> : ''
    return(
      <>
        <Container>Hi: {users.length > 0 && users[0].name}</Container>
        {player}
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof userActions, {}>(
  mapStateToProps,
  userActions,
)(Room)
