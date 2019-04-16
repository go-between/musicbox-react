const CREATE_QUEUE = 'models/queue/CREATE_QUEUE'
const GET_QUEUES = 'models/queue/GET_QUEUES'

type Types = {
  CREATE_QUEUE: typeof CREATE_QUEUE
  GET_QUEUES: typeof GET_QUEUES
}

export const types: Types = {
  CREATE_QUEUE,
  GET_QUEUES,
}

type CreateQueue = <OK, ERR>(
    roomId: Queue['roomId'],
    songId: Queue['songId'],
    order: Queue['order'],
    returnOK: OK,
    returnERR: ERR
  ) => {
  type: typeof CREATE_QUEUE,
  roomId: Queue['roomId'],
  songId: Queue['songId'],
  order: Queue['order'],
  returnOK: OK,
  returnERR: ERR,
}

export type CreateQueueOK<T> = (type: T, queue: Queue) => {
  type: T,
  queue: Queue,
}

export type CreateQueueERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

type GetUserQueue = <OK, ERR>(returnOK: OK, returnERR: ERR) => {
  type: typeof GET_QUEUES,
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
  CreateQueue: CreateQueue
  CreateQueueOK: CreateQueueOK<any>
  CreateQueueERR: CreateQueueERR<any>
  GetUserQueue: GetUserQueue,
  GetUserQueueOK: GetUserQueueOK<any>
  GetUserQueueERR: GetUserQueueERR<any>
}

export type Queue = {
  id: string
  songId: string
  roomId?: string
  order: number
  name: string
  user: string
}
