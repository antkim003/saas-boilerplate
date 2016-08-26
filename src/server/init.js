// this init file makes sure to require babel polyfill for certain filenames
module.exports.run = function () {
  require('babel-register')({
    only(filename) {
      return (filename.indexOf('build') === -1 && filename.indexOf('node_modules') === -1);
    },
    extensions: ['.js']
  });
  require('babel-polyfill');
};
