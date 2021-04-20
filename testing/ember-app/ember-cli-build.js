'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: [Object.keys(require('./package').dependencies)],
      webpack: {
        devtool: 'inline-source-map',
      },
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    packageRules: [
      {
        package: 'ember-app',
        components: {
          '{{toggle}}': { safeToIgnore: true },
          '{{toggle-machine}}': { safeToIgnore: true },
          '{{test-machine}}': { safeToIgnore: true },
          '{{report}}': { safeToIgnore: true },
        },
      },
    ],
    packagerOptions: {
      webpackConfig: {
        devtool: 'inline-source-map',
      },
    },
  });
};
