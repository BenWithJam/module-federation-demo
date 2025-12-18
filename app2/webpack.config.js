const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

const pkg = require('./package.json');

module.exports = (env) => ({
  entry: './src/index',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3002,
  },
  output: {
    // publicPath: 'auto',
    publicPath: 'http://localhost:3002/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        ...pkg.dependencies
      },
      dev: {
        disableLiveReload: false,
        disableHotTypesReload: false,
      },
      dts: {
        extractRemoteTypes: true,
        extractThirdParty: true,
      }

    }),
    // new FederatedTypesPlugin({
    //   disableDownloadingRemoteTypes: env.WEBPACK_BUILD,
    //   federationConfig: {
    //     name: 'app2',
    //     filename: 'remoteEntry.js',
    //     exposes: {
    //       './Button': './src/Button',
    //     },
    //     shared: {
    //       ...pkg.dependencies
    //     },
    //   },
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});
