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
            $('div#filtertenderList table tr table').each(function() {

            var $this = $(this);               
            if($this.find('tr:nth-child(2) td:nth-child(1) i').text() != '') {
                
                data.push({ 
                     'name'          : $this.find('tr:nth-child(2) td:nth-child(1) i').text().trim(),
                     'description'   : "NA",
                     'date'          : "NA",
                     'closingDate'   : new Date($this.find('tr:nth-child(1) td:nth-child(3) span.orage-text').text().trim()).getTime()/1000,
                     //'link'          : assas[3],
                     'amount'        : {
                        'currency'     : "NA",
                        'value'        : "NA",
                     },
                     'category'      : [$this.find('tr:nth-child(1) td:nth-child(1) span').text().split(":")[1].trim()],
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
//c.queue('http://www.tendertiger.com/quicksearch.aspx?st=qs&SerCat=10&SerText=United%20States%20of%20America&tt=&si=2&ct=1');


fs.readFile( process.cwd() + '/test1.html', function (err, data) {
    if (err) {
        throw err; 
    }

    c.queue([{
        html: data.toString()
    }]);

});

module.exports.getData = c.length;