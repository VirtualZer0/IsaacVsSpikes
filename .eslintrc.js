module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@vue/typescript/recommended"],
  // plugins: [
  //   "plugin:vue/vue3-essential",
  //   "eslint:recommended",
  //   "@vue/typescript/recommended",
  //   "plugin:prettier/recommended"
  // ],
  plugins: ["eslint-plugin-prettier", "eslint-plugin-vue"],
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  ignorePatterns: ["src/assets/lib"],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-cycle": "off",
    "vue/script-setup-uses-vars": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "vue/no-unused-components": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-shadow": "off",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
