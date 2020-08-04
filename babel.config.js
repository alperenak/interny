module.exports = {
  presets: [
    [
      "@babel/env", {
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        },
        "useBuiltIns": "entry",
        "corejs": "3.0.0"
      },
    ],
    ["@babel/preset-react"]
  ],
  plugins: [
    "minify-dead-code-elimination",
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    ["react-directives",
      {
        "prefix": "v",
        "pragmaType": "React"
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties"
  ],
};
