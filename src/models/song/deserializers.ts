import { APISong } from '../../client'
import { Song } from './types'

export const songDeserializer = (song: APISong): Song => {
  const { youtubeId } = song.attributes
  return {
    youtubeId,
  }
}
