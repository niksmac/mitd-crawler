var cheerio = require('cheerio')
var Crawler = require('crawler')
var url = require('url')
var fs = require('fs')
var u = require('../utils.js')
var w = require('../writer.js')
var path = require('path')
var scriptName = path.basename(__filename)
//require('locus');

var c = new Crawler({
  maxConnections: 1,
    // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error)
    } else {
      $ = cheerio.load(res.body)
      var data = []
      $('#tenderlist table.table tr').each(function () {
        var $this = $(this)
        var summary = $this.find('td:nth-child(3)').html().trim().split('<br>')
        var assas = u.urlify(summary[0]).split('"')

        data.push({
          'uuid': $this.find('td:nth-child(3)').text().trim(),
          'name': $this.find('td:nth-child(3)').text().trim(),
          'description': 'NA',
          'date': new Date($this.find('td:nth-child(2)').text().trim()).getTime() / 1000,
          'closingDate': new Date($this.find('td:nth-child(2)').text().trim()).getTime() / 1000,
          'link': assas[5],
          'currency': 'INR',
          'value': summary[1].replace(/[^\d\.]/g, ''),
          'category': [],
          'tenderNumber': 'NA'
        })
      })
    }
    w.writeJson(data, scriptName)
    done()
  }
})

// Queue just one URL, with default callback
c.queue('http://www.tendersinfo.com/searchresult')
