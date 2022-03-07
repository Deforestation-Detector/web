const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'test/index.js'),
    'webpack-plugin-serve/client',
  ],
  plugins: [new MiniHtmlWebpackPlugin()],
  module: {
    // rules to handle certain file types
    rules: [
      // test files
      {
        test: /test\.js$/,
        use: 'mocha-loader',
      },
      // HTML
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      // CSS
      {
        test: /\.s[ac]ss$/,
        use: ['css-loader', 'sass-loader'],
      },
      // Images
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader', 'glslify-loader'],
      },
      // Models
      {
        test: /\.(gltf|obj|glb)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/models/[hash][ext]',
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
};
