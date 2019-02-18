import { apply, put, takeLatest } from 'redux-saga/effects'
import { getSingleton, APIUser } from '../../client/'
import { userDeserializer } from './deserializers'
import { ActionCreators, types } from './types'
import actions from './actions'

function* getUsers(
  action: ReturnType<ActionCreators['GetUsers']>,
) {

  const api = getSingleton()
  const usersData = (yield apply(api, api.users.index, [])) as { data: APIUser[] }
  const users = usersData.data.map(userDeserializer)

  yield put(actions.getUsersOK(action.returnOK, users))
}

export default function* saga() {
  yield takeLatest(types.GET_USERS, getUsers)
}
