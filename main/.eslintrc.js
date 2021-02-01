module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    __static: true,
  },
};
