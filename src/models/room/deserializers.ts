import moment from 'moment'
import { APIRoom } from '../../graphql'
import { queueDeserializer } from '../queue'
import { Room } from './types'

export const roomDeserializer = (response: APIRoom): Room => {
  const { currentSong, currentSongStart, id, name, enqueues, users } = response
  return {
    currentSong,
    currentSongStart: moment(currentSongStart),
    id,
    name,
    queue: enqueues.map(queueDeserializer),
    users,
  }
}
