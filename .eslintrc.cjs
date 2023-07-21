module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint-config-prettier',
    'eslint:recommended', // 使用推荐的eslint
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parser: 'vue-eslint-parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'linebreak-style': ['off', 'windows'],
    'no-console': 'off',
    'no-debugger': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'vue/html-self-closing': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-expressions': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
};
