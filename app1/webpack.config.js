const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

const { localLoader } = require('utils/remoteLoader')

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
    port: 3001,
  },
  output: {
    // publicPath: 'auto',
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  watchOptions: {
    ignored: ['**/node_modules', '**/@mf-types/**'],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //       options: {
  //         presets: ['@babel/preset-react', '@babel/preset-typescript'],
  //       },
  //     },
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|mock\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true
            }
          },
          // {
          //   loader: reactCompilerLoader,
          //   options: defineReactCompilerLoaderOption({
          //     target: '18'
          //   })
          // }
        ]
      },
    ],
  },
  plugins: [
    // Define federation config once and use for both plugins
    new ModuleFederationPlugin({

      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        // TODO: set this up for prod with remoteLoader as well
        // app2: localLoader('app2', 'http://localhost:3002')
        app2: 'app2@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        ...pkg.dependencies
      },
    }),
    // new FederatedTypesPlugin({
    //   disableDownloadingRemoteTypes: env.WEBPACK_BUILD,
    //   federationConfig: {
    //     name: 'app1',
    //     filename: 'remoteEntry.js',
    //     remotes: {
    //       app2: 'app2@http://localhost:3002/remoteEntry.js',
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
