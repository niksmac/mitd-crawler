var d = new Date()
console.log('====> ' + d.toLocaleString())

var Crawler = require('crawler'),
  url = require('url'),
  glob = require('glob'),
  path = require('path'),
  fs = require('fs')

glob.sync('./src/**/*.js').forEach(function (file) {
  require('./' + file)
})

process.on('exit', function () { process.exit(1) })
