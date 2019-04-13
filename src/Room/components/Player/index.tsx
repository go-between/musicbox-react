import * as React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { State, actions } from './redux'

type PassedProps = { roomId: string }
type Props = State & PassedProps & typeof actions
class Player extends React.Component<Props, {}> {
  componentDidMount() {
    const client = getSingleton()
    client.subscribeTo('player').nowPlaying(this.props.roomId, actions.updateNowPlaying)
  }

  render() {
    const { currentSong, currentSongStart } = this.props
    if (!currentSong || !currentSongStart) {
      return <></>
    }

    return <>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
        playing={currentSong ? true : false}
      />
      current song id: {currentSong.youtubeId}
      current song: {currentSong.name} <br />
      current song start: {currentSongStart.toISOString()}
    </>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.player

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions,
)(Player)
