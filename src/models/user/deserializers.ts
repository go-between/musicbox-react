import { APIUser } from '../../client'
import { User } from './types'

export const userDeserializer = (user: APIUser): User => {
  const { name, email } = user.attributes
  return {
    name,
    email,
  }
}
