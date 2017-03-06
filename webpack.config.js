var path = require('path');

module.exports = {
  entry: './frontend/app.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },

  devtool: "source-map",
  watch: true,

  module: {

    rules: [
      // {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader"
      // },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          // plugins: ['transform-runtime']
        }
      }
    ],
  },
};



  //
  // devServer: {
  //   proxy: {
  //     '*': 'http://localhost:3000'
  //   }
  // }
