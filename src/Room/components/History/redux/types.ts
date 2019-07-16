import { GetHistoryOK, Queue } from 'models/queue'

const GET_HISTORY_OK = 'app/Room/UserSong/GET_HISTORY_OK'
const GET_HISTORY_ERR = 'app/Room/UserSong/GET_HISTORY_ERR'

type Types = {
  GET_HISTORY_OK: typeof GET_HISTORY_OK
  GET_HISTORY_ERR: typeof GET_HISTORY_ERR
}

export const types: Types = {
  GET_HISTORY_OK,
  GET_HISTORY_ERR,
}

export type Action =
  | ReturnType<GetHistoryOK<Types['GET_HISTORY_OK']>>

type History = Pick<Queue, 'id' | 'song'>

export type State = {
  historicalSongs: History[]
}
