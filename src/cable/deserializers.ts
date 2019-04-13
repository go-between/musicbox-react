import moment from 'moment'
import { APIRoom } from 'graphql'
import { Room } from 'models/room'

export type NowPlayingDeserializer = (
  message: Pick<APIRoom, 'currentSong' | 'currentSongStart'>
) => Pick<Room, 'currentSong' | 'currentSongStart'>
export const nowPlayingDeserializer: NowPlayingDeserializer = (message) => {
  const { currentSong, currentSongStart } = message
  return {
    currentSong,
    currentSongStart: moment(currentSongStart),
  }
}

export type UsersDeserializer = (
  message: Pick<APIRoom, 'users'>
) => Pick<Room, 'users'>
export const usersDeserializer: UsersDeserializer = (message) => {
  const { users } = message

  return { users }
}
