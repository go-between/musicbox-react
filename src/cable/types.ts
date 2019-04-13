// Channels
export const QUEUES_CHANNEL = 'QueuesChannel'
export const NOW_PLAYING_CHANNEL = 'NowPlayingChannel'
export const USERS_CHANNEL = 'UsersChannel'

export type Channel =
  | typeof QUEUES_CHANNEL
  | typeof NOW_PLAYING_CHANNEL
  | typeof USERS_CHANNEL

export type Identifier = {
  channel: Channel
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

export type DataMessage = {
  identifier: Identifier
  message: {
    data: any
  }
  type: undefined
}

export type Message =
  | SystemMessage
  | DataMessage

// Data
export type Subscriptions = {
  [QUEUES_CHANNEL]: { room_id: string }
  [NOW_PLAYING_CHANNEL]: { room_id: string }
  [USERS_CHANNEL]: { room_id: string }
}

// Utilities
export type Callback<T> = (payload: T) => Action
export type Action = { type: string }
export type Options = { debug: boolean }
