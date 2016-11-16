'use strict';
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var isProduction = function() {
  return process.env.NODE_ENV === 'production';
};
var outputDir = 'outputDirFlag';
var entryPath = 'entryPathFlag';
var outputDir2 = 'outputDir2Flag';
var entryPath2 = 'entryPath2Flag';
var chunkPath = 'chunkPathFlag';


var plugins = null;

function setCommons(set) {
  plugins = [
    new webpack.optimize.CommonsChunkPlugin(set)
  ];
}
if (process.argv[process.argv.length - 1] === "--noreactpage") {

  outputDir = outputDir2;
  entryPath = entryPath2;
} else {

}
setCommons({
  name: 'commons',
  filename: 'js/commons.js',
})

if (isProduction()) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}

var entris = fs.readdirSync(entryPath).reduce(function(o, filename) {
  !/\./.test(filename) &&
    (o[filename] = path.join(entryPath, filename, filename));
  return o;

}, {});


var config = {
  target: 'web',
  cache: true,
  entry: entris,

  output: {
    path: outputDir,
    filename: 'js/[name].bundle.js',
    publicPath: isProduction() ? chunkPath : chunkPath,
    chunkFilename: isProduction() ? 'js/[name].chunk.min.js' : 'js/[name].chunk.js',
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['babel?presets[]=react&presets[]=es2015&presets[]=stage-0'],
      exclude: /node_modules/
    }],
    postLoaders: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['es3ify-loader'],
    }, ],
  },
  plugins: plugins,
  externals: {
    "jquery": "jQuery",
    'webuploader': 'window.WebUploader'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: isProduction() ? null : 'source-map',
};

module.exports = config;