import { ActionCreators, types } from './types'

const changeField: ActionCreators['ChangeField'] = (key, value) => ({
  type: types.CHANGE_FIELD,
  key,
  value,
})

const signIn: ActionCreators['SignIn'] = (redirect) => ({
  type: types.SIGN_IN,
  redirect,
})

export default {
  changeField,
  signIn,
}
