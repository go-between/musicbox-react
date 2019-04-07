import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import system from '@rebass/components'

import { State as RootState } from 'reducers'
import { actions as roomActions } from 'models/room'
import Library from 'Library'

import Player from './components/Player'
import RoomQueue from './components/RoomQueue'
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
        <Container>
          <Title>Song Library</Title>
          <Library roomId={id} />
        </Container>
        <Container>
          <Title>Song Player</Title>
          <Player roomId={id} />
        </Container>
        <Container>
          <Title>Room Queue</Title>
          <RoomQueue roomId={id} />
        </Container>
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
