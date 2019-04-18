import { ActionCreators, types } from './types'

const getRooms: ActionCreators['GetRooms'] = (returnOK, returnERR) => ({
  type: types.GET_ROOMS,
  returnOK,
  returnERR,
})

const getRoomsOK: ActionCreators['GetRoomsOK'] = (returnOK, rooms) => ({
  type: returnOK,
  rooms,
})

const getRoomsERR: ActionCreators['GetRoomsERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

const joinRoom: ActionCreators['JoinRoom'] = (roomId, returnOK, returnERR) => ({
  type: types.JOIN_ROOM,
  roomId,
  returnOK,
  returnERR,
})

const joinRoomOK: ActionCreators['JoinRoomOK'] = (returnOK, room) => ({
  type: returnOK,
  room,
})

const joinRoomERR: ActionCreators['JoinRoomERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  getRooms,
  getRoomsOK,
  getRoomsERR,
  joinRoom,
  joinRoomOK,
  joinRoomERR,
}
