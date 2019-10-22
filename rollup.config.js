import rollupTypescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: ['redis'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner: `/*!
* Redis V${pkg.version}
* For promise
* Released under the MIT License.
*/`,
      },
    ],
    plugins: [
      rollupTypescript({
        noEmit: false,
        target: 'es2015',
        removeComments: true,
      }),
    ],
  },
];
