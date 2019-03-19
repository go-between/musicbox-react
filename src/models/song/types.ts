const CREATE_SONG = 'models/user/CREATE_SONG'

type Types = {
  CREATE_SONG: typeof CREATE_SONG
}

export const types: Types = {
  CREATE_SONG
}

type CreateSong = <OK, ERR>(song: Song, returnOK: OK, returnERR: ERR) => {
  type: typeof CREATE_SONG,
  song: Song,
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

export type ActionCreators = {
  CreateSong: CreateSong
  CreateSongOK: CreateSongOK<any>
  CreateSongERR: CreateSongERR<any>
}

export type Song = {
  name: string
  url: string
}
