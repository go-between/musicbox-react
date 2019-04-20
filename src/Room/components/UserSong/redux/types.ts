import { GetUserQueueOK, Queue } from 'models/queue'

const GET_USER_QUEUE_OK = 'app/Room/RoomSong/GET_USER_QUEUE_OK'
const GET_USER_QUEUE_ERR = 'app/Room/RoomSong/GET_USER_QUEUE_ERR'

type Types = {
  GET_USER_QUEUE_OK: typeof GET_USER_QUEUE_OK
  GET_USER_QUEUE_ERR: typeof GET_USER_QUEUE_ERR
}

export const types: Types = {
  GET_USER_QUEUE_OK,
  GET_USER_QUEUE_ERR,
}

export type Action =
  | ReturnType<GetUserQueueOK<Types['GET_USER_QUEUE_OK']>>

export type State = {
  enqueuedSongs: Queue[]
}
