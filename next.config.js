const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
require('dotenv').load();

module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
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
      }
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.PORT': JSON.stringify(process.env.PORT),
        'process.env.KENYA_PATH': JSON.stringify(process.env.KENYA_PATH),
        'process.env.KENYA_API': JSON.stringify(process.env.KENYA_API),
        'process.env.KENYA_API_KEY': JSON.stringify(process.env.KENYA_API_KEY),
        'process.env.BASEMAP_LABEL_URL': JSON.stringify(process.env.BASEMAP_LABEL_URL),
        'process.env.BASEMAP_TILE_URL': JSON.stringify(process.env.BASEMAP_TILE_URL),
        'process.env.GOOGLE_ANALITYCS_ID': JSON.stringify(process.env.GOOGLE_ANALITYCS_ID),
        'process.env.OPBEAT_ORG_ID': JSON.stringify(process.env.OPBEAT_ORG_ID),
        'process.env.OPBEAT_APP_ID': JSON.stringify(process.env.OPBEAT_APP_ID)
      })
    );

    return config;
  }
};
