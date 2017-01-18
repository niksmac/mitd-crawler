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
            $('form[name=listform]').next( "tr" ).each(function() {
                
                if($this.find('td:nth-child(2)').text() != null) {
                var $this = $(this);

               //var summary = $this.find('td:nth-child(2)').text();
                eval(locus);
                
                data.push({
                    'name'          : $this.find('td:nth-child(1)').text().trim(),
                    'description'   : "NA",
                    //'date'          : new Date($this.find('td:nth-child(2)').text().trim()).getTime()/1000,
                    //'closingDate'   : new Date($this.find('td:nth-child(2)').text().trim()).getTime()/1000,
                    //'link'          : assas[3],
                    'amount'        : {
                        'currency'     : "NA",
                        'value'        : "NA",
                    },
                    'category'      : [],
                    'tenderNumber' : "NA"

                });
            }
            })
            //console.log(data)
        }
    
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://www.bidmain.com/government_bids/index.htm?actsearch=1&ftype=1&fregion=&fkeyword=Information+Technology&fonlytitle=1&x=0&y=0');

module.exports.getData = c.length;