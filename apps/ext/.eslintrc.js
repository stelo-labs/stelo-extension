module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["import"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicity-function-return-type": "off",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "no-console": "error",
    "no-extra-boolean-cast": "off",
    "prefer-const": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-ts-comment": "off",
    "import/newline-after-import": ["error", { count: 1 }],
  },
  overrides: [
    {
      files: ["*.test.js", "*.test.ts", "**/test/**"],
      plugins: ["jest"],
      env: {
        "jest/globals": true,
      },
    },
  ],
  env: {
    browser: true,
    node: true,
  },
};
