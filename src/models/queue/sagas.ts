import { apply, put, select, takeLatest } from 'redux-saga/effects'
import { getSingleton } from 'graphql'
import { State as RootState } from 'reducers'
import actions from './actions'
import { queueDeserializer } from './deserializers'
import { ActionCreators, Queue, types } from './types'

function* getUserQueue(
  action: ReturnType<ActionCreators['GetUserQueue']>,
) {
  const api = getSingleton()

  const roomId = yield select((s: RootState) => s.room.base.id)

  const response = yield apply(api, api.roomSongs.index, [roomId, true])
  const enqueuedSongs = response.roomSongs.map(queueDeserializer)
  yield put(actions.getUserQueueOK(action.returnOK, enqueuedSongs))
}

function* updateQueue(
  action: ReturnType<ActionCreators['UpdateQueue']>,
) {
  const api = getSingleton()

  const { enqueuedSongs, roomId } = (yield select((s: RootState) => ({
    enqueuedSongs: s.room.userSong.enqueuedSongs,
    roomId: s.room.base.id,
  }))) as { enqueuedSongs: Queue[], roomId: string }

  const orderedSongs = enqueuedSongs.map(q => ({ songId: q.song.id, roomSongId: q.id }))

  yield apply(api, api.roomSongs.orderRoomSongs, [roomId, orderedSongs])
}

export default function* saga() {
  yield takeLatest(types.GET_USER_QUEUE, getUserQueue)
  yield takeLatest(types.UPDATE_QUEUE, updateQueue)
}
