const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');

require('dotenv').load();

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('[name].css'),
  new ExtraneousFileCleanupPlugin({
    extensions: ['.js'],
    minBytes: 4096
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  );
}


module.exports = {
  entry: {
    wysiwyg: path.resolve(__dirname, 'components/Wysiwyg/index.js'),
    rw: path.resolve(__dirname, 'css/components/wysiwyg/index_rw.scss'),
    prep: path.resolve(__dirname, 'css/components/wysiwyg/index_prep.scss')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
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
                    components: path.resolve(__dirname, 'components'),
                    constants: path.resolve(__dirname, 'constants'),
                    css: path.resolve(__dirname, 'css'),
                    modules: path.resolve(__dirname, 'modules'),
                    services: path.resolve(__dirname, 'services'),
                    utils: path.resolve(__dirname, 'utils')
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
  plugins,
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
    },
    redux: {
      root: 'redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
      umd: 'redux'
    },
    'redux-thunk': {
      root: 'redux-thunk',
      commonjs2: 'redux-thunk',
      commonjs: 'redux-thunk',
      amd: 'redux-thunk',
      umd: 'redux-thunk'
    },
    reselect: {
      root: 'reselect',
      commonjs2: 'reselect',
      commonjs: 'reselect',
      amd: 'reselect',
      umd: 'reselect'
    },
    quill: {
      root: 'quill',
      commonjs2: 'quill',
      commonjs: 'quill',
      amd: 'quill',
      umd: 'quill'
    },
    'react-quill': {
      root: 'react-quill',
      commonjs2: 'react-quill',
      commonjs: 'react-quill',
      amd: 'react-quill',
      umd: 'react-quill'
    }
  }
};
