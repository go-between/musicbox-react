import { Action, Callback, Channel, DataMessage, Message, Options, Payloads, QUEUES_CHANNEL } from './types'
import { songDeserializer } from '../models/song'

class Subscription {
  private channels: Channel[] = [QUEUES_CHANNEL]
  private debug: boolean
  private subscriptions: { [k in Channel]: { [component: string]: Callback<Channel> } }

  constructor({ debug }: Options) {
    this.debug = debug
    this.subscriptions = {
      QueuesChannel: {}
    }
  }

  public error: (event: Event) => void = (event) => {
    this.log(event)
  }

  public generateSubscriptions: () => string[] = () => (
    this.channels.map(s => JSON.stringify({
      command: 'subscribe',
      identifier: JSON.stringify({ channel: s })
    }))
  )

  public parse: (event: MessageEvent) => Action[] | void = (event) => {
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

  public signOff: () => void = () => {
    console.log('Disconnected')
  }

  public subscribe: (
    channel: Channel,
    id: string,
    callback: (p: Payloads) => Action
  ) => void = (channel, id, callback) => {
    this.log('subscription', channel, id, callback)
    this.subscriptions[channel][id] = callback
  }

  private log: (...args: any[]) => void = (...args) => {
    if (this.debug) {
      console.log(...args)
    }
  }

  private notify: (data: DataMessage) => Action[] = (data) => {
    if (data.identifier.channel === 'QueuesChannel') {
      const payload = data.message.data.map(songDeserializer)
      this.log(this.subscriptions)
      return Object.values(this.subscriptions[data.identifier.channel]).map((c) => c(payload))
    }
    return []
  }
}

let singleton: Subscription
export const getSingleton = (): Subscription => singleton
export const setupSingleton = (
  options: Options,
  klass: typeof Subscription = Subscription,
) => (singleton = new klass(options))
