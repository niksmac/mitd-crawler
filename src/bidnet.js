var cheerio = require('cheerio')
var Crawler = require('crawler')
var url = require('url')
var fs = require('fs')
var u = require('../utils.js')
var w = require('../writer.js')

var c = new Crawler({
  maxConnections: 1,
    // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error)
    } else {
      $ = cheerio.load(res.body)
      var data = []
      $('div.mAuto table tbody tr').each(function () {
        var $this = $(this)
        if ($this.find('td:nth-child(3)').html() != null) {
          var summary = $this.find('td:nth-child(3)').html().trim().split('<br>')
          var assas = u.urlify(summary[0]).split('"')
          assas = assas[1]
        }
        if ($this.find('td:nth-child(1) a').text() != '') {
          data.push({
            'name': $this.find('td:nth-child(3)').text().trim(),
            'description': 'NA',
            'date': 'NA',
            'closingDate': 'NA',
            'link': 'http://www.bidnet.com/closed-government-contracts/information-technology---telecom---electronics-bids' + assas,
            'currency': 'NA',
            'value': 'NA',
            'category': [],
            'tenderNumber': 'NA'
          })
        }
      })
    }
    w.writeJson(data)
    done()
  }
})

// Queue just one URL, with default callback
c.queue('http://www.bidnet.com/closed-government-contracts/information-technology---telecom---electronics-bids')

module.exports.getData = c.length
