import * as React from 'react'
// import moment from 'moment'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import system from '@rebass/components'
import { Youtube } from 'react-feather'
import { Box, Card, Text } from 'rebass'

import { getSingleton } from 'cable'
import { State as RootState } from 'reducers'

import { State, actions } from './redux'

const PlayerWrapper = system(
  {
    as: 'div',
    pt: '56.25%'
  },
  {
    position: 'relative',
  },
  'space'
)

const PlayerMetaWrapper = system(
  {
    as: Box,
    bg: 'white',
    p: 3,
  },
  'color',
  'space',
)

const VideoPlayerIcon = system(
  {
    as: Card,
    alignItems: 'center',
    bg: 'white',
    color: 'offBlack',
    boxShadow: 1,
    borderRadius: '100%',
    display: 'flex',
    height: '50px',
    justifyContent: 'center',
    mx: 'auto',
    my: 3,
    width: '50px',
  },
  'alignItems',
  'display',
  'justifyContent',
  'height',
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
    console.log('currentsongstart: ', currentSongStart)
    if (!currentSong || !currentSongStart) {
      return (
        <Card bg="offBlack" color="offWhite" p={4}>
          <VideoPlayerIcon>
            <Youtube size={20} />
          </VideoPlayerIcon>

          <Text textAlign="center">No Song Currently Playing</Text>
        </Card>
      )
    }

    return (
      <>
        <PlayerWrapper>
          <ReactPlayer
            style={{position: 'absolute', top: 0, left: 0}}
            url={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
            controls={true}
            playing={currentSong ? true : false}
            height="100%"
            width="100%"
          />
        </PlayerWrapper>

        <PlayerMetaWrapper>
          <Text
            color="offBlack"
            fontWeight="bold"
          >
            {currentSong.name}
          </Text>
          {/* current song id: {currentSong.youtubeId} */}
          {/* current song start: {currentSongStart.toISOString()} */}
        </PlayerMetaWrapper>
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
