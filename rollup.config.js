import babel from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import {terser} from 'rollup-plugin-terser';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [
      del({targets: 'dist/*'}), // Cleans dist folder before building a new bundle
      peerDepsExternal(), // Keeps peer dependencies out of the bundle
      nodeResolve(), // Loads npm packages from node_modules
      commonjs({include: /node_modules/}), // Transpiles CommonJS to ES2015, rollup chokes on CommonJS modules
      babel({exclude: /node_modules/, babelHelpers: 'bundled'}), // Transpiles JS code to JS supported by browsers
      css({output: false}), // Rollup doesn't know what to do with CSS
      terser(), // Minifies JS bundle
    ],
  },
];
