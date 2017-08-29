const { DefinePlugin } = require('webpack')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = (env) => {
  const rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            'stage-0',
          ],
        },
      },
    },
  ]

  const plugins = []

  if (env.production) {
    plugins.push(
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new BabelMinifyPlugin(),
    )
  }

  return {
    entry: './src/renderer/main.js',

    output: {
      filename: 'bundle.js',
    },

    devtool: env.development ? 'inline-source-map' : false,
    target: 'electron-renderer',

    module: {
      rules,
    },

    plugins,
  }
}

// vim: set ts=2 sw=2 et:
