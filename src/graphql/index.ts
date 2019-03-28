import Client from './client'

let singleton: Client
export const setupSingleton = (
  host: string,
  authorizationCode: string,
  klass = Client,
) => (singleton = new klass(host, authorizationCode))
export const setSingleton = (instance: Client) => (singleton = instance)
export const getSingleton = (): Client => singleton
// export * from './types'
