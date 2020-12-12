/* eslint @typescript-eslint/no-var-requires: "off" */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

/* eslint-env node */
module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '',
  },
});
