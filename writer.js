'use strict'

var jsonfile = require('jsonfile')
exports.writeJson = function (jsons, scriptName) {
  var file = process.cwd() + '/data/'+scriptName+'.json'
  var newfile = file.replace('.js', '');
  var fd = fs.openSync(newfile, 'w');
  jsonfile.writeFile(newfile, jsons, {spaces: 2}, function (err) {
    console.error(err)
  })
}
