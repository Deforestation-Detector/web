const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.js')],
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new FaviconsWebpackPlugin({
      logo: './src/img/icon.svg',
      cache: true,
      prefix: 'assets/',
      inject: true,
      favicons: {
        appName: 'Deforestation Detector',
        appDescription:
          'Deforestation Detector uses an image recognition model to detect deforestation in satellite imagery.',
        theme_color: '#333366',
      },
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
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
        test: /\.(gltf|obj|glb)$/,
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
