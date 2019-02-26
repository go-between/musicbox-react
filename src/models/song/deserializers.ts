import { APISong } from '../../client'
import { Song } from './types'

export const songDeserializer = (song: APISong): Song => {
  const { name, url } = song
  return {
    name,
    url,
  }
}
