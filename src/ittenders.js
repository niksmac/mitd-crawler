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
            $('td div.cent > table table').each(function() {
                var $this = $(this);
                var assas = "";
                if($this.find('tr:nth-child(5) td table tr td:nth-child(2)').html() != null) {
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
                        'link'          : "http://www.ittenders.com/information_technology_usa.htm/"+assas,
                        'currency'     : "NA",
                        'value'        : 0,                   
                        'category'      : $this.find('tr:nth-child(2) td table tr td:nth-child(2)').text().split(","),
                        'tenderNumber'  : $this.find('tr:nth-child(4) td table tr td:nth-child(4)').text().trim()
                    });
                }
            })            
        }
        w.writeJson(data, scriptName)
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://www.ittenders.com/information_technology_usa.htm');


// fs.readFile( process.cwd() + '/test.html', function (err, data) {
//     if (err) {
//         throw err; 
//     }

//     c.queue([{
//         html: data.toString()
//     }]);

// });
