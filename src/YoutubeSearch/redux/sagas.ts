import { delay, put, takeLatest } from 'redux-saga/effects'
import searchYoutube, { Options, Results } from 'youtube-api-v3-search'
import { YOUTUBE_KEY } from '../../lib/constants'
import { ActionCreators, types } from './types'
import actions from './actions'
import { youtubeDeserializer } from './deserializers'
function* querySongs(
  action: ReturnType<ActionCreators['ChangeQuery']>,
) {
  yield delay(250)

  const options: Options = {
    q: action.query,
    part: 'snippet',
    type: 'video',
  }
  const data = (yield searchYoutube(YOUTUBE_KEY, options)) as Results
  const results = data.items.map(youtubeDeserializer)

  yield put(actions.getResultsOK(results))
}

export default function* saga() {
  yield takeLatest(types.CHANGE_QUERY, querySongs)
}
