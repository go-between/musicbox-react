import { take, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { getSingleton } from './client'
import { WS_HOST } from '../lib/constants'

function initWebsocket() {
  const ws = new WebSocket(WS_HOST)
  const client = getSingleton()
  return eventChannel(emitter => {
    ws.onopen = () => client.bind(ws, emitter)
    return () => console.log('Sign Off')
  })
}

export default function* saga() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
