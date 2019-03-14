import { ActionCreators, types } from './types'

const createSong: ActionCreators['CreateSong'] = (song, returnOK, returnERR) => ({
  type: types.CREATE_SONG,
  song,
  returnOK,
  returnERR,
})

const createSongOK: ActionCreators['CreateSongOK'] = (returnOK, song) => ({
  type: returnOK,
  song,
})

const createSongERR: ActionCreators['CreateSongERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  createSong,
  createSongOK,
  createSongERR
}
