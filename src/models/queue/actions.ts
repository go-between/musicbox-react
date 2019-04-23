import { ActionCreators, types } from './types'

const getUserQueue: ActionCreators['GetUserQueue'] = (returnOK, returnERR) => ({
  type: types.GET_USER_QUEUE,
  returnOK,
  returnERR,
})

const getUserQueueOK: ActionCreators['GetUserQueueOK'] = (returnOK, queue) => ({
  type: returnOK,
  queue,
})

const getUserQueueERR: ActionCreators['GetUserQueueERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

const updateQueue: ActionCreators['UpdateQueue'] = () => ({
  type: types.UPDATE_QUEUE
})

export default {
  getUserQueue,
  getUserQueueOK,
  getUserQueueERR,
  updateQueue,
}
