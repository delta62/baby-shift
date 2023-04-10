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

// let mulberry32 = (seed: number) => {
//   return function () {
//     var t = (seed += 0x6d2b79f5);
//     t = Math.imul(t ^ (t >>> 15), t | 1);
//     t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
//     return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
//   };
// };
//
// let randomEmoji = (seed: number) => {
//   let zeroToOne = mulberry32(seed)();
//   let codePoint = Math.floor(zeroToOne * allEmoji.length);
//   return allEmoji[codePoint];
// };
