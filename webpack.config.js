const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];
  return loaders;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './index.js',
    drumPad: './projects/drumPad/drumPad.js',
    gradient: './projects/linearGradient/gradient.js',
    weather: ['@babel/polyfill', './projects/weather/weather.js'],
    punk: ['./projects/punkcyber/punk.js'],
    game: './projects/game/game.js'
  },
  output: {
    path: path.resolve(__dirname, 'portfolio')
  },
  
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    host: '192.168.0.102',
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    port: 8080,
    // hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './projects/drumPad/drumPad.html',
      inject: true,
      chunks: ['drumPad'],
      filename: 'drumPad.html'
    }),
    new HtmlWebpackPlugin({
      template: './projects/linearGradient/gradient.html',
      inject: true,
      chunks: ['gradient'],
      filename: 'gradient.html'
    }),
    new HtmlWebpackPlugin({
      template: './projects/weather/weather.html',
      inject: true,
      chunks: ['weather'],
      filename: 'weather.html'
    }),
    new HtmlWebpackPlugin({
      template: './projects/punkcyber/punk.html',
      inject: true,
      chunks: ['punk'],
      filename: 'punk.html'
    }),
    new HtmlWebpackPlugin({
      template: './projects/game/game.html',
      inject: true,
      chunks: ['game'],
      filename: 'game.html'
    }),

    new CopyPlugin([
        { 
          from: path.resolve(__dirname, 'src/favicon.ico'), 
          to: path.resolve(__dirname, 'portfolio') 
        },
        { 
          from: path.resolve(__dirname, 'src/icons'), 
          to: path.resolve(__dirname, 'portfolio/icons') 
        },
        { 
          from: path.resolve(__dirname, 'src/img'), 
          to: path.resolve(__dirname, 'portfolio/img') 
        },
        { 
          from: path.resolve(__dirname, 'src/projects/weather/img'), 
          to: path.resolve(__dirname, 'portfolio/weatherimg') 
        },
      ]
    ),
    new MiniCssExtractPlugin({
      // filename: filename('css')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.(png|jpg|jpeg|svg|mp3)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
    ],
  }
}