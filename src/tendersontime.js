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
            var title = "";
            var data = [];
            $('table.t_s tbody tr').each(function() {

                var $this = $(this);                                             
                var date = $this.find('td:nth-child(3)').text().trim();
                var clean = date.replace(/nd/g,"").replace(/st/g,"").replace(/th/g,"").replace(/rd/g,"");
                var end_date = new Date(clean).getTime()/1000;
                var sum = $this.find('td:nth-child(2)').html().trim().split('<br>');
                var link  = u.urlify(sum[0]).split('"');
                link = link[1];   
                 
                if($this.find('td:nth-child(2)').text().trim() != '') {

                    data.push({
                        'name'          : $this.find('td:nth-child(2)').text().trim(),
                        'description'   : "NA",
                        'date'          : "NA",
                        'closingDate'   : end_date,
                        'link'          : "http://www.tendersontime.com/search-list.php"+link,                 
                        'currency'     : "NA",
                        'value'        : "NA",                  
                        'category'      : [],
                        'tenderNumber' : "NA"
                    });
                }
            })
            
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('http://www.tendersontime.com/search-list.php');

module.exports.getData = c.length;


