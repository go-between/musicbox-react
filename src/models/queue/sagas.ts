import { all, apply, put, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import actions from './actions'
import { createQueueDeserializer, queuesDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

function* createQueue(
  action: ReturnType<ActionCreators['CreateQueue']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.roomQueues.create, [action.roomId, action.songId, action.order])
  const queue = createQueueDeserializer(response)
  yield put(actions.getQueueOK(action.returnOK, queue))
}

function* getSongs(
  action: ReturnType<ActionCreators['GetQueues']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.roomQueues.index, [])
  const songs = queuesDeserializer(response)
  yield all(songs.map(s => put(actions.getQueueOK(action.returnOK, s))))
}

export default function* saga() {
  yield takeLatest(types.CREATE_QUEUE, createQueue)
  yield takeLatest(types.GET_QUEUES, getSongs)
}
