const RECEIVE_SONGS = 'app/Room/RECEIVE_SONGS'
const CHANGE_QUERY = 'app/Room/CHANGE_QUERY'
const GET_RESULTS_OK = 'app/Room/GET_RESULTS_OK'

type Types = {
  RECEIVE_SONGS: typeof RECEIVE_SONGS
  CHANGE_QUERY: typeof CHANGE_QUERY
  GET_RESULTS_OK: typeof GET_RESULTS_OK
}

export const types: Types = {
  RECEIVE_SONGS,
  CHANGE_QUERY,
  GET_RESULTS_OK
}

type ChangeQuery = (query: string) => {
  type: typeof CHANGE_QUERY
  query: string
}

type GetResultsOK = (results: YoutubeResult[]) => {
  type: typeof GET_RESULTS_OK,
  results: YoutubeResult[]
}

export type Action =
  | ReturnType<ChangeQuery>
  | ReturnType<GetResultsOK>

export type ActionCreators = {
  ChangeQuery: ChangeQuery
  GetResultsOK: GetResultsOK
}

export type YoutubeResult = {
  description: string
  id: string
  image: string
  title: string
}

export type State = {
  query: string
  results: YoutubeResult[]
}
