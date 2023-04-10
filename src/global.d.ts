declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}

declare const API_KEY: string
declare const PROJECT_ID: string
declare const VERSION: string

declare module 'redux-localstorage' {
  import { StoreEnhancer } from '@reduxjs/toolkit'

  interface Config {
    key?: string
    slicer?: unknown
  }

  function persistState(
    paths?: string | string[],
    config?: Config
  ): StoreEnhancer
  export default persistState
}

interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void
}

interface ServiceWorkerEventMap {
  activate: ExtendableEvent
  fetch: FetchEvent
  install: ExtendableEvent
}

interface Window {
  addEventListener<K extends keyof ServiceWorkerEventMap>(
    type: K,
    callback: (event: ServiceWorkerEventMap[K]) => void
  ): void
}
