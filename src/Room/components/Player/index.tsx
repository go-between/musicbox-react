import * as React from 'react'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import system from '@rebass/components'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { State, actions } from './redux'

const PlayerWrapper = system(
  {
    is: 'div',
    pt: '56.25%'
  },
  {
    position: 'relative'
  },
  'space'
)

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

    return (
      <>
        <PlayerWrapper>
          <ReactPlayer
            style={{position: 'absolute', top: 0, left: 0}}
            url={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
            // controls={true}
            playing={currentSong ? true : false}
            height="100%"
            width="100%"
          />
        </PlayerWrapper>
        current song id: {currentSong.youtubeId}
        current song: {currentSong.name} <br />
        current song start: {currentSongStart.toISOString()}
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.room.player

export default connect<State, typeof actions, PassedProps>(
  mapStateToProps,
  actions,
)(Player)
