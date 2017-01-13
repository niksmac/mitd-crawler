var cheerio = require("cheerio");
var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var u = require('../utils.js');
require('locus');

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
                var sum1 = $this.find('div.tendr_main div:nth-child(1) div.tendr_right div.tendr_left').text().trim();
               //eval(locus);
            if($this.find('div.tendr_cal div:nth-child(2) p').text().trim() != '') {
                data.push({
                    'name'          : $this.find('div.tendr_cal div:nth-child(2) p').text().trim(),
                   // 'description'   : "NA",
                   // 'date'          : new Date($this.find('td:nth-child(2)').text().trim()).getTime()/1000,
                    'closingDate'   : new Date($this.find('div.tendr_cal div:nth-child(1) p.tendr_right').text().trim()).getTime()/1000,
                    'link'          : "http://tenders.hellotrade.com/tenders.php?pid=33676653"+assas,
                    // 'amount'        : {
                    //     'currency'     : "INR",
                    //     'value'        : summary[1].replace(/[^\d\.]/g, ''),
                    // },
                    'category'      : [],
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