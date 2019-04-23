import { GetUserQueueOK, Queue } from 'models/queue'

const ENQUEUE_SONGS = 'app/Room/UserSong/ENQUEUE_SONGS'
const GET_USER_QUEUE_OK = 'app/Room/UserSong/GET_USER_QUEUE_OK'
const GET_USER_QUEUE_ERR = 'app/Room/UserSong/GET_USER_QUEUE_ERR'
const UPDATE_ORDER = 'app/Room/UserSong/UPDATE_ORDER'

type Types = {
  ENQUEUE_SONGS: typeof ENQUEUE_SONGS
  GET_USER_QUEUE_OK: typeof GET_USER_QUEUE_OK
  GET_USER_QUEUE_ERR: typeof GET_USER_QUEUE_ERR
  UPDATE_ORDER: typeof UPDATE_ORDER
}

export const types: Types = {
  ENQUEUE_SONGS,
  GET_USER_QUEUE_OK,
  GET_USER_QUEUE_ERR,
  UPDATE_ORDER,
}

type EnqueueSongs = (songs: EnqueuedSong[]) => {
  type: typeof ENQUEUE_SONGS
  songs: EnqueuedSong[]
}

type UpdateOrder = (dragIndex: number, hoverIndex: number) => {
  type: typeof UPDATE_ORDER
  dragIndex: number
  hoverIndex: number
}

export type Action =
  | ReturnType<GetUserQueueOK<Types['GET_USER_QUEUE_OK']>>
  | ReturnType<EnqueueSongs>
  | ReturnType<UpdateOrder>

export type ActionCreators = {
  EnqueueSongs: EnqueueSongs
  UpdateOrder: UpdateOrder
}

type EnqueuedSong = Pick<Queue, 'id' | 'song'>

export type State = {
  enqueuedSongs: EnqueuedSong[]
}

export const DRAG_TYPE = 'app/Room/UserSong/DRAG_TYPE'
