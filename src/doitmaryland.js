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
            $('div#ctl00_PlaceHolderMain_ctl02__ControlWrapper_RichHtmlField ul li').each(function() {

                var $this = $(this);                                             
                var sum = $this.html().trim().split('<br>');
                var link  = u.urlify(sum[0]).split('"');
                link = link[1];                
                var data_proposal = $this.text().split(':');               
                title = data_proposal[1];
                var due  = data_proposal[0].trim().split(' ')[1].trim().split('/');
                var date = new Date(due[2],due[0]-1,due[1]).getTime()/1000;  
              
                if(typeof(title) != "undefined") {

                    data.push({
                        'name'          : title.trim(),
                        'description'   : "NA",
                        'date'          : "NA",
                        'closingDate'   : date,
                        'link'          : "http://doit.maryland.gov/contracts/Pages/bids.aspx"+link,                 
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
 c.queue('http://doit.maryland.gov/contracts/Pages/bids.aspx');

module.exports.getData = c.length;


