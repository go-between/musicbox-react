import { take, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { getSingleton } from './client'
import { WS_HOST } from '../lib/constants'

function initWebsocket() {
  const client = getSingleton()
  const ws = new WebSocket(WS_HOST)
  return eventChannel(emitter => {
    ws.onopen = () => client.generateSubscriptions().forEach(s => ws.send(s))
    ws.onerror = client.error
    ws.onmessage = (event: MessageEvent) => {
      const actions = client.parse(event)
      if (!actions) {
        return;
      }
      return actions.map(a => emitter(a))
    }

    return client.signOff
  })
}
export default function* saga() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
