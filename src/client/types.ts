export type APIUser = {
  id: string
  type: 'users'
  attributes: {
    name: string
    email: string
  }
}

export type APISong = {
  id?: string
  type: 'songs'
  attributes: {
    name: string
    url: string
  },
  relationships?: {
    room: {
      data: {
        type: 'rooms', id: string
      }
    }
  }
}
