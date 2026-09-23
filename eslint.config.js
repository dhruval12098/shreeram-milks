const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  globalIgnores(['.expo/*', 'dist/*', 'node_modules/*']),
  expoConfig,
  {
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      'no-console': 'warn',
      'import/no-named-as-default-member': 'off',
    },
  },
]);
