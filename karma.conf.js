const path = require('path');
const webpackConfig = require(path.join(process.cwd(), '/node_modules/@vue/cli-service/webpack.config.js'));

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'src/**/*.spec.js'
    ],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome']
  });
};
