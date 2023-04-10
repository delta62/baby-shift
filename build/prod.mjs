import * as esbuild from 'esbuild'
import copy from 'esbuild-plugin-copy'
import clean from 'esbuild-plugin-clean'
import * as typeCheck from '@jgoz/esbuild-plugin-typecheck'
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin'

if (['API_KEY', 'PROJECT_ID'].some(name => !process.env[name])) {
  throw new Error('API_KEY and PROJECT_ID must be set.')
}

await esbuild.build({
  entryPoints: ['src/index.tsx', 'src/sw.ts'],
  bundle: true,
  minify: true,
  define: {
    API_KEY: JSON.stringify(process.env.API_KEY),
    PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
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
      transform: postcssModules({
        localsConvention: 'camelCaseOnly',
      }),
    }),
    typeCheck.typecheckPlugin(),
  ],
})
