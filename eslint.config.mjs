import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mongo
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs'
      }
    },

    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'func-names': 'off',
      'prefer-arrow-callback': 'warn',
      'no-process-exit': 'off',
      'class-methods-use-this': 'off'
    }
  }
]);
