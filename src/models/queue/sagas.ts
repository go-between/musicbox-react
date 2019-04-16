import { apply, put, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import actions from './actions'
import { queuesDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

// function* createQueue(
//   action: ReturnType<ActionCreators['CreateQueue']>,
// ) {
//   const api = getSingleton()

//   const response = yield apply(api, api.roomSongs.create, [action.roomId, action.songId, action.order])
//   const queue = createQueueDeserializer(response)
//   yield put(actions.getQueueOK(action.returnOK, queue))
// }

function* getQueues(
  action: ReturnType<ActionCreators['GetUserQueue']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.roomSongs.index, [])
  const enqueuedSongs = queuesDeserializer(response.userRoomSongs)
  yield put(actions.getUserQueueOK(action.returnOK, enqueuedSongs))
}

export default function* saga() {
  // yield takeLatest(types.CREATE_QUEUE, createQueue)
  yield takeLatest(types.GET_QUEUES, getQueues)
}
