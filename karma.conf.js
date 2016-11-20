module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'jasmine'
    ],
    reporters: [
      'progress',
      'coverage'
    ],
    files: [
      'test/index.js'
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
