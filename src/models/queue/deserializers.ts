import { APIRoomSong } from '../../graphql'
import { Queue } from './types'

export const queueDeserializer = (roomSong: APIRoomSong): Queue => {
  const  { id, song, user } = roomSong
  return {
    id,
    song,
    user,
  }
}
