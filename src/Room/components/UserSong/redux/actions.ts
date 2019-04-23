import { ActionCreators, types } from './types'

const enqueueSongs: ActionCreators['EnqueueSongs'] = (songs) => ({
  type: types.ENQUEUE_SONGS,
  songs,
})

const updateOrder: ActionCreators['UpdateOrder'] = (dragIndex, hoverIndex) => ({
  type: types.UPDATE_ORDER,
  dragIndex,
  hoverIndex,
})

export default {
  enqueueSongs,
  updateOrder,
}
