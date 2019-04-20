import graphql from 'graphql.js'
import { Options } from './types'

export default class Client {
  rooms: any = {
    index: () => this.baseClient.query(`
      {
        rooms {
          ...room
        }
      }
    `)(),

    joinRoom: (roomId) => this.baseClient.mutate(`
      (@autodeclare) {
        joinRoom(input: {roomId: $roomId}) {
          room {
            ...room
          }
          errors
        }
      }
    `)({roomId})
  }

  roomSongs: any = {
    create: (roomId, songId, order) => this.baseClient.mutate(`
      (@autodeclare) {
        createRoomSong(input: {roomId: $roomId, songId: $songId, order: $order}) {
          roomSong {
            ...roomSong
          }
          errors
        }
      }
    `)({roomId, songId, order}),

    index: (roomId, forUser) => this.baseClient.query(`
      (@autodeclare) {
        roomSongs(roomId: $roomId, forUser: $forUser) {
          ...roomSong
        }
      }
    `)({roomId, forUser}),
  }

  songs: any = {
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

    library: () => this.baseClient.query(`
      {
        songs {
          ...song
        }
      }
    `)()
  }

  users: any = {
    inRoom: (roomId) => this.baseClient.query(`
      {
        users {
          ...user
        }
      }
    `)({ roomId })
  }

  public host: string
  public options: Options = {}

  private baseClient: any
  private fragments: any = {
    enqueue: 'on Enqueue { order, song { ...song }, user { ...user } }',
    roomSong: 'on RoomSong { id, order, song { ...song }, room { ...room }, user { ...user } }',
    room: 'on Room { currentSong { ...song }, currentSongStart, id, name, enqueues { ...enqueue }, users { ...user } }',
    song: 'on Song { id, description, durationInSeconds, name, youtubeId }',
    user: 'on User { id, email } ',
  }

  constructor(host: string, authorizationCode: string | null, options: Options) {
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
