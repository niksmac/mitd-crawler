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
             $('table.list_notice_table tr').each(function() {
                var $this = $(this);                                         

                if($this.find('td:nth-child(2) div.ln_notice_title').html() != null) {

                    var summary = $this.find('td:nth-child(2) div.ln_notice_title').html().trim().split('<br>');                    
                    assas  = u.urlify(summary[0]).split('"');
                    assas = assas[1];                   
                }
                
                if($this.find('td:nth-child(2) p:nth-child(3) span.ln_listing').text() != '') {
                 data.push({
                    'name'          : "United States",
                    'description'   : "NA",
                    'date'          : new Date($this.find('td:nth-child(4) div.ln_date').text().trim()).getTime()/1000,
                    'closingDate'   : $this.find('td:nth-child(4) div.ln_deadline').text().trim(),
                    'link'          : "http://www.dgmarket.com/tenders/list.do?sub=it-services-consulting-software-development-internet-and-support-in-United-States-72000000&locationISO=us"+assas,
                    'amount'        : {
                        'currency'     : "NA",
                        'value'        : "NA",
                    },
                    'category'      : $this.find('td:nth-child(2) p:nth-child(4) span.ln_listing').text().split(","),
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
 c.queue('http://www.dgmarket.com/tenders/list.do?sub=it-services-consulting-software-development-internet-and-support-in-United-States-72000000&locationISO=us');


module.exports.getData = c.length;