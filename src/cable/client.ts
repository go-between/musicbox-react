import { NowPlayingDeserializer, nowPlayingDeserializer, UsersDeserializer, usersDeserializer } from './deserializers'
import {
  Action,
  Callback,
  Channel,
  DataMessage, Message, NOW_PLAYING_CHANNEL, Options, QUEUES_CHANNEL, Subscriptions, USERS_CHANNEL } from './types'
import { Queue, queuesDeserializer } from 'models/queue'

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
      this.send(this.generateSubscription(NOW_PLAYING_CHANNEL, { room_id: roomId }))
      this.log('subscription', NOW_PLAYING_CHANNEL, component, callback)
      this.subscriptions[NOW_PLAYING_CHANNEL][component] = callback
    },
    roomSong: (roomId: string, callback: Callback<Queue[]>) => {
      this.send(this.generateSubscription(QUEUES_CHANNEL, { room_id: roomId }))
      this.log('subscription', QUEUES_CHANNEL, component, callback)
      this.subscriptions[QUEUES_CHANNEL][component] = callback
    },
    users: (roomId: string, callback: Callback<ReturnType<UsersDeserializer>>) => {
      this.send(this.generateSubscription(USERS_CHANNEL, { room_id: roomId }))
      this.log('subscription', USERS_CHANNEL, component, callback)
      this.subscriptions[USERS_CHANNEL][component] = callback
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

  private notify: (data: DataMessage) => Action[] = (data) => {
    this.log(data)

    switch (data.identifier.channel) {
      case 'QueuesChannel':
        const queues = queuesDeserializer(data.message.data.roomSongs)
        return Object.values(this.subscriptions[data.identifier.channel]).map((c) => c(queues))
      case 'NowPlayingChannel':
        const nowPlaying = nowPlayingDeserializer(data.message.data.room)
        return Object.values(this.subscriptions[data.identifier.channel]).map((c) => c(nowPlaying))
      case 'UsersChannel':
        const users = usersDeserializer(data.message.data.room)
        return Object.values(this.subscriptions[data.identifier.channel]).map((c) => c(users))
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
        return this.notify(parsedData)
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
