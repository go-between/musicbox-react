import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import YoutubeSearch from '../YoutubeSearch'
import { actions as songActions } from '../models/song'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const SongList = system(
  {
    is: 'ul',
    m: 0,
    p: 0,
  },
  {
    listStyleType: 'none',
  },
  'space',
)

const SongItem = system({
  is: 'li'
})

type PassedProps = {
  enqueueSongs: (songs: State['songs']) => any
  roomId: string
}
type Props = State & typeof songActions & PassedProps

class Room extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.getSongs(types.GET_SONG_OK, types.GET_SONGS_ERR)
  }

  createSong = (youtubeId: string) => {
    this.props.createSong(youtubeId, types.GET_SONG_OK, '')
  }

  renderSongs = () => {
    const { songs } = this.props
    if (songs.length === 0) {
      return null
    }

    const songList = songs.map(s => {
      const onClick = () => this.props.enqueueSongs([s])
      return <SongItem onClick={onClick} key={s.id}>{s.name}</SongItem>
    })

    return <>
      <SongList>
        {songList}
      </SongList>
    </>
  }

  render() {
    return <>
      <div>
        Search
        <YoutubeSearch createSong={this.createSong} />
      </div>
      {this.renderSongs()}
    </>
  }
}

type MapStateToProps = (state: RootState) => State
const mapStateToProps: MapStateToProps = (state) => state.library

export default connect<State, typeof songActions, PassedProps>(
  mapStateToProps,
  songActions,
)(Room)
