import { APIRoom, APIRoomSong } from 'graphql'

// Channels
export const QUEUES_CHANNEL = 'QueuesChannel'
export const NOW_PLAYING_CHANNEL = 'NowPlayingChannel'
export const USERS_CHANNEL = 'UsersChannel'

export type Channel =
  | typeof QUEUES_CHANNEL
  | typeof NOW_PLAYING_CHANNEL
  | typeof USERS_CHANNEL

export type Channels = {
  QUEUES_CHANNEL: typeof QUEUES_CHANNEL
  NOW_PLAYING_CHANNEL: typeof NOW_PLAYING_CHANNEL
  USERS_CHANNEL: typeof USERS_CHANNEL
}

export const channels: Channels = {
  QUEUES_CHANNEL,
  NOW_PLAYING_CHANNEL,
  USERS_CHANNEL,
}

type Ping = {
  identifier: undefined
  message: number
  type: 'ping'
}

// Message Types
type ConfirmSubscription = {
  identifier: { channel: Channel }
  type: 'confirm_subscription'
}

type SystemMessage =
  | Ping
  | ConfirmSubscription

type WebsocketMessage<T, K> = {
  messageType: T
  identifier: {
    channel: T
  }
  message: {
    data: K
  }
  type: undefined
}

export type DataMessage =
  | WebsocketMessage<typeof NOW_PLAYING_CHANNEL, { room: Pick<APIRoom, 'currentSong' | 'currentSongStart'> }>
  | WebsocketMessage<typeof QUEUES_CHANNEL, { roomSongs: APIRoomSong[] }>
  | WebsocketMessage<typeof USERS_CHANNEL, { room: Pick<APIRoom, 'users'> }>

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

// State, Actions

export const CONNECT = 'cable/CONNECT'
export const CONNECT_OK = 'cable/CONNECT_OK'

type Types = {
  CONNECT: typeof CONNECT
  CONNECT_OK: typeof CONNECT_OK
}

export const types: Types = {
  CONNECT,
  CONNECT_OK,
}

type Connect = () => {
  type: typeof CONNECT
}

type ConnectOK = () => {
  type: typeof CONNECT_OK
}

export type ActionCreators = {
  Connect: Connect,
  ConnectOK: ConnectOK
}

export type State = {
  connected: boolean
}
