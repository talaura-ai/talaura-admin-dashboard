module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['warn'],
    'no-empty-pattern': ['warn'],
    'react-hooks/rules-of-hooks': ['warn'],
    'no-constant-condition': ['warn'],
    'no-empty': ['warn'],
    'react-refresh/only-export-components': ['warn'],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
