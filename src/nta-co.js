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
            $('.view-id-list_of_tenders table tbody tr').each(function() {
                var $this = $(this);                                
                var sum  = $this.find('.views-field-title').html().split('"');  
                var link  = 'http://www.nta.co.il' + u.urlify(sum[1]);  
                var date = $this.find('.views-field-field-date-of-publication').text().trim().split('.');
                var start_date = new Date(date[2],date[0]-1,date[1]).getTime()/1000;
                var last_date = $this.find('.views-field-field-last-date').text().trim().split('.');
                var end_date = new Date(last_date[2],last_date[0]-1,last_date[1]).getTime()/1000;  
               
            if($this.find('.views-field-title').text().trim() != '') {
                data.push({
                    'name'          : $this.find('.views-field-title').text().trim(),
                    'description'   : "NA",
                    'date'          : start_date,
                    'closingDate'   : end_date,
                    'link'          : link,
                     'amount'        : {
                         'currency'     : "NA",
                         'value'        : "NA",
                     },
                    'category'      : [$this.find('.views-field-field-domains').text().trim()],
                    'tenderNumber' : $this.find('views-field-field-tender-number').text().trim()

                });
            }
            })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://www.nta.co.il/en/tenders');

module.exports.getData = c.length;


