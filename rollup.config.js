import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

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

module.exports = [
  {
    preserveModules: true,
    external: getExternal(),
    input: 'src/index.js',
    watch: {
      include: 'src/**'
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      resolve(),
      // sucrase({
      //   srcDir: 'packages',
      //   exclude: ['node_modules/**', '__tests__/**'],
      //   transforms: ['imports'],
      // }),

      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: 'dist'
            // declarationMap: true,
          },
          include: ['src'],
          exclude: ['node_modules', 'dist', 'rollup.config.js']
        },
        // verbosity: 2,
        rollupCommonJSResolveHack: true,
        // objectHashIgnoreUnknownHack: true,
        clean: true
      }),
      // prettier({
      //   parser: require('@typescript-eslint/parser'),
      // }),
      commonjs(),
      terser({
        keep_classnames: true,
        keep_fnames: true,
        // compress: false,
        // mangle: false,
        // ecma: '2015',
        output: {
          // comments: 'all',
          beautify: true
        }
      })
    ]
  }
]
