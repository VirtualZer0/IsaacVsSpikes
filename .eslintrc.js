module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
