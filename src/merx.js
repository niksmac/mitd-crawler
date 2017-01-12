var cheerio = require("cheerio");
var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var u = require('../utils.js');
require('locus')

var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            $ = cheerio.load(res.body);
            var data = [];
             $('table.mainBodyTable tr td table').each(function() {
                var $this = $(this);
                var assas = "";            
                if($this.find('td:nth-child(1)').html() != null) {
                    var summary = $this.find('td:nth-child(1)').html().trim().split('<br>');
                    assas  = u.urlify(summary[0]).split('"');
                    assas = assas[1];
                }
                if($this.find('td:nth-child(2)').text().trim() != '') {
                data.push({
                    'name'          : $this.find('td:nth-child(2)').text().trim(),
                    'description'   : "NA",
                    'date'          : $this.find('td:nth-child(3)').text().trim(),
                    'closingDate'   : $this.find('td:nth-child(4)').text().trim(),
                    'link'          : "https://www.merx.com/iris-tenders-search.active-1470801600000-1471406399000-Last%20Week-ETENDMERX--8534-efjn-en.jsa?SD=DESC&SF=PUBLICATION_DATE"+assas,
                    'amount'        : {
                        'currency'     : "NA",
                        'value'        : "NA",
                    },
                    'category'      : [],
                    'tenderNumber' : "NA"

                });
                }   
             })
            console.log(data);
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('https://www.merx.com/iris-tenders-search.active-1470801600000-1471406399000-Last%20Week-ETENDMERX--8534-efjn-en.jsa?SD=DESC&SF=PUBLICATION_DATE');


module.exports.getData = c.length;