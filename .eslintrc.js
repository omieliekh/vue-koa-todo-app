module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  env: {
    mocha: true,
    jasmine: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      "jsx": true
    }
  },
  rules: {
    semi: 2
  }
};
