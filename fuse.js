const { FuseBox, BabelPlugin, EnvPlugin } = require('fuse-box')

const production = process.argv[2] === 'production'

const fuse = FuseBox.init({
  homeDir: 'src/',
  output: 'dist/$name.js',
  cache: !production,
  log: true,
  debug: true,
  sourceMaps: { inline: !production },

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
    root: 'dist/',
    port: process.env.npm_package_config_port,
  })
  bundle.hmr().watch()
}

fuse.run()

// vim: set ts=2 sw=2 et:
