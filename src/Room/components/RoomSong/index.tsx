import * as React from 'react'
import { connect } from 'react-redux'
import {Box, Flex, Text } from 'rebass'
import { User } from 'react-feather'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { actions, State } from './redux'

import List from '../../../components/list'

type PassedProps = { roomId: string }
type Props = State & PassedProps & typeof actions

class RoomSong extends React.Component<Props, {}> {
  componentDidMount() {
    const client = getSingleton()
    client.subscribeTo('roomSong').roomSong(this.props.roomId, actions.updateQueue)
  }

  render() {
    const songs = this.props.queue.map(queue => (
      <List.Item key={queue.id} p={4}>
        <Text color="offBlack" fontWeight="bold">
          {queue.song.name}
        </Text>
        <Text color="grayDark">
          <Flex alignItems="center">
            <User size={14} /> Added By: {queue.user.email}
          </Flex>
        </Text>
         {/* by  - {queue.id} */}
      </List.Item>
    ))
    return  (
      <List>
        {songs.length > 0 ? songs : <Box p={4}>no songs in queue</Box>}
      </List>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.roomSong

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions
)(RoomSong)
