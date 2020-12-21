const path = require('path');
//const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '', //'auto dist/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader'],
      },
      /*    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, */
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      /*    {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, */
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  plugins: [
    //new TerserPlugin(), //automatically added in prod
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Hello Amar',
      // filename: 'subfolder/custom_filename.html',
      template: 'src/index.hbs',
      description: 'Amar Sowra Anira',

      /*  meta: {
        description: 'Some Description',
      }, */
    }),
  ],
};

// TerserPlugin - minification (old way uglify)
//MiniCssExtractPlugin - extract css into seperate file
//@babel/env - for cross browser es6 -es5 conversion
//contenthash - md5 hasing
