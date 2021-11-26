const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.js')],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    // rules to handle certain file types
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      // CSS
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader', 'glslify-loader'],
      },
      // Models
      {
        test: /\.(gltf|obj)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
  },
};
