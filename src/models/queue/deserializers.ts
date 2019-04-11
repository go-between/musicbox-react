import { APICreateRoomSongResponse, APIRoomSongResponse } from '../../graphql'
import { Queue } from './types'

export const createQueueDeserializer = (response: APICreateRoomSongResponse): Queue => {
  const { roomSong: {id, order, room, song, user} } = response.createRoomSong
  return {
    id,
    songId: song.id,
    roomId: room.id,
    order,
    name: song.name,
    user: user.email,
  }
}

export const queuesDeserializer = (roomSongs: APIRoomSongResponse['roomSongs']): Queue[] => {
  return roomSongs.map(roomSong => {
    const  { id, order, song, user } = roomSong
    return {
      id,
      songId: song.id,
      order,
      name: song.name,
      user: user.email,
    }
  })
}
