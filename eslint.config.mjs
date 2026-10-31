import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default [
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.spec.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
      'boundaries/elements': [
        { type: 'ui', pattern: 'src/libs/shared/ui' },
        { type: 'utils', pattern: 'src/libs/shared/utils' },
        { type: 'lib', pattern: 'src/libs/*', capture: ['scope'] },
        { type: 'app', pattern: 'src/app' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            // always allow extrnal package imports
            { from: { element: { type: '*' } }, allow: { to: { module: { origin: 'external' } } } },
            // app -  any lib, through the index file
            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  file: { path: '**/index.ts' },
                  element: { types: { anyOf: ['lib', 'ui', 'utils'] } },
                },
              },
            },
            // lib - its own files, shared libs index file
            {
              from: { element: { type: 'lib' } },
              allow: [
                {
                  to: {
                    element: {
                      type: 'lib',
                      captured: { scope: '{{ from.element.captured.scope }}' },
                    },
                  },
                },
                {
                  to: {
                    file: { path: '**/index.ts' },
                    element: { types: { anyOf: ['ui', 'utils'] } },
                  },
                },
              ],
            },
            // shared-ui -  itself, shared-utils
            {
              from: { element: { type: 'ui' } },
              allow: [
                { to: { element: { type: 'ui' } } },
                { to: { file: { path: '**/index.ts' }, element: { type: 'utils' } } },
              ],
            },
            // shared-utils - itself only
            {
              from: { element: { type: 'utils' } },
              allow: { to: { element: { type: 'utils' } } },
            },
          ],
        },
      ],
    },
  },
  //circular dependancy
  {
    files: ['src/**/*.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { 'import-x': importX },
    settings: {
      'import-x/extensions': ['.ts'],
      'import-x/parsers': { '@typescript-eslint/parser': ['.ts'] },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ project: './tsconfig.app.json' }),
      ],
    },
    rules: {
      'import-x/no-cycle': ['error', { ignoreExternal: true }],
    },
  },
];
