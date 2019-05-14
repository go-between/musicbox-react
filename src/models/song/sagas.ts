import { all, apply, call, put, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../graphql/'
import actions from './actions'
import { createSongDeserializer, songsDeserializer } from './deserializers'
import { ActionCreators, types } from './types'

function* createSong(
  action: ReturnType<ActionCreators['CreateSong']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.songs.create, [action.youtubeId])
  const song = createSongDeserializer(response)
  yield put(actions.getSongOK(action.options.returnOK, song))
  if (action.options.success) {
    yield call(action.options.success)
  }
}

function* removeSong(
  action: ReturnType<ActionCreators['RemoveSong']>,
) {
  const api = getSingleton()

  yield apply(api, api.songs.delete, [action.id])
  yield put(actions.removeSongOK(action.options.returnOK, action.id))
  if (action.options.success) {
    yield call(action.options.success)
  }
}

function* getSongs(
  action: ReturnType<ActionCreators['GetSongs']>,
) {
  const api = getSingleton()

  const response = yield apply(api, api.songs.library, [])
  const songs = songsDeserializer(response)
  yield all(songs.map(s => put(actions.getSongOK(action.returnOK, s))))
}

export default function* saga() {
  yield takeLatest(types.CREATE_SONG, createSong)
  yield takeLatest(types.GET_SONGS, getSongs)
  yield takeLatest(types.REMOVE_SONG, removeSong)
}
