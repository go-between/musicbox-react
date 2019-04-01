import { GetSongOK, Song } from '../../models/song'

const GET_SONG_OK = 'app/Library/GET_SONG_OK'
const GET_SONGS_ERR = 'app/Library/GET_SONGS_ERR'

type Types = {
  GET_SONG_OK: typeof GET_SONG_OK
  GET_SONGS_ERR: typeof GET_SONGS_ERR
}

export const types: Types = {
  GET_SONG_OK,
  GET_SONGS_ERR,
}

export type Action =
  | ReturnType<GetSongOK<Types['GET_SONG_OK']>>

export type State = {
  songs: Song[]
  userId: string | null
}
