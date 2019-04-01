import Client from './client'
import { Options } from './types'

let singleton: Client
export const setupSingleton = (
  host: string,
  authorizationCode: string | null,
  options: Options,
  klass = Client,
) => (singleton = new klass(host, authorizationCode, options))
export const setSingleton = (instance: Client) => (singleton = instance)
export const getSingleton = (): Client => singleton
export * from './types'
