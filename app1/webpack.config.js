const HtmlWebpackPlugin = require('html-webpack-plugin');

const { buildWebpackConfig } = require('utils/webpack');
const { modules } = require('utils/modules');

const package = require('./package.json');

module.exports = (env) => buildWebpackConfig({
  env,
  package,
  module: modules.app1,
  remotes: {
    ...modules.library.remote(env),
    ...modules.app2.remote(env),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
});
