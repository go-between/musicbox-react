import URI from 'urijs'
import Client, { jsonapi, statusOK, authorize } from './client'

type ApiMethod = (
  path: string,
  body: object,
  params?: object,
) => Promise<object>

// type ApiPostMethod = (
//   path: string,
//   body: string | RequestInit['body'],
//   params?: object,
// ) => Promise<object>

export class API {
  users: any = {
    index: params => this.get('/api/v1/users', params),
  }

  private baseClient: Client
  private get: ApiMethod
  // private put: ApiMethod
  // private post: ApiPostMethod
  // private patch: ApiMethod
  // private delete: ApiMethod

  constructor(host: string, authorizationCode: string) {
    this.baseClient = new Client(URI(host))
      .req(jsonapi())
      .req(authorize(authorizationCode))
      .res(statusOK())
      .res(jsonapi())
    this.get = this.baseClient.get
    // this.put = this.baseClient.put
    // this.post = this.baseClient.post
    // this.patch = this.baseClient.patch
    // this.delete = this.baseClient.delete
  }
}

let singleton

export const setupSingleton = (
  host: string,
  authorizationCode: string,
  klass = API,
) => (singleton = new klass(host, authorizationCode))
export const setSingleton = (instance: API) => (singleton = instance)
export const getSingleton = () => singleton
