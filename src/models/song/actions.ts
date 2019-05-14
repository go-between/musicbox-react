import { ActionCreators, types } from './types'

const createSong: ActionCreators['CreateSong'] = (youtubeId, options) => ({
  type: types.CREATE_SONG,
  youtubeId,
  options,
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

const removeSong: ActionCreators['RemoveSong'] = (id, options) => ({
  type: types.REMOVE_SONG,
  id,
  options,
})

const removeSongOK: ActionCreators['RemoveSongOK'] = (returnOK, id) => ({
  type: returnOK,
  id,
})

export default {
  createSong,
  createSongOK,
  createSongERR,
  getSongs,
  getSongOK,
  getSongsERR,
  removeSong,
  removeSongOK,
}
