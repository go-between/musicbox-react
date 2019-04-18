import * as React from 'react';
import { connect } from 'react-redux'
import { push as reduxPush } from 'connected-react-router'
import system from '@rebass/components'

import { actions as roomActions } from '../models/room'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const RoomList = system({
  is: 'ul'
})

const RoomItem = system({
  is: 'li'
})

type Actions = typeof roomActions & { push: typeof reduxPush }
type Props = State & Actions

class Lobby extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getRooms(types.GET_ROOMS_OK, types.GET_ROOMS_ERR)
  }

  render() {
    const rooms = this.props.rooms.map(r => {
      const onClick = () => this.props.push(`/room/${r.id}`)
      return <RoomItem onClick={onClick} key={r.id}>
        Room:  {r.name}{' '} <br />
        Now Playing:  {r.currentSong && r.currentSong.name}
      </RoomItem>
    })
    return <RoomList>
      {rooms}
    </RoomList>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.lobby

export default connect<State, Actions, {}>(
  mapStateToProps,
  { ...roomActions, push: reduxPush }
)(Lobby)
