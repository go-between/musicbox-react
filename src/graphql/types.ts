export type APIRoom = {
  id: string
  name: string
  currentSong: APISong
  currentSongStart: string
  enqueues: APIRoomSong[]
  users: APIUser[]
}

export type APIRoomSong = {
  id: string
  room: APIRoom
  song: APISong
  user: APIUser
}

export type APISong = {
  id: string
  description: string
  durationInSeconds: number
  name: string
  youtubeId: string
}

export type APIUser = {
  id: string
  email: string
}

export type APICreateRoomSongResponse = {
  createRoomSong: {
    roomSong: APIRoomSong,
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

export type APIOrderRoomSongsResponse = {
  orderRoomSongs: {
    errors: string[]
  }
}

export type APIRoomResponse = {
  rooms: APIRoom[]
}

export type APIRoomSongResponse = {
  roomSongs: APIRoomSong[]
}

export type APISongResponse = {
  songs: APISong[]
}

export type APIUserResponse = {
  users: APIUser[]
}

export type Options = {
  debug?: boolean
}
