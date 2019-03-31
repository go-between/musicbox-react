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

export type APIRoomQueue = {
  data: {
    roomQueues: {
      song: Pick<APISong, 'id'>
      user: Pick<APIUser, 'email'>
    }
  }
}

export type APICreateSongResponse = {
  createSong: {
    song: APISong,
    errors: string[]
  }
}

export type APISongResponse = {
  songs: APISong[]
}

export type APIUserResponse = {
  users: APIUser[]
}

export type Options = {
  debug: boolean
}
