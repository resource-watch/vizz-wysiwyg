const path = require('path');

module.exports = {
  // components: 'components/**/[A-Z]*.js',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper')
  },
  sections: [
    {
      name: 'Wysiwyg',
      components: 'components/Wysiwyg/Wysiwyg.js'
    }
    // {
    //   name: 'UI Components',
    //   components: 'components/Wysiwyg/UI/**/[A-Z]*.js'
    // }
  ],
  showUsage: true,
  showCode: true,
  showSidebar: false,
  // Custom webpack config
  /* eslint-disable */
  webpackConfig: require('./styleguide.webpack.js'),
  /* eslint-enable */
};
