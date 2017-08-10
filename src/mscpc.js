var cheerio = require("cheerio");
var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var u = require('../utils.js');
var w = require('../writer.js');
var path = require('path');
var scriptName = path.basename(__filename);

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
                     'currency'     : "NA",
                     'value'        : 0,       
                     'category'      : [],
                     'tenderNumber' : "NA"
                    });
                }
            })            
        }
        w.writeJson(data, scriptName)
        done();
    }
});


// Queue just one URL, with default callback 
c.queue('http://www.mscpc.com/bid-opportunities/');



