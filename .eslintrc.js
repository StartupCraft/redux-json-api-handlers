module.exports = {
  parser: 'babel-eslint',
  extends: [
    "airbnb-base",
    "prettier"
  ],
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  plugins: [
    "prettier",
    "flowtype"
  ],
  rules: {
    "prettier/prettier": [1, { singleQuote: true, semi: false, trailingComma: "all" }],
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
    "import/prefer-default-export": 1,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true,
    }
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: [
          "node_modules",
          "src"
        ]
      }
    }
  }
}
