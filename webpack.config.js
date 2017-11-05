var path = require('path')

module.exports = {
    entry: "./source/writekit.js",
    output: {
        path: __dirname,
        filename: "./source/bundle.js"
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts'],
      modules: ["node_modules"]
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: /(node_modules|bower_components)/,
              query: {
                cacheDirectory: true,
                presets: ['es2017', 'react']
              }
             }
        ]
    },
    node: {
      fs: 'empty'
    }
};
