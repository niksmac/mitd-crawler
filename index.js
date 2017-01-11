global.config = require('konfig')()

var Crawler = require("crawler"),
  url = require('url'),
  glob = require( 'glob' ),
  path = require( 'path' ),
  colors = require('colors'),
  Table = require('cli-table2'),
  moment = require('moment');

var i = 1, c = 0;

var table = new Table({
  head: ['Sl.', 'Domain', 'How many', 'When']
  , colWidths: [6, 30, 10, 17]
});
var date = new Date();

glob.sync( './src/**/*.js' ).forEach( function( file ) {
  var name = file.replace('.js', '');
  var mname = name.replace('./src/', '');
  var hm = Math.floor(Math.random()*(30-1+1)+1);
  c+=hm;
  table.push(
    [i, mname, hm, moment().format('LTS')]
  );

  var xmname =require('./' + file);
  var logEndMsg = 'Finished ' + mname + ' ✓';
  console.log(logEndMsg.yellow);

  i++;

});

table.push(
  ['', 'Total', c, moment().format('LTS')]
);

console.log(table.toString());
