import * as esbuild from 'esbuild'
import * as typeCheck from '@jgoz/esbuild-plugin-typecheck'
import clean from 'esbuild-plugin-clean'
import copy from 'esbuild-plugin-copy'
import fs from 'fs/promises'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'
import * as path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

let __dirname = dirname(fileURLToPath(import.meta.url))

if (['API_KEY', 'PROJECT_ID'].some(name => !process.env[name])) {
  throw new Error('API_KEY and PROJECT_ID must be set.')
}

let pkg = JSON.parse(await fs.readFile('./package.json', { encoding: 'utf-8' }))

await esbuild.build({
  entryPoints: ['src/index.tsx', 'src/sw.ts'],
  bundle: true,
  minify: true,
  define: {
    API_KEY: JSON.stringify(process.env.API_KEY),
    PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
    VERSION: JSON.stringify(pkg.version),
    PRODUCTION: JSON.stringify(true),
  },
  outdir: 'dist',
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
    typeCheck.typecheckPlugin(),
  ],
})
