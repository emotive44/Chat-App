/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

/* eslint-env node */
module.exports = {
  entry: './src/app.ts',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.join(__dirname, '/src/'),
    },
  },
};
