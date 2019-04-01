import { APIUserResponse } from '../../graphql'
import { User } from './types'

export const usersDeserializer = (response: APIUserResponse): User[] => {
  return response.users.map(u => u)
}
