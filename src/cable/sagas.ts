import { take, call, put, select, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { getSingleton } from './client'
import { WS_HOST } from '../lib/constants'
import { State } from 'reducers'
import actions from './actions'
import { types } from './types'

function* initWebsocket() {
  const token = (yield select((s: State) => s.auth.token)) as string

  const formData = new URLSearchParams()
  formData.append('token', token)

  const ws = new WebSocket(`${WS_HOST}?${formData.toString()}`)
  const client = getSingleton()
  const channel = yield new Promise((resolve, reject) => {
    const evChannel = eventChannel(emitter => {
      ws.onopen = () => {
        client.bind(ws, emitter)
        resolve(evChannel)
      }
      return () => console.log('Sign Off')
    })
  })

  yield put(actions.connectOK())

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export default function* saga() {
  yield takeLatest(types.CONNECT, initWebsocket)
}
