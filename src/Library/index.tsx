import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'
import { themeGet } from 'styled-system'
import { Box, Flex, Text } from 'rebass'
import { Check, Plus, X } from 'react-feather'

import { actions as songActions } from '../models/song'
import { State as RootState } from '../reducers'

import { State, types } from './redux'

const SongList = system(
  {
    as: 'ul',
    flex: '1 1 auto',
    m: 0,
    px: 0,
    py: 2,
  },
  {
    listStyleType: 'none',
    overflowY: 'scroll'
  },
  'flex',
  'space',
)

const SongItem = system(
  {
    as: 'li',
    borderRadius: 4,
    mx: 1,
    p: 2
  },
  props => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: `${themeGet('colors.white')(props)}`,
      boxShadow: `${themeGet('shadows.1')(props)}`,
    }
  }),
  'borderRadius',
  'space',
)

const SongName = system(
  {
    as: Box,
    flex: 1,
    pr: 3,
  },
  {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  'flex'
)

const SongDuration = system(
  {
    as: Box,
  }
)

type PassedProps = {
  enqueueSongs: (songs: State['songs']) => any
  enqueuedSongIds: string[]
  roomId: string
}
type Props = State & typeof songActions & PassedProps

class Room extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getSongs(types.GET_SONG_OK, types.GET_SONGS_ERR)
  }

  renderSongs = () => {
    const { songs } = this.props
    if (songs.length === 0) {
      return null
    }

    const songList = songs.map(s => {
      const addSongToQueue = () => this.props.enqueueSongs([s])
      const removeSongFromLibrary = () => this.props.removeSong(s.id, {returnOK: ''})
      const songTitle = s.name.split('-')
      const songArtist = songTitle[0]
      const songName = songTitle[1]
      const seconds = s.durationInSeconds % 60
      const minutes = Math.floor(s.durationInSeconds / 60)

      const EnqueuedSongStatus =
        this.props.enqueuedSongIds.includes(s.id) ?
        Check :
        Plus

      return (
        <SongItem
          key={s.id}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box mr={3} onClick={addSongToQueue}>
              <EnqueuedSongStatus size={16} />
            </Box>
            <SongName>
              <Text
                color="offBlack"
                fontWeight="bold"
              >
                {songArtist}
              </Text>
              <Text
                color="grayDark"
              >
                {songName || 'No Song Name Provided'}
              </Text>
            </SongName>

            <Box mr={3} onClick={removeSongFromLibrary}>
              <X size={16} />
            </Box>

            <SongDuration>
              <Text textAlign="right">{minutes}:{seconds}</Text>
            </SongDuration>
          </Flex>

        </SongItem>
      )
    })

    return <>
      <SongList>
        {songList}
      </SongList>
    </>
  }

  render() {
    return (
      <>
        {this.renderSongs()}
      </>
    )
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.library

export default connect<State, typeof songActions, PassedProps>(
  mapStateToProps,
  songActions,
)(Room)
