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
           // $('').each(function() {            
                
           // })
            console.log(data)
        }
        done();
    }
});


// Queue just one URL, with default callback 
 c.queue('https://procure.ohio.gov//proc/searchProcOppsResults.asp?t1=0&IN=&DBN=&SK=IT&MT=All&KST=All%20Words&OT=0&OSTAT=Active&SDT=0&SD=&ED=&A=All&AT=All&OTT=All&SDTT=-%20Select%20Type%20-%20&MTT=&OSTATT=Active');

module.exports.getData = c.length;


