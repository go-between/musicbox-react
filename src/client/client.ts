import { push } from 'connected-react-router'

type RequestMiddleware = (req: RequestInit) => RequestInit
type ResponseMiddleware = (res: Promise<Response>) => Promise<Response>
type MultiMiddleware = {
  req: RequestMiddleware
  res: ResponseMiddleware
}

const statusOK = (): ResponseMiddleware => response =>
  response.then(res => {
    if (res.status >= 200 && res.status < 399) {
      return Promise.resolve(res)
    }

    return Promise.reject("Error!")
  })

const authorize = (authorization: string): RequestMiddleware => req => ({
  ...req,
  headers: { ...req.headers, Authorization: `Bearer ${authorization}` },
})

const jsonapi = (): MultiMiddleware => ({
  req: req => {
    if (req.body && req.body.constructor === FormData) {
      return req
    } else {
      const newReq = {
        ...req,
        headers: { ...req.headers, Accept: 'application/vnd.api+json' },
      }
      if (req.body) {
        newReq.headers['Content-Type'] = 'application/vnd.api+json'
      }
      return newReq
    }
  },
  res: res =>
    res.then(r => {
      const headers = r.headers.get('content-type')
      if (!headers) {
        return r
      }
      return /json/.test(headers) ? r.json() : r
    }),
})

class Client {
  private requestMiddleware: RequestMiddleware[] = []
  private responseMiddleware: ResponseMiddleware[] = []

  constructor(public host: uri.URI) {}

  get = (path: string, params?: object) =>
    this.request(path, { method: 'GET' }, params)
  put = (path: string, body: object, params?: object) =>
    this.request(path, { method: 'put', body: JSON.stringify(body) }, params)
  post = (
    path: string,
    body: string | object | RequestInit['body'],
    params?: object,
  ) => {
    const postBody =
      body && body.constructor === FormData ? body : JSON.stringify(body)
    return this.request(path, { method: 'POST', body: postBody }, params)
  }
  patch = (path: string, body: object, params?: object) =>
    this.request(path, { method: 'PATCH', body: JSON.stringify(body) }, params)
  delete = (path: string, params?: object) =>
    this.request(path, { method: 'DELETE' }, params)

  res = (middleware: ResponseMiddleware | MultiMiddleware) => {
    const mid = typeof middleware === 'function' ? middleware : middleware.res
    this.responseMiddleware.push(mid)
    return this
  }

  req = (middleware: RequestMiddleware | MultiMiddleware) => {
    const mid = typeof middleware === 'function' ? middleware : middleware.req
    this.requestMiddleware.push(mid)
    return this
  }

  private request = (
    path: string,
    requestConfig: object | RequestInit,
    params?: object,
  ) =>
    new Promise((resolve, reject) => {
      const requestURI = this.host.clone()
      requestURI.path(path)
      if (typeof params === 'object') {
        requestURI.setQuery(params)
      }
      const finalConfig = this.requestMiddleware.reduce(
        (c, m) => m(c),
        requestConfig,
      )

      const promise = fetch(requestURI.toString(), finalConfig)
      this.responseMiddleware
        .reduce((p, m) => m(p), promise)
        .then(resolve, reject)
    })
}

export default Client
export {
  jsonapi,
  statusOK,
  authorize,
}
