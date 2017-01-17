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
            var title = "";
            var data = [];
            $('div.bidopp div.row div.col-md-6').each(function() {

                var $this = $(this);                                             
                var sum  = $this.html().trim().split('<br>');
                var link  = u.urlify(sum[0]).split('"');
                link = link[1];  
                
                 if($this.text().trim() != '') {

                     data.push({
                     'name'          : $this.text().trim(),
                     'description'   : "NA",
                     'date'          : "NA",
                     'closingDate'   : "NA",
                     'link'          : link,
                     'amount'        : {
                         'currency'     : "NA",
                         'value'        : "NA",
                     },
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
 c.queue('http://www.mscpc.com/bid-opportunities/');

module.exports.getData = c.length;


