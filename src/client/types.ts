export type APIUser = {
  id: string
  type: 'users'
  attributes: {
    name: string
    email: string
  }
}

export type APISong = {
  id: string
  type: 'songs'
  name: string
  url: string
}