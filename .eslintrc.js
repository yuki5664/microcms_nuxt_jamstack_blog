module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    "plugin:nuxt/recommended",
    'prettier',
    ],
  plugins: ['nuxt'],
  rules: {
    semi: [2, 'never'],
    // 'no-console': 'off',
    // 'vue/max-attributes-per-line': 'off',
    // 'vue/html-self-closing': 'off' //空タグを許可する
  }
}