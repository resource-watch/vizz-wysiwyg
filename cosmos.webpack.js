const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    // Using loaders instead of rules to preserve webpack 1.x compatibility
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['css', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'React Cosmos' })
    // new webpack.DefinePlugin({
    //   'process.env.PORT': JSON.stringify(process.env.PORT),
    //   'process.env.KENYA_PATH': JSON.stringify(process.env.KENYA_PATH),
    //   'process.env.KENYA_API': JSON.stringify(process.env.KENYA_API),
    //   'process.env.KENYA_API_KEY': JSON.stringify(process.env.KENYA_API_KEY),
    //   'process.env.BASEMAP_LABEL_URL': JSON.stringify(process.env.BASEMAP_LABEL_URL),
    //   'process.env.BASEMAP_TILE_URL': JSON.stringify(process.env.BASEMAP_TILE_URL),
    //   'process.env.GOOGLE_ANALITYCS_ID': JSON.stringify(process.env.GOOGLE_ANALITYCS_ID),
    //   'process.env.OPBEAT_ORG_ID': JSON.stringify(process.env.OPBEAT_ORG_ID),
    //   'process.env.OPBEAT_APP_ID': JSON.stringify(process.env.OPBEAT_APP_ID)
    // })
  ]
};
