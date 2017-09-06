var glob = require("glob");
var path = require("path");

module.exports = glob.sync(path.join(__dirname, "*.js")).map((filePath) => {
  var splits = filePath.split("/");
  return splits[splits.length - 1];
}).filter((fileBaseName) => {
  return fileBaseName !== "index.js";
}).map((fileBaseName) => {
  return require("./" + fileBaseName);
})
