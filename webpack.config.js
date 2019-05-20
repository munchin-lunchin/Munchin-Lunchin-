const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/',
    compress: true,
    port: 8080,
    proxy: {
      '/home': 'http://localhost:3000',
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
};