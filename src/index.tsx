import { createRoot } from 'react-dom/client'
import { App } from '@components'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .catch(err => console.error('[SW] registration failed', err))
}

let node = document.getElementById('root')!
let root = createRoot(node)
root.render(<App />)
