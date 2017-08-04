const { DefinePlugin } = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin")

module.exports = (env) => ({
  entry: './src/renderer/main.js',

  output: {
    filename: 'bundle.js',
  },

  devtool: env.development ? 'inline-source-map' : false,
  target: 'electron-renderer',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
            ],
          },
        },
      },

    ],
  },

  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.production ? 'production' : 'development'),
    }),
    ...(env.production ? [new BabiliPlugin()] : []),
  ],
})

// vim: set ts=2 sw=2 et:
