import { Room } from 'models/room'
import { Queue } from 'models/queue'
import { Action as RoomAction } from 'Room/redux/types'

const UPDATE_QUEUE = 'app/Room/RoomQueue/UPDATE_QUEUE'

type Types = {
  UPDATE_QUEUE: typeof UPDATE_QUEUE
}

export const types: Types = {
  UPDATE_QUEUE
}

type UpdateQueue = (queue: Queue[]) => {
  type: typeof UPDATE_QUEUE
  queue: Queue[]
}

export type Action =
  | RoomAction
  | ReturnType<UpdateQueue>

export type ActionCreators = {
  UpdateQueue: UpdateQueue
}

export type State = Pick<Room, 'queue'>
