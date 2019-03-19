import { apply, takeLatest } from 'redux-saga/effects'
import { getSingleton } from '../../client/'
import { songSerializer, withRoom } from './serializers'
import { ActionCreators, types } from './types'

function* createSong(
  action: ReturnType<ActionCreators['CreateSong']>,
) {

  const roomId = '66cc51aa-83e0-4880-a84e-b69d4a5507ed'
  const api = getSingleton()
  const data = withRoom(roomId, songSerializer(action.song))
  yield apply(api, api.rooms.id(roomId).song.create, [{data}])
  // const song = songData.data.map(userDeserializer)
  // yield put(actions.createSongOK(action.returnOK, song))
}

export default function* saga() {
  yield takeLatest(types.CREATE_SONG, createSong)
}
