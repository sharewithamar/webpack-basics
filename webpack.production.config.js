const path = require('path');
//const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // entry: './src/index.js',
  entry: {
    'hello-world': './src/hello-world.js',
    kiwi: './src/kiwi.js',
  },
  output: {
    // filename: 'bundle.[contenthash].js', // name, id ( chunk id) -options
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    //publicPath: '', //'auto dist/'
    publicPath: '/static/',
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000, //3kb- >by default 30kb it will create sepearet chunk
    },
  },
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
      // filename: 'styles.[contenthash].css',
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      // filename: 'subfolder/custom_filename.html',
      filename: 'hello-world.html',
      chunks: ['hello-world'],
      template: 'src/page-template.hbs',
      description: 'Hello world',
      minify: false,

      /*  meta: {
        description: 'Some Description',
      }, */
    }),

    new HtmlWebpackPlugin({
      title: 'Hello Kiwi',
      filename: 'kiwi.html',
      chunks: ['kiwi'],

      // filename: 'subfolder/custom_filename.html',
      template: 'src/page-template.hbs',
      description: 'Kiwi',
      minify: false,

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
