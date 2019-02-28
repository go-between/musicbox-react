import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import { actions } from '../models/user'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

import ReactPlayer from 'react-player'

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

export default connect<State, typeof actions, {}>(
  mapStateToProps,
  actions,
)(Room)
