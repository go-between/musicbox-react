import { GetUsersOK, User } from '../../models/user'
import { Song } from '../../models/song'

const GET_USERS_OK = 'app/Room/GET_USERS_OK'
const GET_USERS_ERR = 'app/Room/GET_USERS_ERR'
const RECEIVE_SONGS = 'app/Room/RECEIVE_SONGS'
const CHANGE_QUERY = 'app/Room/CHANGE_QUERY'
const GET_RESULTS_OK = 'app/Room/GET_RESULTS_OK'

type Types = {
  GET_USERS_OK: typeof GET_USERS_OK
  GET_USERS_ERR: typeof GET_USERS_ERR
  RECEIVE_SONGS: typeof RECEIVE_SONGS
  CHANGE_QUERY: typeof CHANGE_QUERY
  GET_RESULTS_OK: typeof GET_RESULTS_OK
}

export const types: Types = {
  GET_USERS_OK,
  GET_USERS_ERR,
  RECEIVE_SONGS,
  CHANGE_QUERY,
  GET_RESULTS_OK
}

type ReceiveSongs = (songs: Song[]) => {
  type: typeof RECEIVE_SONGS
  songs: Song[]
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
  | ReturnType<GetUsersOK<Types['GET_USERS_OK']>>
  | ReturnType<ReceiveSongs>
  | ReturnType<ChangeQuery>
  | ReturnType<GetResultsOK>

export type ActionCreators = {
  ReceiveSongs: ReceiveSongs
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
  users: User[]
  songs: Song[]
  query: string
  results: YoutubeResult[]
}
