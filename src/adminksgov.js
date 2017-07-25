var cheerio = require('cheerio')
var Crawler = require('crawler')
var url = require('url')
var fs = require('fs')
var u = require('../utils.js')
var w = require('../writer.js')
var path = require('path');
var scriptName = path.basename(__filename);

var c = new Crawler({
  maxConnections: 1,
    // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error)
    } else {
      $ = cheerio.load(res.body)
      var data = []
      $('table.datatblBlue tr').each(function () {
        var $this = $(this)
        var date = $this.find('td:nth-child(1)').text().trim().split('/')
        var end_date = new Date(date[2], date[0] - 1, date[1]).getTime() / 1000
        var link = 'http://admin.ks.gov/offices/procurement-and-contracts/bid-solicitations/'
        var sum1 = $this.find('td:nth-child(4)').text().trim()

        data.push({
          'name': $this.find('td:nth-child(3)').text().trim(),
          'description': $this.find('td:nth-child(3)').text().trim(),
          'date': 'NA',
          'closingDate': end_date,
          'link': link,
          'currency': 'NA',
          'value': 'NA',
          'category': [$this.find('td:nth-child(4)').text().trim()],
          'tenderNumber': $this.find('td:nth-child(2)').text().trim()
        })
      })
    }

    w.writeJson(data, scriptName)
    done();
  }
})

// Queue just one URL, with default callback
c.queue('http://admin.ks.gov/offices/procurement-and-contracts/bid-solicitations/')
