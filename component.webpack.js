const path = require('path');
const glob = require('glob');

module.exports = {
  entry: './components/Wysiwyg/Wysiwyg.js',
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
            plugins: [
              'add-react-displayname',
              'transform-decorators-legacy',
              [
                'module-resolver', {
                  root: ['.'],
                  alias: {
                    components: './components',
                    constants: './constants',
                    cosmos: './cosmos',
                    css: './css',
                    modules: './modules',
                    services: './services',
                    utils: './utils'
                  }
                }],
              [
                'wrap-in-js',
                {
                  extensions: ['css$', 'scss$']
                }
              ]
            ],
            presets: [
              'next/babel'
            ],
            ignore: []
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
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
      }
    ]
  },
  externals: {
    react: 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
