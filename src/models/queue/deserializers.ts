import { APIRoomSong } from '../../graphql'
import { Queue } from './types'

export const queueDeserializer = (roomSong: APIRoomSong): Queue => {
  const  { id, order, song, user } = roomSong
  return {
    id,
    songId: song.id,
    order,
    name: song.name,
    user: user.email,
  }
}
