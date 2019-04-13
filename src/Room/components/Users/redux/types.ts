import { Room } from 'models/room'
import { Action as RoomAction } from 'Room/redux/types'

const UPDATE_USERS = 'app/Room/Users/UPDATE_USERS'

type Types = {
  UPDATE_USERS: typeof UPDATE_USERS
}

export const types: Types = {
  UPDATE_USERS
}

type UpdateUsers = (payload: State) => {
  type: typeof UPDATE_USERS
  users: State['users']
}

export type Action =
  | RoomAction
  | ReturnType<UpdateUsers>

export type ActionCreators = {
  UpdateUsers: UpdateUsers
}

export type State = Pick<Room, 'users'>
