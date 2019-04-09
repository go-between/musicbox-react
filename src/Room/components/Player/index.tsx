import * as React from 'react'
import { connect } from 'react-redux'

import { State as RootState } from 'reducers'

import { State } from './redux'

type PassedProps = { roomId: string }
type Props = State & PassedProps
class Player extends React.Component<Props, {}> {
  render() {
    const { currentSong, currentSongStart } = this.props
    if (!currentSong || !currentSongStart) {
      return
    }

    return <>
      current song: {currentSong.name} <br />
      current song start: {currentSongStart.toISOString()}
    </>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.player

export default connect<State, {}, PassedProps>(
  mapStateToProps,
  {}
)(Player)
