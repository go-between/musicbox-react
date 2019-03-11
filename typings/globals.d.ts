declare var window: Window
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare var process: Process
declare interface Process {
  env: {
    API_HOST: string
    YOUTUBE_KEY: string
    WS_HOST: string
  }
}
