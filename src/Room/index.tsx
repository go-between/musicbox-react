import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Box, Heading } from 'rebass'
import system from '@rebass/components'

import { State as RootState } from 'reducers'
import { actions as roomActions } from 'models/room'
import Library from 'Library'

import Player from './components/Player'
import RoomSong from './components/RoomSong'
import Users from './components/Users'

import { State, types } from './redux'
import Grid from '../components/grid'

const ChatPanel = system(
  {
    bg: 'white',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: '100%',
    boxShadow: 1,
    p: 2,
  },
  'boxShadow',
  'color',
  'height',
  'space',
)

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
      <Grid
        flexDirection="column"
        minHeight="100vh"
      >
        <Grid.Body>
          <Grid.Column flex="0 0 25%" mx={2}>
            <Box>
              <Heading>Song Library</Heading>
              <Library roomId={id} />
            </Box>
          </Grid.Column>

          <Grid.Column flex="1" mx={2} order={[-1, 0]}>
            <Box>
              <Heading>Song Player</Heading>
              <Player roomId={id} />
            </Box>

            <Box>
              <Heading>Room Queue</Heading>
              <RoomSong roomId={id} />
            </Box>
          </Grid.Column>

          <Grid.Column flex="0 0 25%" mx={2}>
            <ChatPanel>
              <Heading>Chat</Heading>
              <Users roomId={id} />
            </ChatPanel>
          </Grid.Column>
        </Grid.Body>
      </Grid>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room

export default connect<State, typeof roomActions, {}>(
  mapStateToProps,
  roomActions
)(Room)
