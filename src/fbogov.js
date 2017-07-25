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
            $('table.list tr').each(function() {
                var $this = $(this);  
                if($this.find('td:nth-child(1)').html() != null) {              
                    var sum  = $this.find('td:nth-child(1)').html().trim().split('<br>'); 
                    var link = u.urlify(sum[0]).split('"');
                    link = link[1];
                }    
                var title = $this.find('td:nth-child(2) div.pagency').text().trim();              
                if($this.find('td:nth-child(1) a div:nth-child(1)').text() != '') {
                
                    data.push({ 
                        'name'          : $this.find('td:nth-child(1) a div:nth-child(1)').text().trim(),
                        'description'   : $this.find('td:nth-child(1) a div:nth-child(3)').text().trim(),
                        'date'          : new Date($this.find('td:nth-child(4)').text().trim()).getTime()/1000,
                        'closingDate'   : "NA",
                        'link'          : "https://www.fbo.gov/index"+link,
                        'currency'     : "NA",
                        'value'        : "NA",
                        'category'      : [$this.find('td:nth-child(2) div.pagency').text().trim()],
                        'tenderNumber' : $this.find('td:nth-child(1) a div:nth-child(2)').text().trim()
                    });
                }
            })           
        }
        w.writeJson(data, scriptName)
        done();
    }
});


// Queue just one URL, with default callback 
c.queue('https://www.fbo.gov/index?s=opportunity&mode=list&tab=list');
