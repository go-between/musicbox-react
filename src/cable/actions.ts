import { ActionCreators, types } from './types'

const connect: ActionCreators['Connect'] = () => ({
  type: types.CONNECT,
})

const connectOK: ActionCreators['ConnectOK'] = () => ({
  type: types.CONNECT_OK,
})

export default {
  connect,
  connectOK,
}
