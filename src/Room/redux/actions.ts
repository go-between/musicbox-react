import { ActionCreators, types } from './types'

const receiveSongs: ActionCreators['ReceiveSongs'] = (songs) => ({
  type: types.RECEIVE_SONGS,
  songs
})

export default {
  receiveSongs
}
