global.config = require('konfig')()

var Crawler = require('crawler'),
  url = require('url'),
  glob = require('glob'),
  path = require('path'),
  colors = require('colors'),
  Table = require('cli-table2'),
  moment = require('moment')
fs = require('fs')

glob.sync('./src/**/*.js').forEach(function (file) {
  var name = file.replace('.js', '')
  var mname = name.replace('./src/', '')
  var xmname = require('./' + file)
})
