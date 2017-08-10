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
            $('td#hcontent table.nospace tr td.top').each(function() {

                var $this = $(this); 
                var sum = $this.find('table.subtitle th').html().trim().split('<br>');
                var link = u.urlify(sum[0]).split('"');
                link = link[1];

                if($this.find('table.subtitle a').text().trim() != '') {

                    data.push({
                    'name'          : $this.find('table.subtitle a').text().trim(),
                    'description'   : $this[0].children[2].data.trim(),
                    'date'          : new Date($this.find('table.subtitle span').text().trim()).getTime()/1000,
                    'closingDate'   : "NA",
                    'link'          : "https://www.tenders.wa.gov.au/watenders/index.do"+link,                  
                    'currency'     : "NA",
                    'value'        : "NA",                    
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
c.queue('https://www.tenders.wa.gov.au/watenders/index.do');



