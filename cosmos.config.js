module.exports = {
  componentPaths: ['components'],
  publicPath: 'static',
  publicUrl: '/static/',
  globalImports: [
    './css/index.scss'
  ],
  ignore: ['components/layout'],
  webpackConfigPath: './cosmos.webpack'
};
