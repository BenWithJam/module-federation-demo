const { buildWebpackConfig } = require('utils/webpack');
const { modules } = require('utils/modules');

const package = require('./package.json');

module.exports = (env) => buildWebpackConfig({
  env,
  package,
  module: modules.library,
  exposes: {
    './Button': './src/Button'
  }
});
