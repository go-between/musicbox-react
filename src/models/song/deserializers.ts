import { APICreateSongResponse, APISongResponse } from '../../graphql'
import { Song } from './types'

export const createSongDeserializer = (response: APICreateSongResponse): Song => {
  return response.createSong.song
}

export const songsDeserializer = (response: APISongResponse): Song[] => {
  return response.songs.map(s => s)
}
