'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: [Object.keys(require('./package').dependencies)],
      webpack: {
        devtool: 'inline-source-map',
        module: {
          rules: [{ test: /\.(js|ts)$/, type: 'javascript/auto' }],
        },
      },
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        devtool: 'inline-source-map',
        module: {
          rules: [{ test: /\.(js|ts)$/, type: 'javascript/auto' }],
        },
      },
    },
  });
};
