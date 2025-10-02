module.exports = {
  root: false,
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["dist", "build", "coverage", ".turbo"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
};
