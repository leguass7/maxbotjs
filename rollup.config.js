import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
// import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import pkg from './package.json'

const dir = process.cwd()

function makeExternalPredicate(externalArr) {
  if (!externalArr.length) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

function getExternal() {
  const external = Object.keys(pkg.peerDependencies || {})
  const allExternal = [...external, ...Object.keys(pkg.dependencies || {})]
  return makeExternalPredicate(allExternal)
}

export default {
  input: `${dir}/src/index.ts`,
  external: getExternal(),
  output: [
    {
      file: `${dir}/${pkg.main}`,
      format: 'cjs',
      exports: 'named'
      // sourcemap: true
    },
    {
      file: `${dir}/${pkg.module}`,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve({ browser: false }),
    json(),
    typescript({
      // tsconfig: './tsconfig-build.json',
      rollupCommonJSResolveHack: true,
      objectHashIgnoreUnknownHack: false,
      clean: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),

    terser({
      keep_classnames: true,
      keep_fnames: true,
      // compress: false,
      // mangle: false,
      // ecma: '2015',
      output: {
        // comments: 'all',
        beautify: false
      }
    })
  ]
}
