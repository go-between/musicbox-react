import { APISong } from '../../client'
import { Song } from './types'

export const songSerializer = (song: Song): APISong => {
  return {
    type: 'songs',
    attributes: {
      youtubeId: song.youtubeId
    }
  }
}

export const withRoom = (id: string, song: APISong): APISong => {
  return {
    ...song,
    relationships: {
      room: {
        data: {
            type: 'rooms',
            id,
        }
      }
    }
  }
}
