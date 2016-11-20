'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};
  
  //entry
  config.entry = isTest ? {} : {
    app: './index.js'
  };
  
  //output
  config.output = isTest ? {} : {
    path: __dirname + '/dist',
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? '[name].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].js' : '[name].bundle.js'
  };

  //Devtool
  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, 
    {
      test: /\.scss$/,
      loader: isTest ? 'null' : ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded')
    }, 
    {
      test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
      loader: 'url-loader'
    },    
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    },
    {
      test: /\.html$/,
      loader: 'raw'
    }]
  };
  
  if (isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'isparta-instrumenter'
    })
  }
  
  //post css
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 versions', 'ie >= 10']
    })
  ];

  //plugins
  config.plugins = [];

  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
      }),
      new ExtractTextPlugin('[name].css', { allChunks: true })
    )
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: __dirname + '/assets',
        to: __dirname+ '/dist/assets'
      }])
    )
  }
  
  //dev server configuration
  config.devServer = {
    contentBase: './',
    stats: 'minimal'
  };

  return config;
}();
