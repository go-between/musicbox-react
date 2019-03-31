import { all, apply, put, select, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import { State as RootState } from '../../reducers'
import actions from './actions'
import { usersDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

function* getUsers(
  action: ReturnType<ActionCreators['GetUsers']>,
) {
  const api = getSingleton()

  const roomId = yield select((s: RootState) => s.room.roomId)

  const response = yield apply(api, api.users.inRoom, [roomId])
  const songs = usersDeserializer(response)
  yield all(songs.map(s => put(actions.getUserOK(action.returnOK, s))))
}

export default function* saga() {
  yield takeLatest(types.GET_USERS, getUsers)
}
