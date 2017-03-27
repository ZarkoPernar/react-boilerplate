let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let CONFIG = require('./config')

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    CONFIG.APP_PATH + CONFIG.CLIENT_ENTRY_FILE
  ],
  target: 'web',
  output: {
    path: '/' + CONFIG.CLIENT_OUTPUT_PATH,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat',
      'react-redux': 'inferno-redux',
    }
  },
  devServer: CONFIG.WEBPACK_DEV_SERVER_CONFIG,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(CONFIG.HtmlWebpackPlugin),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            "BUILD_TARGET": JSON.stringify("src")
        }
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [
          path.resolve('src'),
          // path.resolve('node_modules/preact-compat/src'),
        ],
        exclude: ['.spec.']

      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            'file-loader',
            'image-webpack-loader'
        ]
      },
    ]
  }
}
