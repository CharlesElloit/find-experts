module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": "off",
    "global-require": 0,
    "consistent-return": 0,
    "no-underscore-dangle": 0,
    "linebreak-style": ["error", "windows"],
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "off",
  },
};
