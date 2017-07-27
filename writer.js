'use strict'
var fs = require('fs')

var jsonfile = require('jsonfile')
exports.writeJson = function (jsons, scriptName) {
  var file = process.cwd() + '/data/' + scriptName + '.json'
  var newfile = file.replace('.js', '')
  console.log('Writing ' + jsons.length + ' values ' + newfile.replace(process.cwd(), ''))
  var fd = fs.openSync(newfile, 'w')

  jsonfile.writeFile(newfile, jsons, {spaces: 2}, function (err) {
    if (err) {
      throw new Error('Failed to write ' + newfile)
    }
  })
}
