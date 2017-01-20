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
            $('div.ui-datatable-tablewrapper table tbody tr').each(function() {
                var $this = $(this);  
                if($this.find('td:nth-child(2) div:nth-child(1) div:nth-child(1)').html() != null) {              
                    var sum  = $this.find('td:nth-child(2) div:nth-child(1) div:nth-child(1)').html().trim().split('<br>'); 
                    var link = u.urlify(sum[0]).split('"');
                    link = link[5];
                }    
                var title = new Date($this.find('td:nth-child(5)').text().trim()).getTime()/1000; 
              
                if($this.find('td:nth-child(2) div:nth-child(1) div:nth-child(1)').text() != '') {
                
                    data.push({ 
                        'name'          : $this.find('td:nth-child(2) div:nth-child(1) div:nth-child(1)').text().trim(),
                        'description'   : "NA",
                        'date'          : "NA",
                        'closingDate'   : new Date($this.find('td:nth-child(5)').text().trim()).getTime()/1000,
                        'link'          : "https://www.bidsync.com"+link,
                        'currency'     : "NA",
                        'value'        : "NA",
                        'category'      : "NA",
                        'tenderNumber' : $this.find('td:nth-child(1)').text().trim()
                    });
                }
            })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
c.queue('https://www.bidsync.com/bidsync-app-web/shared/shared/embeddedSearchResults.xhtml?srchoid_override=27505&curronly=1&pastonly=null');

module.exports.getData = c.length;
