
module.exports = {
  components: 'components/**/[A-Z]*.js',
  // Custom webpack config
  /* eslint-disable */
  webpackConfig: require('./styleguide.webpack.js')
  /* eslint-enable */
};
