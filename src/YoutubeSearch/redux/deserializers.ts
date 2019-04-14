import { Result, YoutubeResult } from './types'

export const youtubeDeserializer = (result: Result): YoutubeResult => ({
  id: result.id.videoId,
  description: result.snippet.description,
  title: result.snippet.title,
  image: result.snippet.thumbnails.default.url,
})
