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
            $('div.bizOpportunities div.bizOppWrap').each(function() {
                var $this = $(this);                                
                var date  = $this.find('div.bizOppWrapInner dl:nth-child(2) dd:nth-child(2) strong').text().trim().split('/');
                var start_date = new Date(date[2],date[0]-1,date[1]).getTime()/1000;               
                
            if($this.find('div.bizOppWrapInner dl:nth-child(1) dd').text().trim() != '') {
                data.push({
                    'name'          : $this.find('div.bizOppWrapInner dl:nth-child(1) dd').text().trim(),
                    'description'   : "NA",
                    'date'          : new Date(date[2],date[0]-1,date[1]).getTime()/1000,
                    'closingDate'   : "NA",
                    //'link'          : "NA",
                    'amount'        : {
                        'currency'     : "NA",
                        'value'        : "NA",
                    },
                    'category'      : [$this.find('div.bizOppWrapInner dl:nth-child(1) dt.catName').text().trim()],
                    'tenderNumber' : $this.find('div.bizOppWrapInner dl:nth-child(2) dd:nth-child(1)').text().trim()

                });
            }
            })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('https://www2.tenderlink.com/tenders/it/');

module.exports.getData = c.length;