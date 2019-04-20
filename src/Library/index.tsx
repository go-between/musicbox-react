import * as React from 'react';
import { connect } from 'react-redux'
import system from '@rebass/components'

import YoutubeSearch from '../YoutubeSearch'
import { actions as songActions } from '../models/song'
import { actions as queueActions } from '../models/queue'

import { State as RootState } from '../reducers'
import { State, types } from './redux'

const SongList = system({
  is: 'ul'
})

const SongItem = system({
  is: 'li'
})

type Props = State & typeof songActions & typeof queueActions & { roomId: string }

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
      return <SongItem key={s.id}>{s.name}</SongItem>
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

export default connect<State, typeof songActions & typeof queueActions, { roomId: string }>(
  mapStateToProps,
  {
    ...songActions,
    ...queueActions
  },
)(Room)
