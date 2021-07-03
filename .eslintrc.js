module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)', '**/*.md'],
      env: {
        jest: true,
      },
    },
  ],
}
