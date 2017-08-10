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
            $('div#notice-list > div').each(function() {
                var $this = $(this);                                 
                if($this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) div._3yAd0').html() != null) {
                var sum = $this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) div._3yAd0').html().trim().split('<br>');
                var assas  = u.urlify(sum[0]).split('"');
                assas = assas[3]; 
                }
               
                if($this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) h2').text() != '') {
                    data.push({
                        'name'          : $this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) h2').text().trim(),
                        'description'   : $this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) pre').text().trim(),
                        'date'          : new Date($this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) div._5XYYn span:nth-child(4)').text().trim()).getTime()/1000,
                        'closingDate'   : new Date($this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) div._5XYYn span:nth-child(5) span:nth-child(2)').text().trim()).getTime()/1000,
                        'link'          : "https://oppex.com/search?description%5B0%5D%5Bvalue%5D=IT&description%5B0%5D%5Boperator%5D=OR&description%5B0%5D%5Bstrict%5D=false&country%5B0%5D%5Bvalue%5D=US&country%5B0%5D%5Bstrict%5D=false&country%5B0%5D%5Boperator%5D=OR&deadlineFrom%5Bvalue%5D=2016-08-"+assas,                    
                        'currency'     : "NA",
                        'value'        : 0,
                        'category'      : [$this.find('div:nth-child(1) div:nth-child(2) div:nth-child(2) div._5XYYn span._2EnoJ').text().trim()],
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
c.queue('https://oppex.com/search?description%5B0%5D%5Bvalue%5D=IT&description%5B0%5D%5Boperator%5D=OR&description%5B0%5D%5Bstrict%5D=false&country%5B0%5D%5Bvalue%5D=US&country%5B0%5D%5Bstrict%5D=false&country%5B0%5D%5Boperator%5D=OR&deadlineFrom%5Bvalue%5D=2016-08-');


