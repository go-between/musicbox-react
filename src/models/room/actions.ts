import { ActionCreators, types } from './types'

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
  joinRoom,
  joinRoomOK,
  joinRoomERR,
}
