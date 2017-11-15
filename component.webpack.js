const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './components/Wysiwyg/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'wysiwyg.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'components'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              'add-react-displayname',
              'transform-decorators-legacy',
              [
                'module-resolver', {
                  root: ['.'],
                  alias: {
                    components: './components',
                    constants: './constants',
                    css: './css',
                    modules: './modules',
                    services: './services',
                    utils: './utils'
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: [
            {
              loader: 'style-loader'
            }
          ],
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['css', 'node_modules']
                  .map(d => path.join(__dirname, d))
                  .map(g => glob.sync(g))
                  .reduce((a, c) => a.concat(c), [])
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('wysiwyg.css'),
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom'
    }
  }
};
