import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Box, Heading } from 'rebass'

import { State as RootState } from 'reducers'
import { actions as roomActions } from 'models/room'
import Library from 'Library'

import Player from './components/Player'
import RoomSong from './components/RoomSong'
import { State, types } from './redux'

type Props = State & typeof roomActions & RouteComponentProps<{id: string}>

class Room extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.joinRoom(this.props.match.params.id, types.JOIN_ROOM_OK, types.JOIN_ROOMS_ERR)
  }

  render() {
    const { base: { id } } = this.props
    if (!id) {
      return null
    }

    return(
      <>
        <Box>
          <Heading>Song Library</Heading>
          <Library roomId={id} />
        </Box>

        <Box>
          <Heading>Song Player</Heading>
          <Player roomId={id} />
        </Box>

        <Box>
          <Heading>Room Queue</Heading>
          <RoomSong roomId={id} />
        </Box>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof roomActions, {}>(
  mapStateToProps,
  roomActions
)(Room)
