var cheerio = require("cheerio");
var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var u = require('../utils.js');

var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        } else {
            $ = cheerio.load(res.body);
            var data = [];
            $('div.classWithPad div.cent table tr td table').each(function() {
                var $this = $(this);
                var assas = "";
               if ($this.find('tr:nth-child(5) td table tr td:nth-child(2)').html() != null){
                    var summary = $this.find('tr:nth-child(5) td table tr td:nth-child(2)').html().trim().split('<br>');
                    assas  = u.urlify(summary[0]).split('"');
                    assas = assas[1];
               }                             

                if($this.find('tr:nth-child(1) td table tr td:nth-child(4)').text() != '') {
                    data.push({
                        'name'          : $this.find('tr:nth-child(3) td table tr td:nth-child(2)').text(),
                        'description'   : $this.find('tr:nth-child(3) td table tr td:nth-child(2)').text(),
                        'date'          : "NA",
                        'closingDate'   : new Date($this.find('tr:nth-child(4) td table tr td:nth-child(2)').text().trim()).getTime()/1000,
                        'link'          : "http://www.globaltenders.com/"+assas,                   
                        'currency'     : "INR",
                        'value'        : $this.find('tr:nth-child(5) td table tr td:nth-child(4)').text().replace(/[^\d\.]/g, ''),
                        'category'      : $this.find('tr:nth-child(2) td table tr td:nth-child(2)').text().split(","),
                        'tenderNumber'  : $this.find('tr:nth-child(4) td table tr td:nth-child(4)').text().trim()
                    });
                }    
            })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://www.globaltenders.com/search.php');

module.exports.getData = c.length;