import moment from 'moment'
import { APIJoinRoomResponse } from '../../graphql'
import { queuesDeserializer } from '../queue'
import { Room } from './types'

export const joinRoomDeserializer = (response: APIJoinRoomResponse): Room => {
  const { currentSong, currentSongStart, id, name, enqueues, users } = response.joinRoom.room
  return {
    currentSong,
    currentSongStart: moment(currentSongStart),
    id,
    name,
    queue: queuesDeserializer(enqueues),
    users,
  }
}
