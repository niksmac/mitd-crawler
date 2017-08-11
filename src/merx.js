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
             $('table.mainBodyTable tr td table').each(function() {
                var $this = $(this);
                var assas = ""; 
                var date =  $this.find('td:nth-child(3)').text().trim().split('/');
                var start_date = new Date(date[2],date[0]-1,date[1]).getTime()/1000;
                var close_date = $this.find('td:nth-child(4)').text().trim().split('/');
                var end_date = new Date(close_date[2],close_date[0]-1,close_date[1]).getTime()/1000;
                     
                if($this.find('td:nth-child(1)').html() != null) {
                    var summary = $this.find('td:nth-child(1)').html().trim().split('<br>');
                    assas  = u.urlify(summary[0]).split('"');
                    assas = assas[1];
                }
                if($this.find('td:nth-child(1) a').text().trim() != '') {
                    data.push({
                        'name'          : $this.find('td:nth-child(1) a').text().trim(),
                        'description'   : "NA",
                        'date'          : start_date,
                        'closingDate'   : end_date,
                        'link'          : "https://www.merx.com/iris-tenders-search.active-1470801600000-1471406399000-Last%20Week-ETENDMERX--8534-efjn-en.jsa?SD=DESC&SF=PUBLICATION_DATE"+assas,                 
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
c.queue('https://www.merx.com/iris-tenders-search.active-1470801600000-1471406399000-Last%20Week-ETENDMERX--8534-efjn-en.jsa?SD=DESC&SF=PUBLICATION_DATE');
