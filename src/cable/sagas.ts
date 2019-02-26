import { take, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { songDeserializer, actions } from '../models/song'

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
      const msg = JSON.parse(e.data)
      if (msg.type) {
        return
      }

      console.log(msg.message.songs)
      const songs = msg.message.songs.map(songDeserializer)
      return emitter(actions.receiveSongs(songs))
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
