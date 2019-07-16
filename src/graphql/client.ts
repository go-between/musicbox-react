import graphql from 'graphql.js'
import * as Types from './types'

type Rooms = {
  index: () => Promise<Types.APIRoomResponse>
  joinRoom: (roomId: string) => Promise<Types.APIJoinRoomResponse>
}

type OrderedSong = { songId: string; roomSongId: string }
type RoomSongs = {
  index: (options: {roomId: string, forUser?: boolean, historical?: boolean}) => Promise<Types.APIRoomSongResponse>
  orderRoomSongs: (roomId: string, orderedSongs: OrderedSong[]) => Promise<Types.APIOrderRoomSongsResponse>
  delete: (id: string) => Promise<Types.APIDeleteRoomSongResponse>
}

type Songs = {
  create: (youtubeId: string) => Promise<Types.APICreateSongResponse>
  library: () => Promise<Types.APISongResponse>
  delete: (songId: string) => Promise<Types.APIDeleteSongUserResponse>
}

type Users = {
  inRoom: (roomId: string) => Promise<Types.APIUserResponse>
}

export default class Client {
  rooms: Rooms = {
    index: () => this.baseClient.query(`
      {
        rooms {
          ...room
        }
      }
    `)(),

    joinRoom: (roomId) => this.baseClient.mutate(`
      (@autodeclare) {
        joinRoom(input: { roomId: $roomId }) {
          room {
            ...room
          }
          errors
        }
      }
    `)({roomId})
  }

  roomSongs: RoomSongs = {
    index: ({roomId, forUser = false, historical = false}) => this.baseClient.query(`
      (@autodeclare) {
        roomSongs(roomId: $roomId, forUser: $forUser, historical: $historical) {
          ...roomSong
        }
      }
    `)({roomId, forUser, historical}),

    delete: (id) => this.baseClient.mutate(`
      (@autodeclare) {
        deleteRoomSong(input: { id: $id }) {
          errors
        }
      }
    `)({id}),

    orderRoomSongs: (roomId, orderedSongs) => this.baseClient.mutate(`
      ($roomId: ID!, $orderedSongs: [OrderedSongObject!]!) {
        orderRoomSongs(input: {
          roomId: $roomId
          orderedSongs: $orderedSongs
        }) {
          errors
        }
      }
    `)({ roomId, orderedSongs })
  }

  songs: Songs = {
    create: (youtubeId) => this.baseClient.mutate(`
      (@autodeclare) {
        createSong(input: { youtubeId: $youtubeId }) {
          song {
            ...song
          }
          errors
        }
      }
    `)({ youtubeId }),

    delete: (songId) => this.baseClient.mutate(`
      (@autodeclare) {
        deleteSongUser(input: { songId: $songId }) {
          errors
        }
      }
    `)({songId}),

    library: () => this.baseClient.query(`
      {
        songs {
          ...song
        }
      }
    `)()
  }

  users: Users = {
    inRoom: (roomId) => this.baseClient.query(`
      {
        users {
          ...user
        }
      }
    `)({ roomId })
  }

  public host: string
  public options: Types.Options = {}

  private baseClient: any
  private fragments: any = {
    enqueue: 'on Enqueue { id, song { ...song }, user { ...user } }',
    roomSong: 'on RoomSong { id, song { ...song }, room { ...room }, user { ...user } }',
    room: 'on Room { currentSong { ...song }, currentSongStart, id, name, enqueues { ...enqueue }, users { ...user } }',
    song: 'on Song { id, description, durationInSeconds, name, youtubeId }',
    user: 'on User { id, email, name } ',
  }

  constructor(host: string, authorizationCode: string | null, options: Types.Options) {
    this.host = host
    this.options = options

    const graphQLOptions = {
      debug: options.debug,
      headers: {},
      fragments: this.fragments,
    }

    if (authorizationCode !== null) {
      graphQLOptions.headers = {
        ...graphQLOptions.headers,
        Authorization: `Bearer ${authorizationCode}`,
      }
    }
    this.baseClient = graphql(host, graphQLOptions)
  }
}
