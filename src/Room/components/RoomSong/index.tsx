import * as React from 'react'
import { connect } from 'react-redux'

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
    const songs = this.props.queue.map(song => (
      <List.Item key={song.songId}>
        {song.name} by {song.user}
      </List.Item>
    ))
    return  (
      <List>
        {songs}
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
