// @ts-nocheck
import ts from 'rollup-plugin-ts';
import { defineConfig } from 'rollup';
 import { nodeResolve } from '@rollup/plugin-node-resolve';

import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

// these should be JS, even though the authored format is TS
// Unfortunately, your local project layout has to kind of match what classic ember expects
// so that all the app-re-exports can be properly generated
const globallyAvailable = [
  'components/**/*.{ts,js,hbs}',
  'instance-initializers/*.{ts,js}',
  'helpers/**/*.{ts,js}',
];

export default defineConfig({
  external: ['tslib', 'ember-cli-htmlbars'],
  output: addon.output(),
  plugins: [
   // Instruct rollup how to resolve ts and hbs imports
    // (importing a template-only component, for example)
    nodeResolve({ extensions: [ '.gjs', '.gts', '.js', '.ts', '.hbs']}),

    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['*.{js,ts}', ...globallyAvailable]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports([...globallyAvailable]),
    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    // See `babel.config.json` for the actual Babel configuration!
    ts({
      // can be changed to swc or other transpilers later
      // but we need the ember plugins converted first
      // (template compilation and co-location)
      transpiler: 'babel',
      // include: '**/*.{js,ts,hbs}',
      browserslist: ['last 2 firefox versions', 'last 2 chrome versions'],
      // setting this true greatly improves performance, but
      // at the cost of safety.
      transpileOnly: true,
      tsconfig: {
        fileName: 'tsconfig.json',
        hook: (config) => ({ ...config, declaration: true }),
      },
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

  // addons are allowed to contain imports of .css files, which we want rollup
  // to leave alone and keep in the published output.
  // addon.keepAssets(['**/*.css']),

    addon.clean(),
  ],
});
