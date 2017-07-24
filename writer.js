'use strict'

var jsonfile = require('jsonfile')
var file = './data/limits.json'

exports.writeJson = function (jsons) {
  jsonfile.writeFile(file, jsons, {flag: 'a', spaces: 2}, function (err) {
    console.error(err)
  })
}
