import * as React from 'react'
import { connect } from 'react-redux'
import system from '@rebass/components'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { actions, State } from './redux'

const SongList = system({ is: 'ul' })
const Song = system({ is: 'li' })

type PassedProps = { roomId: string }
type Props = State & PassedProps & typeof actions
class RoomSong extends React.Component<Props, {}> {
  componentDidMount() {
    const client = getSingleton()
    client.subscribeTo('roomSong').roomSong(this.props.roomId, actions.updateQueue)
  }

  render() {
    const songs = this.props.queue.map(song => (
      <Song key={song.songId}>
        {song.name} ({song.order}) by {song.user}
      </Song>
    ))
    return <SongList>
      {songs}
    </SongList>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.roomSong

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions
)(RoomSong)
