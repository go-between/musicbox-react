const RECEIVE_SONGS = 'models/song/RECEIVE_SONGS'

type Types = {
  RECEIVE_SONGS: typeof RECEIVE_SONGS
}

export const types: Types = {
  RECEIVE_SONGS
}

export type Song = {
  name: string
  url: string
}

type ReceiveSongs = (songs: Song[]) => {
  type: typeof RECEIVE_SONGS
  songs: Song[]
}

export type ActionCreators = {
  ReceiveSongs: ReceiveSongs
}

export type Action = ReturnType<ReceiveSongs>
