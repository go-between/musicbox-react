import { API } from './api'

let singleton: API
export const setupSingleton = (
  host: string,
  authorizationCode: string,
  klass = API,
) => (singleton = new klass(host, authorizationCode))
export const setSingleton = (instance: API) => (singleton = instance)
export const getSingleton = (): API => singleton
export * from './types'
