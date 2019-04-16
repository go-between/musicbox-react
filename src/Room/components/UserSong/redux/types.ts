import { GetQueueOK, Queue } from 'models/queue'

const GET_QUEUE_OK = 'app/Room/RoomSong/GET_QUEUE_OK'
const GET_QUEUE_ERR = 'app/Room/RoomSong/GET_QUEUE_ERR'

type Types = {
  GET_QUEUE_OK: typeof GET_QUEUE_OK
  GET_QUEUE_ERR: typeof GET_QUEUE_ERR
}

export const types: Types = {
  GET_QUEUE_OK,
  GET_QUEUE_ERR,
}

export type Action =
  | ReturnType<GetQueueOK<Types['GET_QUEUE_OK']>>

export type State = {
  enqueuedSongs: Queue[]
}
