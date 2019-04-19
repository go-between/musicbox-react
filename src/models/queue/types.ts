const CREATE_QUEUE = 'models/queue/CREATE_QUEUE'
const GET_USER_QUEUE = 'models/queue/GET_USER_QUEUE'

type Types = {
  CREATE_QUEUE: typeof CREATE_QUEUE
  GET_USER_QUEUE: typeof GET_USER_QUEUE
}

export const types: Types = {
  CREATE_QUEUE,
  GET_USER_QUEUE,
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

export type ActionCreators = {
  GetUserQueue: GetUserQueue,
  GetUserQueueOK: GetUserQueueOK<any>
  GetUserQueueERR: GetUserQueueERR<any>
}

export type Queue = {
  id: string
  songId: string
  roomId?: string
  name: string
  user: string
}
