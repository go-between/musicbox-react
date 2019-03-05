import { ActionCreators, types } from './types'

const receiveSongs: ActionCreators['ReceiveSongs'] = (songs) => ({
  type: types.RECEIVE_SONGS,
  songs
})

const changeQuery: ActionCreators['ChangeQuery'] = (query) => ({
  type: types.CHANGE_QUERY,
  query
})

const getResultsOK: ActionCreators['GetResultsOK'] = (results) => ({
  type: types.GET_RESULTS_OK,
  results
})

export default {
  receiveSongs,
  changeQuery,
  getResultsOK
}
