import * as React from 'react'
import { connect } from 'react-redux'
import system from '@rebass/components'

import { actions as queueActions } from 'models/queue'
import { State as RootState } from 'reducers'
import Library from 'Library'

import { State, types } from './redux'

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
type Props = State & PassedProps & typeof queueActions

class UserSong extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getUserQueue(types.GET_USER_QUEUE_OK, types.GET_USER_QUEUE_ERR)
  }

  renderSongs = () => {
    const { enqueuedSongs } = this.props
    if (enqueuedSongs.length === 0) {
      return null
    }

    const songList = enqueuedSongs.map(s => {
      return <SongItem key={s.id}>{s.name}</SongItem>
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
          <Library roomId={this.props.roomId} />
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

export default connect<State, typeof queueActions, PassedProps>(
  mapStateToProps,
  queueActions,
)(UserSong)
