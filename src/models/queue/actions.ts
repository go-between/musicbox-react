import { ActionCreators, types } from './types'

const createQueue: ActionCreators['CreateQueue'] = (roomId, songId, order, returnOK, returnERR) => ({
  type: types.CREATE_QUEUE,
  roomId,
  songId,
  order,
  returnOK,
  returnERR,
})

const createQueueOK: ActionCreators['CreateQueueOK'] = (returnOK, queue) => ({
  type: returnOK,
  queue,
})

const createQueueERR: ActionCreators['CreateQueueERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

const getUserQueue: ActionCreators['GetUserQueue'] = (returnOK, returnERR) => ({
  type: types.GET_QUEUES,
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

export default {
  createQueue,
  createQueueOK,
  createQueueERR,
  getUserQueue,
  getUserQueueOK,
  getUserQueueERR,
}
