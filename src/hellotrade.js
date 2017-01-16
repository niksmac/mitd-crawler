var cheerio = require("cheerio");
var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var u = require('../utils.js');

var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            $ = cheerio.load(res.body);
            var data = [];
            $('div.wd_sm div.ten_sm_box').each(function() {
                var $this = $(this);                
                var summary = $this.find('p').html().trim().split('<br>');                
                var assas  = u.urlify(summary[0]).split('"');             
                
            if($this.find('div.tendr_cal div:nth-child(2) p').text().trim() != '') {
                data.push({
                    'name'          : $this.find('div.tendr_cal div:nth-child(2) p').text().trim(),
                    'description'   : $this.find('div.tendr_main div.tendr_right div:nth-child(1) p.tendr_md').text().trim(),
                    'date'          : "NA",
                    'closingDate'   : new Date($this.find('div.tendr_cal div:nth-child(1) p.tendr_right').text().trim()).getTime()/1000,
                    'link'          : "http://tenders.hellotrade.com/tenders.php?pid=33676653"+assas,
                    'amount'        : {
                        'currency'     : "USD",
                        'value'        : $this.find('div.tendr_main div.ht_100').text().replace(/[^\d\.]/g, ''),
                    },
                    'category'      : [$this.find('div.tendr_main div.tendr_right div:nth-child(2) p.tendr_md').text().trim()],
                    'tenderNumber' : "NA"

                });
            }
            })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://tenders.hellotrade.com/tenders.php?pid=33676653');

module.exports.getData = c.length;