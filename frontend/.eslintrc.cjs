module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@layouts', './src/components/layouts'],
          ['@errors', './src/components/Errors'],
          ['@config', './src/config'],
          ['@store', './src/store'],
          ['@data', './src/data'],
          ['@helpers', './src/helpers'],
          ['@images', './src/app/assets/images'],
        ],
        extensions: ['.js', '.jsx']
      }
    }
  },
  plugins: [
      'react',
      'react-refresh',
      'import',
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': ['error', 4],
    'semi': ['error', 'always'],
  },
}
