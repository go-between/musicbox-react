import { take, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
function initWebsocket() {

  return eventChannel(emitter => {
    const ws = new WebSocket('ws://localhost:3000/cable')
    ws.onopen = () => {
      console.log('opening...')
      ws.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({ channel: 'SongsChannel' })
        })
      )
    }

    ws.onerror = (error) => {
      console.log('WebSocket error ' + error)
      console.dir(error)
    }

    ws.onmessage = (e) => {
      let msg = null

      try {
        msg = JSON.parse(e.data)
      } catch (e) {
        console.error(`Error parsing : ${e.data}`)
      }

      if (msg) {
        console.log('Message', msg)
      }

      return emitter({ type: 'SOCKET' })
    }
    // unsubscribe function
    return () => {
      console.log('Socket off')
    }
  })
}
export default function* saga() {
  const channel = yield call(initWebsocket)
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}
