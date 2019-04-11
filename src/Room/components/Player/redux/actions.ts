import { ActionCreators, types } from './types'

const updateNowPlaying: ActionCreators['UpdateNowPlaying'] = ({ currentSong, currentSongStart }) => ({
  type: types.UPDATE_NOW_PLAYING,
  currentSong,
  currentSongStart,
})

export default {
  updateNowPlaying
}
