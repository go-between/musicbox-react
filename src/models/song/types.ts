const CREATE_SONG = 'models/song/CREATE_SONG'
const GET_SONGS   = 'models/song/GET_SONGS'
const REMOVE_SONG = 'models/song/REMOVE_SONG'

type Types = {
  CREATE_SONG: typeof CREATE_SONG
  GET_SONGS: typeof GET_SONGS
  REMOVE_SONG: typeof REMOVE_SONG
}

export const types: Types = {
  CREATE_SONG,
  GET_SONGS,
  REMOVE_SONG,
}

type Options<OK, ERR> = {
  returnOK: OK
  returnERR?: ERR
  success?: () => { type: string }
}

type CreateSong = <OK, ERR>(youtubeId: Song['youtubeId'], options: Options<OK, ERR>) => {
  type: typeof CREATE_SONG,
  youtubeId: Song['youtubeId'],
  options: Options<OK, ERR>
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

export type RemoveSong = <OK, ERR>(id: string, options: Options<OK, ERR>) => {
  type: typeof REMOVE_SONG
  id: string
  options: Options<OK, ERR>
}

export type RemoveSongOK<T> = (type: T, id: string) => {
  type: T,
  id: string,
}

export type ActionCreators = {
  CreateSong: CreateSong
  CreateSongOK: CreateSongOK<any>
  CreateSongERR: CreateSongERR<any>
  GetSongs: GetSongs,
  GetSongOK: GetSongOK<any>
  GetSongsERR: GetSongsERR<any>
  RemoveSong: RemoveSong
  RemoveSongOK: RemoveSongOK<any>
}

export type Song = {
  id: string
  description: string
  durationInSeconds: number
  name: string
  youtubeId: string
}
