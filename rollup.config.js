import babel from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import {terser} from 'rollup-plugin-terser';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [
      typescript(),
      commonjs({include: /node_modules/}), // Transpiles CommonJS to ES2015, rollup chokes on CommonJS modules
      peerDepsExternal(), // Keeps peer dependencies out of the bundle
      nodeResolve(), // Loads npm packages from node_modules
      babel({exclude: /node_modules/, babelHelpers: 'bundled'}), // Transpiles JS code to JS supported by browsers
      css({output: false}), // Rollup doesn't know what to do with CSS
      terser(), // Minifies JS bundle
    ],
  },
  {
    input: '.dts/src/index.d.ts',
    output: {file: pkg.types, format: 'cjs'},
    plugins: [dts()],
  },
];
