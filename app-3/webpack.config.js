const { ModuleFederationPlugin } = require('webpack').container;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 7003,
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
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app3',
      filename: 'remoteEntry.js',
      library: {
        type: 'var',
        name: 'app3',
      },
      exposes: {
        './Content': './src/components/content',
      },
      remotes: {
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'styled-components': {
          singleton: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};