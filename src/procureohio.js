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
            $('div#full table.results tr').each(function() { 
                var $this = $(this);
                var date  = $this.find('td:nth-child(8)').text().trim().split('/');
                var start_date = new Date(date[2],date[0]-1,date[1]).getTime()/1000;
                var end_date = $this.find('td:nth-child(9)').text().trim().split('/');
                var close_date = new Date(end_date[2],end_date[0]-1,end_date[1]).getTime()/1000;

                if($this.find('td:nth-child(7)').html() != null) {
                var sum = $this.find('td:nth-child(7)').html().trim().split('<br>');
                var link  = u.urlify(sum[0]).split('"');
                link = link[1]
                }

                if($this.find('td:nth-child(1)').text().trim() != '') {
                    data.push({
                        'uuid' : $this.find('td:nth-child(7)').text().trim(),
                        'name'          : $this.find('td:nth-child(1)').text().trim(),
                        'description'   : "",
                        'date'          : start_date,
                        'closingDate'   : close_date,
                        'link'          : "https://procure.ohio.gov"+link,                  
                        'currency'     : "NA",
                        'value'        : "NA",                   
                        'category'      : [$this.find('td:nth-child(2)').text().trim()],
                        'tenderNumber' : $this.find('td:nth-child(7)').text().trim()
                    });           
                }    
            })            
        }
        w.writeJson(data, scriptName)
        done();
    }
});


// Queue just one URL, with default callback 
c.queue('https://procure.ohio.gov//proc/searchProcOppsResults.asp?t1=0&IN=&DBN=&SK=IT&MT=All&KST=All%20Words&OT=0&OSTAT=Active&SDT=0&SD=&ED=&A=All&AT=All&OTT=All&SDTT=-%20Select%20Type%20-%20&MTT=&OSTATT=Active');



