interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void;
}

interface ServiceWorkerEventMap {
  activate: ExtendableEvent;
  fetch: FetchEvent;
  install: ExtendableEvent;
}

interface Window {
  addEventListener<K extends keyof ServiceWorkerEventMap>(
    type: K,
    callback: (event: ServiceWorkerEventMap[K]) => void
  ): void;
}
