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
            $('td div.cent > table table').each(function() {
                var $this = $(this);
                var summary = $this.find('td:nth-child(1) table tr td:nth-child(2)').html();                                                         
                if($this.find('tr:nth-child(1) td table tr td:nth-child(4)').text() != '') {
               
                data.push({
                    'name'          : $this.find('tr:nth-child(1) td table tr td:nth-child(4)').text().trim(),
                    'description'   : $this.find('tr:nth-child(3) td table tr td:nth-child(2)').text(),
                    'date'          : "NA",
                    'closingDate'   : new Date($this.find('tr:nth-child(4) td table tr td:nth-child(2)').text().trim()).getTime()/1000,
                    // 'link'          : assas[3],
                     'amount'        : {
                         'currency'     : "NA",
                         'value'        : "NA",
                     },
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
 c.queue('http://www.ittenders.com/information_technology_usa.htm');


// fs.readFile( process.cwd() + '/test.html', function (err, data) {
//     if (err) {
//         throw err; 
//     }

//     c.queue([{
//         html: data.toString()
//     }]);

// });


module.exports.getData = c.length;