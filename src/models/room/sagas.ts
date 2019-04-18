import { apply, put, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import actions from './actions'
import { roomDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

function* getRooms(
  action: ReturnType<ActionCreators['GetRooms']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.rooms.index, [])
  const rooms = response.rooms.map(roomDeserializer)

  yield put(actions.getRoomsOK(action.returnOK, rooms))
}

function* joinRoom(
  action: ReturnType<ActionCreators['JoinRoom']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.rooms.joinRoom, [action.roomId])
  const room = roomDeserializer(response.joinRoom.room)
  yield put(actions.joinRoomOK(action.returnOK, room))
}

export default function* saga() {
  yield takeLatest(types.GET_ROOMS, getRooms)
  yield takeLatest(types.JOIN_ROOM, joinRoom)
}
