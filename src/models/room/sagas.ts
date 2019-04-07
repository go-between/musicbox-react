import { apply, put, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import actions from './actions'
import { joinRoomDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

function* joinRoom(
  action: ReturnType<ActionCreators['JoinRoom']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.rooms.joinRoom, [action.roomId])
  const room = joinRoomDeserializer(response)
  yield put(actions.joinRoomOK(action.returnOK, room))
}

export default function* saga() {
  yield takeLatest(types.JOIN_ROOM, joinRoom)
}
