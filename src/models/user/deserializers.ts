import { APIUser } from '../../Client/types'
import { User } from './types'

export default (user: APIUser): User => {
  const { name, email } = user.attributes
  return {
    name,
    email,
  }
}
