import graphql from 'graphql.js'
import { Options } from './types'

export default class Client {
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
    `)
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

  private baseClient: any
  private fragments: any = {
    song: 'on Song { id, description, durationInSeconds, name, youtubeId }',
    user: 'on User { id, email } ',
  }

  constructor(host: string, authorizationCode: string | null, options: Options) {
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
