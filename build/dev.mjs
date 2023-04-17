import * as esbuild from 'esbuild'
import copy from 'esbuild-plugin-copy'
import clean from 'esbuild-plugin-clean'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
import * as typeCheck from '@jgoz/esbuild-plugin-typecheck'
import http from 'http'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import * as path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

let __dirname = dirname(fileURLToPath(import.meta.url))
let pkg = JSON.parse(await fs.readFile('./package.json', { encoding: 'utf-8' }))

dotenv.config()
if (['API_KEY', 'PROJECT_ID'].some(name => !process.env[name])) {
  throw new Error(
    'API_KEY and PROJECT_ID must be set. Check your .env file? SEO: dotenv'
  )
}

let serve = async (ctx, servedir, listen) => {
  // Start esbuild's local web server. Random port will be chosen by esbuild.
  let { host, port } = await ctx.serve({ servedir }, {})

  // Create a second (proxy) server that will forward requests to esbuild.
  let proxy = http.createServer((req, res) => {
    // forwardRequest forwards an http request through to esbuid.
    let forwardRequest = path => {
      let options = {
        hostname: host,
        port,
        path,
        method: req.method,
        headers: req.headers,
      }

      let proxyReq = http.request(options, proxyRes => {
        if (proxyRes.statusCode === 404) {
          // If esbuild 404s the request, assume it's a route needing to
          // be handled by the JS bundle, so forward a second attempt to `/`.
          return forwardRequest('/')
        }

        // Otherwise esbuild handled it like a champ, so proxy the response back.
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      })

      req.pipe(proxyReq, { end: true })
    }

    // When we're called pass the request right through to esbuild.
    forwardRequest(req.url)
  })

  // Start our proxy server at the specified `listen` port.
  proxy.listen(listen)
}

let ctx = await esbuild.context({
  entryPoints: ['src/index.tsx', 'src/sw.ts'],
  bundle: true,
  outdir: 'dist',
  sourcemap: true,
  define: {
    API_KEY: JSON.stringify(process.env.API_KEY),
    PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
    VERSION: JSON.stringify(pkg.version),
    PRODUCTION: JSON.stringify(false),
  },
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./static/**/*'],
        to: ['dist'],
      },
      copyOnStart: true,
    }),
    clean({
      patterns: ['./dist'],
    }),
    sassPlugin({
      loadPaths: [path.resolve(__dirname, '..', 'src', 'styles')],
      transform: postcssModules({
        localsConvention: 'camelCaseOnly',
      }),
    }),
    typeCheck.typecheckPlugin({ watch: true }),
  ],
})

await ctx.watch()

// Serves all content from ./dist on :1234.
// If esbuild 404s the request, the request is attempted again
// from `/` assuming that it's an SPA route needing to be handled by the root bundle.
serve(ctx, 'dist', 8080)

console.log(`listening on :8080`)
