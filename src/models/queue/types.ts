import { Song } from 'models/song'
import { User } from 'models/user'
const CREATE_QUEUE = 'models/queue/CREATE_QUEUE'
const GET_USER_QUEUE = 'models/queue/GET_USER_QUEUE'
const UPDATE_QUEUE = 'models/queue/UPDATE_QUEUE'

type Types = {
  CREATE_QUEUE: typeof CREATE_QUEUE
  GET_USER_QUEUE: typeof GET_USER_QUEUE
  UPDATE_QUEUE: typeof UPDATE_QUEUE
}

export const types: Types = {
  CREATE_QUEUE,
  GET_USER_QUEUE,
  UPDATE_QUEUE,
}

type GetUserQueue = <OK, ERR>(returnOK: OK, returnERR: ERR) => {
  type: typeof GET_USER_QUEUE,
  returnOK: OK,
  returnERR: ERR,
}

export type GetUserQueueOK<T> = (type: T, queue: Queue[]) => {
  type: T,
  queue: Queue[],
}

export type GetUserQueueERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

type UpdateQueue = () => {
  type: typeof UPDATE_QUEUE
}

export type ActionCreators = {
  GetUserQueue: GetUserQueue,
  GetUserQueueOK: GetUserQueueOK<any>
  GetUserQueueERR: GetUserQueueERR<any>
  UpdateQueue: UpdateQueue
}

export type Queue = {
  id: string
  song: Song
  user: User
}
