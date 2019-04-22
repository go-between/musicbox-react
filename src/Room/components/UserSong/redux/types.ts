import { GetUserQueueOK, Queue } from 'models/queue'

const ENQUEUE_SONGS = 'app/Room/UserSong/ENQUEUE_SONGS'
const GET_USER_QUEUE_OK = 'app/Room/UserSong/GET_USER_QUEUE_OK'
const GET_USER_QUEUE_ERR = 'app/Room/UserSong/GET_USER_QUEUE_ERR'

type Types = {
  ENQUEUE_SONGS: typeof ENQUEUE_SONGS
  GET_USER_QUEUE_OK: typeof GET_USER_QUEUE_OK
  GET_USER_QUEUE_ERR: typeof GET_USER_QUEUE_ERR
}

export const types: Types = {
  ENQUEUE_SONGS,
  GET_USER_QUEUE_OK,
  GET_USER_QUEUE_ERR,
}

type EnqueueSongs = (songs: EnqueuedSong[]) => {
  type: typeof ENQUEUE_SONGS
  songs: EnqueuedSong[]
}

export type Action =
  | ReturnType<GetUserQueueOK<Types['GET_USER_QUEUE_OK']>>
  | ReturnType<EnqueueSongs>

export type ActionCreators = {
  EnqueueSongs: EnqueueSongs
}

type EnqueuedSong = Pick<Queue, 'id' | 'song'>

export type State = {
  enqueuedSongs: EnqueuedSong[]
}
