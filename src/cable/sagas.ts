import { take, call, put, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { getSingleton } from './client'
import { WS_HOST } from '../lib/constants'
import { State } from 'reducers'

function* initWebsocket(token: string) {
  if (!token) {
    return
  }

  const formData = new URLSearchParams()
  formData.append('token', token)

  const ws = new WebSocket(`${WS_HOST}?${formData.toString()}`)
  const client = getSingleton()
  return eventChannel(emitter => {
    ws.onopen = () => client.bind(ws, emitter)
    return () => console.log('Sign Off')
  })
}

export default function* saga() {
  let token = ''
  while (!token) {
    token = (yield select((s: State) => s.auth.token)) as string
  }

  const channel = yield call(initWebsocket, token)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
