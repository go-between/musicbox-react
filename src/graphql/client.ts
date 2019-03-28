import graphql from 'graphql.js'

export default class Client {
  songs: any = {
    create: (youtubeId) => this.baseClient.mutate(`
      (@autodeclare) {
        createSong(input: { youtubeId: $youtubeId }) {
          song {
            id
            name
            youtubeId
          }
          errors
        }
      }
    `)({ youtubeId })
  }

  private baseClient: any

  constructor(host: string, authorizationCode: string) {
    this.baseClient = graphql(host, { debug: true })
  }
}
