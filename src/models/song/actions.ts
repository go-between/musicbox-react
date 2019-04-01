import { ActionCreators, types } from './types'

const createSong: ActionCreators['CreateSong'] = (youtubeId, returnOK, returnERR) => ({
  type: types.CREATE_SONG,
  youtubeId,
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

const getSongs: ActionCreators['GetSongs'] = (returnOK, returnERR) => ({
  type: types.GET_SONGS,
  returnOK,
  returnERR,
})

const getSongOK: ActionCreators['GetSongOK'] = (returnOK, song) => ({
  type: returnOK,
  song,
})

const getSongsERR: ActionCreators['GetSongsERR'] = (returnERR, error) => ({
  type: returnERR,
  error,
})

export default {
  createSong,
  createSongOK,
  createSongERR,
  getSongs,
  getSongOK,
  getSongsERR,
}
