import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/renderer/main.js',
  dest: 'dist/bundle.js',
  format: 'es',

  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    babel({
      presets: [
        'react',
      ],
      plugins: [
        'external-helpers',
      ],
      env: {
        'production': {
          'presets': [
            'babili',
          ],
        },
      },
    }),

    resolve({
      jsnext: true,
    }),

    commonjs(),
  ],
}

// vim: set ts=2 sw=2 et:


