const { FuseBox, BabelPlugin, EnvPlugin } = require('fuse-box')

const production = process.argv[2] === 'production'

const fuse = FuseBox.init({
  homeDir: 'src/renderer/',
  output: 'dist/$name.js',
  cache: !production,
  log: true,
  debug: true,
  sourceMaps: { inline: !production },
  target: 'electron',

  plugins: [
    EnvPlugin({
      NODE_ENV: production ? 'production' : 'development',
    }),

    BabelPlugin({
      sourceMaps: !production,
      presets: production ? ['react', 'babili'] : ['react'],
    }),
  ],
})

const bundle = fuse
  .bundle('bundle')
  .instructions('> main.js')

if (!production) {
  fuse.dev({
    httpServer: false,
  })
  bundle.hmr().watch()
}

fuse.run()

// vim: set ts=2 sw=2 et:
