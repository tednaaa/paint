const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const parsedDotenvConfig = require('dotenv').config().parsed;

const { PORT, NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV,
  entry: path.join(__dirname, 'src', 'app', 'index.tsx'),
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  devtool: isDevelopment ? 'source-map' : false,
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    port: PORT,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': `(${JSON.stringify(parsedDotenvConfig)})`,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? 'css/[name].css'
        : 'css/[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'group-css-media-queries-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
};
