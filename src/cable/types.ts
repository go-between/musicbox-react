// Channels
export const QUEUES_CHANNEL = 'QueuesChannel'

export type Channel =
  | typeof QUEUES_CHANNEL

export type Identifier = {
  channel: typeof QUEUES_CHANNEL
}

export type Ping = {
  identifier: undefined
  message: number
  type: 'ping'
}

// Message Types
export type ConfirmSubscription = {
  identifier: Identifier
  type: 'confirm_subscription'
}

export type SystemMessage =
  | Ping
  | ConfirmSubscription

export type SongMessage = {
  identifier: Identifier
  message: {
    data: any
  }
  type: undefined
}

export type DataMessage = SongMessage

export type Message =
  | SystemMessage
  | DataMessage

// Data
export type Subscriptions = {
  [QUEUES_CHANNEL]: { room_id: string }
}

// Utilities
export type Callback<T> = (payload: T) => Action
export type Action = { type: string }
export type Options = { debug: boolean }
