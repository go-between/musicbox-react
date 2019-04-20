const CHANGE_FIELD = 'app/Auth/CHANGE_FIELD'
const SIGN_IN = 'app/Auth/SIGN_IN'

type Types = {
  CHANGE_FIELD: typeof CHANGE_FIELD
  SIGN_IN: typeof SIGN_IN
}

export const types: Types = {
  CHANGE_FIELD,
  SIGN_IN,
}

type ChangeField = <
  Key extends keyof State,
  Value extends State[Key]
>(key: Key, value: Value) => {
  type: typeof types.CHANGE_FIELD,
  key: Key,
  value: Value
}

type SignIn = (redirect: string) => {
  type: typeof types.SIGN_IN
  redirect: string
}

export type Action =
  | ReturnType<ChangeField>
  | ReturnType<SignIn>

export type ActionCreators = {
  ChangeField: ChangeField
  SignIn: SignIn
}

export type State = {
  email: string
  error: string
  password: string
  token: string
}
