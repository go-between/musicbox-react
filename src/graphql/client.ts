import graphql from 'graphql.js'
import { Options } from './types'

export default class Client {
  rooms: any = {
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

  roomQueues: any = {
    create: (roomId, songId, order) => this.baseClient.mutate(`
      (@autodeclare) {
        createRoomQueue(input: {roomId: $roomId, songId: $songId, order: $order}) {
          roomQueue {
            ...roomQueue
          }
          errors
        }
      }
    `)({roomId, songId, order}),

    index: (roomId) => this.baseClient.mutate(`
      (@autodeclare) {
        roomQueues(roomId: $roomId) {
          ...roomQueue
        }
      }
    `)({roomId}),
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
    roomQueue: 'on RoomQueue { id, order, song { ...song }, room { ...room }, user { ...user } }',
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
