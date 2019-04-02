import { put, takeLatest, select } from 'redux-saga/effects'
import { getSingleton, setupSingleton } from '../../graphql'
import { State as RootState } from '../../reducers'
import actions from './actions'
import { ActionCreators, types } from './types'

function* signIn(action: ReturnType<ActionCreators['SignIn']>) {
  const { email, password } = yield select((state: RootState) => state.auth)

  const url = `${process.env.API_HOST}/api/v1/oauth/token`
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)
  formData.append('grant_type', 'password')

  const response = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  })

  if (response.status !== 200) {
    yield put(actions.changeField('error', 'Invalid email or password'))
  } else {
    const body = yield response.json()
    const graphClient = getSingleton()
    setupSingleton(graphClient.host, body.access_token, graphClient.options)
    yield put(actions.changeField('token', body.access_token))
  }
}

export default function* saga() {
  yield takeLatest(types.SIGN_IN, signIn)
}
