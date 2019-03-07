declare module 'youtube-api-v3-search' {
  export type Options = {
    q: string
    part: 'snippet'
    type: 'video' | 'channel' | 'playlist'
  }

  export type Result = {
    kind: "youtube#searchResult",
    etag: string,
    id: {
      kind: string,
      videoId: string,
      channelId: string,
      playlistId: string
    },
    snippet: {
      publishedAt: string,
      channelId: string,
      title: string,
      description: string,
      thumbnails: {
        [k: string]: {
          url: string,
          width: number,
          height: number
        }
      },
      channelTitle: string,
      liveBroadcastContent: string
    }
  }
  export type Results = {
    kind: "youtube#searchListResponse"
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
      totalResults: number
      resultsPerPage: number
    },
    items: Result[]
  }
  export default (url: string, options: Options) => new Promise<Results>

}
