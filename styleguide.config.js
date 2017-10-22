const path = require('path');

module.exports = {
  components: 'components/**/[A-Z]*.js',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper')
  },
  // Custom webpack config
  /* eslint-disable */
  webpackConfig: require('./styleguide.webpack.js'),
  /* eslint-enable */
};
