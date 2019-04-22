import { ActionCreators, types } from './types'

const enqueueSongs: ActionCreators['EnqueueSongs'] = (songs) => ({
  type: types.ENQUEUE_SONGS,
  songs,
})

export default {
  enqueueSongs
}
