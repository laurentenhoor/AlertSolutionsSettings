// AUTOMATIC RELOADING DURING DEVELOPMENT

var fs = require("fs");
var path = '../';

fs.watch(path, function() {

if (location)
  location.reload();

});