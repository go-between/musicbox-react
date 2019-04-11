import { ActionCreators, types } from './types'

const updateQueue: ActionCreators['UpdateQueue'] = (queue) => ({
  type: types.UPDATE_QUEUE,
  queue,
})

export default {
  updateQueue
}
