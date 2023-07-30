const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

// Add this rule for SCSS files
rules.push({
  test: /\.scss$/,
  use: [
    "style-loader", // creates style nodes from JS strings
    "css-loader", // translates CSS into CommonJS
    "sass-loader", // compiles Sass to CSS, using Node Sass by default
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};
