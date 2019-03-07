import { put, takeLatest } from 'redux-saga/effects'
import searchYoutube from 'youtube-api-v3-search'
import { ActionCreators, types } from './types'
import actions from './actions'

function* querySongs(
  action: ReturnType<ActionCreators['ChangeQuery']>,
) {
  const options = {
    q: action.query,
    part: 'snippet',
    type: 'video',
  }
  const data = yield searchYoutube('AIzaSyCaHX0cdxArGxQIAgaBXYVvnh5qAxFo7gI', options)
  console.log(data)
  const results = data.items.map(item => ({
    id: item.id.videoId,
    description: item.snippet.description,
    title: item.snippet.title,
    image: item.snippet.thumbnails.default.url,
  }))

  yield put(actions.getResultsOK(results))
}

export default function* saga() {
  yield takeLatest(types.CHANGE_QUERY, querySongs)
}
