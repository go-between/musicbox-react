type APIRoom = {
  id: string
  name: string
  currentSong: APISong
  currentSongStart: string
  enqueues: APIRoomQueue[]
  users: APIUser[]
}

type APIRoomQueue = {
  id: string
  order: number
  room: APIRoom
  song: APISong
  user: APIUser
}

type APISong = {
  id: string
  description: string
  durationInSeconds: number
  name: string
  youtubeId: string
}

type APIUser = {
  id: string
  email: string
}

export type APICreateRoomQueueResponse = {
  createRoomQueue: {
    roomQueue: APIRoomQueue,
    errors: string[]
  }
}

export type APICreateSongResponse = {
  createSong: {
    song: APISong,
    errors: string[]
  }
}

export type APIJoinRoomResponse = {
  joinRoom: {
    room: APIRoom
  }
}

export type APISongResponse = {
  songs: APISong[]
}

export type APIUserResponse = {
  users: APIUser[]
}

export type APIRoomQueueResponse = {
  roomQueues: APIRoomQueue[]
}

export type Options = {
  debug?: boolean
}
