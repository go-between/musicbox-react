const CREATE_SONG = 'models/song/CREATE_SONG'
const GET_SONGS = 'models/song/GET_SONGS'

type Types = {
  CREATE_SONG: typeof CREATE_SONG
  GET_SONGS: typeof GET_SONGS
}

export const types: Types = {
  CREATE_SONG,
  GET_SONGS,
}

type CreateSong = <OK, ERR>(youtubeId: Song['youtubeId'], returnOK: OK, returnERR: ERR) => {
  type: typeof CREATE_SONG,
  youtubeId: Song['youtubeId'],
  returnOK: OK,
  returnERR: ERR,
}

export type CreateSongOK<T> = (type: T, song: Song) => {
  type: T,
  song: Song,
}

export type CreateSongERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

type GetSongs = <OK, ERR>(returnOK: OK, returnERR: ERR) => {
  type: typeof GET_SONGS,
  returnOK: OK,
  returnERR: ERR,
}

export type GetSongOK<T> = (type: T, songs: Song) => {
  type: T,
  song: Song,
}

export type GetSongsERR<T> = (type: T, error: Error) => {
  type: T,
  error: Error,
}

export type ActionCreators = {
  CreateSong: CreateSong
  CreateSongOK: CreateSongOK<any>
  CreateSongERR: CreateSongERR<any>
  GetSongs: GetSongs,
  GetSongOK: GetSongOK<any>
  GetSongsERR: GetSongsERR<any>
}

export type Song = {
  id: string
  description: string
  durationInSeconds: number
  name: string
  youtubeId: string
}
