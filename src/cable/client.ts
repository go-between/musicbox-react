import {
  NowPlayingDeserializer, nowPlayingDeserializer,
  QueueDeserializer, queueDeserializer,
  UsersDeserializer, usersDeserializer
} from './deserializers'
import {
  channels,
  Action,
  Callback,
  Channel,
  DataMessage,
  Message,
  Options,
  Subscriptions,
} from './types'

class Client {
  private debug: boolean
  private emitter: any
  private subscriptions: { [k in Channel]: { [component: string]: Callback<any> } }
  private websocket: WebSocket

  constructor({ debug }: Options) {
    this.debug = debug
    this.subscriptions = {
      QueuesChannel: {},
      NowPlayingChannel: {},
      UsersChannel: {}
    }
  }

  public bind = (websocket: WebSocket, emitter: any) => {
    this.websocket = websocket
    this.emitter = emitter

    this.websocket.onerror = this.error
    this.websocket.onmessage = (event: MessageEvent) => {
      const actions = this.parse(event)
      if (!actions) {
        return;
      }
      return actions.map(a => this.emitter(a))
    }
  }

  public subscribeTo = (component: string) => ({
    nowPlaying: (roomId: string, callback: Callback<ReturnType<NowPlayingDeserializer>>) => {
      this.send(this.generateSubscription(channels.NOW_PLAYING_CHANNEL, { room_id: roomId }))
      this.log('subscription', channels.NOW_PLAYING_CHANNEL, component, callback)
      this.subscriptions[channels.NOW_PLAYING_CHANNEL][component] = callback
    },
    roomSong: (roomId: string, callback: Callback<Array<ReturnType<QueueDeserializer>>>) => {
      this.send(this.generateSubscription(channels.QUEUES_CHANNEL, { room_id: roomId }))
      this.log('subscription', channels.QUEUES_CHANNEL, component, callback)
      this.subscriptions[channels.QUEUES_CHANNEL][component] = callback
    },
    users: (roomId: string, callback: Callback<ReturnType<UsersDeserializer>>) => {
      this.send(this.generateSubscription(channels.USERS_CHANNEL, { room_id: roomId }))
      this.log('subscription', channels.USERS_CHANNEL, component, callback)
      this.subscriptions[channels.USERS_CHANNEL][component] = callback
    }
  })

  private error: (event: Event) => void = (event) => {
    this.log(event)
  }

  private generateSubscription: <T extends keyof Subscriptions>(
    channel: T, args: Subscriptions[T]
  ) => { command: 'subscribe', identifier: string } = (channel, args) => ({
    command: 'subscribe',
    identifier: JSON.stringify({ channel, ...args })
  })

  private log: (...args: any[]) => void = (...args) => {
    if (this.debug) {
      console.log(...args)
    }
  }

  private notify: (websocketMessage: DataMessage) => Action[] = (websocketMessage) => {
    this.log(websocketMessage)

    switch (websocketMessage.messageType) {
      case channels.QUEUES_CHANNEL:
        const queues = websocketMessage.message.data.roomSongs.map(queueDeserializer)
        return Object.values(this.subscriptions[websocketMessage.identifier.channel]).map((c) => c(queues))
      case channels.NOW_PLAYING_CHANNEL:
        const nowPlaying = nowPlayingDeserializer(websocketMessage.message.data.room)
        return Object.values(this.subscriptions[websocketMessage.identifier.channel]).map((c) => c(nowPlaying))
      case channels.USERS_CHANNEL:
        const users = usersDeserializer(websocketMessage.message.data.room)
        return Object.values(this.subscriptions[websocketMessage.identifier.channel]).map((c) => c(users))
    }
    return []
  }

  private parse: (event: MessageEvent) => Action[] | void = (event) => {
    const data = JSON.parse(event.data)
    if (data.identifier) {
      data.identifier = JSON.parse(data.identifier)
    }

    const parsedData: Message = data
    switch (parsedData.type) {
      case 'ping':
        this.log(parsedData.type, parsedData)
        return
      case 'confirm_subscription':
        this.log(parsedData.type, parsedData)
        return
      case undefined:
        this.log('notify', parsedData)
        // We must lift the channel identifier to the top-level of this
        // object in order to typehint in #notify successfully
        this.notify({ messageType: parsedData.identifier.channel, ...parsedData })
        return
    }
  }

  private send: any = (msg) => this.websocket.send(JSON.stringify(msg))
}

let singleton: Client
export const getSingleton = (): Client => singleton
export const setupSingleton = (
  options: Options,
  klass: typeof Client = Client,
) => (singleton = new klass(options))
