const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")
const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{ loader: 'babel-loader' }]
});

rules.push({
  test: /\.(png|jpg|gif|svg)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: "[path][name].[ext]",
        publicPath: "..",
        context: "src",
      },
    },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join("src", "front-end", "assets"), to: "assets"
      }],
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/front-end/assets'),
      front: path.resolve(__dirname, 'src/front-end'),
      back: path.resolve(__dirname, 'src/back-end'),
      connector: path.resolve(__dirname, 'src/connector'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
};
