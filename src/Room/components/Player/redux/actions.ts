import { ActionCreators, types } from './types'

const updateNowPlaying: ActionCreators['UpdateNowPlaying'] = ({song, startedAt}) => ({
  type: types.UPDATE_NOW_PLAYING,
  song,
  startedAt,
})

export default {
  updateNowPlaying
}
