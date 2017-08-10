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
            $('p table tr:nth-child(2)').each(function() { 
                var $this = $(this);
                var title  = $this.find('td:nth-child(2)').text().trim();
                //eval(locus);
                if($this.find('td:nth-child(1)').html() != null) {
                    var sum  = $this.find('td:nth-child(1)').html().trim().split('<br>');
                    var link = u.urlify(sum[0]).split('"');
                    link = link[1];
                }
               
                if(title != '') {
                    data.push({
                        'uuid'          : $this.find('td:nth-child(1)').text().trim(),
                        'name'          : title,
                        'description'   : title,
                        'date'          : "NA",
                        'closingDate'   : "NA",
                        'link'          : "https://www.ogs.ny.gov"+link,                  
                        'currency'     : "NA",
                        'value'        : "NA",                   
                        'category'      : "NA",
                        'tenderNumber' : $this.find('td:nth-child(1)').text().trim()
                    });           
                }    
            })                       
        }
        w.writeJson(data, scriptName)
        done();
    }
});


// Queue just one URL, with default callback 
c.queue('https://www.ogs.ny.gov/purchase/snt/lists/telecom.asp');


