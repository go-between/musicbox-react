import { delay, put, takeLatest } from 'redux-saga/effects'
import { YOUTUBE_KEY, YOUTUBE_API } from '../../lib/constants'
import { ActionCreators, Options, Results, types } from './types'
import actions from './actions'
import { youtubeDeserializer } from './deserializers'

function youtubeAPI(options: Options): Promise<Response> {
  const formData = new URLSearchParams()
  formData.append('q', options.q)
  formData.append('part', 'snippet')
  formData.append('type', 'video')
  formData.append('key', YOUTUBE_KEY)

  return fetch(`${YOUTUBE_API}?${formData.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

function* querySongs(
  action: ReturnType<ActionCreators['ChangeQuery']>,
) {

  if (!action.query) {
    return yield put(actions.getResultsOK([]))
  }

  yield delay(250)

  const options: Options = {
    q: action.query,
    part: 'snippet',
    type: 'video'
  }
  const response = yield youtubeAPI(options)
  const data = (yield response.json()) as Results
  const results = data.items.map(youtubeDeserializer)

  yield put(actions.getResultsOK(results))
}

export default function* saga() {
  yield takeLatest(types.CHANGE_QUERY, querySongs)
}
