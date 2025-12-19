
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const path = require('path');

const buildWebpackConfig = ({ env, package, module, remotes = {}, exposes = undefined, plugins = [] }) => {
  return {
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
      port: module.port
    },
    output: {
      publicPath: 'auto',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules|mock\.ts$/,
          use: [
            {
              loader: 'ts-loader',
            },
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                insert: require.resolve('utils/styleLoader'),
              },
            },
            'css-loader',
          ],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: module.name,
        filename: 'remoteEntry.js',
        remotes,
        exposes,
        dts: {
          generateTypes: !env.WEBPACK_BUILD,
          consumeTypes: !env.WEBPACK_BUILD,
        },
        shared: {
          ...package.dependencies,
          react: {
            singleton: true,
            requiredVersion: package.dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: package.dependencies['react-dom'],
          },
          'styled-components': {
            singleton: true,
            requiredVersion: package.dependencies['styled-components'],
          },
          '@emotion/cache': {
            singleton: true,
            requiredVersion: package.dependencies['@emotion/cache']
          },
          '@emotion/react': {
            singleton: true,
            requiredVersion: package.dependencies['@emotion/react']
          },
          '@emotion/styled': {
            singleton: true,
            requiredVersion: package.dependencies['@emotion/styled']
          },
          '@mui/material': {
            singleton: true,
            requiredVersion: package.dependencies['@mui/material']
          }
        }
      }),
      ...plugins,
    ],
  }
}

module.exports = { buildWebpackConfig }
