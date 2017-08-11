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
            var data = [];            
            $('div.tender-results div.tender-show div.summary div.brief').each(function() {

                var $this = $(this);                                
                var name = $this.find('div.name').text();
                var date = $this.find('div.views').text().trim();
                date = date.substr(date.length - 10).split('/');
                date = new Date(date[2], date[0] - 1, date[1]).getTime() / 1000;
                //eval(locus);

                if($this.find('div.name').text() != '') {
                    data.push({
                        'name'          : $this.find('div.name').text(),
                        'description'   : "NA",
                        'date'          : date,
                        'closingDate'   : "NA",
                        'link'          : "https://www2.tenderlink.com/tenders/it/",
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
c.queue('https://www2.tenderlink.com/tenders/it/');