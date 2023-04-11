import { createRoot } from 'react-dom/client'
import { App } from '@components'

if (!PRODUCTION) {
  // Live reload for dev environments. This is compiled out of prod builds.
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload()
  )
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .catch(err => console.error('[SW] registration failed', err))
}

let node = document.getElementById('root')!
let root = createRoot(node)
root.render(<App />)
