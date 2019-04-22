import * as React from 'react'
import { connect } from 'react-redux'
import system from '@rebass/components'
import uuid from 'uuid/v4'

import { actions as queueActions } from 'models/queue'
import { Song } from 'models/song'
import { State as RootState } from 'reducers'
import Library from 'Library'

import { actions, State, types } from './redux'

const Container = system({
  is: 'div',
  display: ['block', 'flex'],
  flex: '1',
}, { margin: 20 })

const Title = system({
}, {
  fontWeight: 'bold'
})

const SongList = system({
  is: 'ul'
})

const SongItem = system({
  is: 'li'
})

type PassedProps = { roomId: string }
type Actions = typeof queueActions & typeof actions
type Props = Actions & PassedProps & State

class UserSong extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getUserQueue(types.GET_USER_QUEUE_OK, types.GET_USER_QUEUE_ERR)
  }

  enqueueSongs = (songs: Song[]) => {
    const enqueues = songs.map(song => ({
      id: uuid(),
      song
    }))
    this.props.enqueueSongs(enqueues)
    this.props.updateQueue()
  }

  renderSongs = () => {
    const { enqueuedSongs } = this.props
    if (enqueuedSongs.length === 0) {
      return null
    }

    const songList = enqueuedSongs.map(queue => {
      const { id, song: { name } } = queue
      return <SongItem key={id}>{name}</SongItem>
    })

    return <>
      <SongList>
        {songList}
      </SongList>
    </>
  }

  render() {
    return(
      <>
        <Container>
          <Title>Library</Title>
          <Library enqueueSongs={this.enqueueSongs} roomId={this.props.roomId} />
        </Container>
        <Container>
          <Title>My Queue</Title>
          {this.renderSongs()}
        </Container>
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.userSong

export default connect<State, Actions, PassedProps>(
  mapStateToProps,
  { ...actions, ...queueActions },
)(UserSong)
