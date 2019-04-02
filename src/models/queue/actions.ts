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

const GetQueues: ActionCreators['GetQueues'] = (returnOK, returnERR) => ({
  type: types.GET_QUEUES,
  returnOK,
  returnERR,
})

const getQueueOK: ActionCreators['GetQueueOK'] = (returnOK, queue) => ({
  type: returnOK,
  queue,
})

const GetQueuesERR: ActionCreators['GetQueuesERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  createQueue,
  createQueueOK,
  createQueueERR,
  GetQueues,
  getQueueOK,
  GetQueuesERR,
}
