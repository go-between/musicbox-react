import { APICreateRoomQueueResponse, APIRoomQueueResponse } from '../../graphql'
import { Queue } from './types'

export const createQueueDeserializer = (response: APICreateRoomQueueResponse): Queue => {
  const { roomQueue: {id, order, room, song, user} } = response.createRoomQueue
  return {
    id,
    songId: song.id,
    roomId: room.id,
    order,
    name: song.name,
    user: user.email,
  }
}

export const queuesDeserializer = (response: APIRoomQueueResponse): Queue[] => {
  return response.roomQueues.map(roomQueue => {
    const  { id, order, song, user } = roomQueue
    return {
      id,
      songId: song.id,
      order,
      name: song.name,
      user: user.email,
    }
  })
}
