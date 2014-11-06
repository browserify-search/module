#! /usr/bin/env node

require('colors')
var browserifySearch = require('./index')
var program = require('commander')

program
  .usage('[options] <search terms...>')
  .option('-p, --page [num]', 'Page number (default 1)', Number, 1)
  .option('-s, --pagesize [num]', 'Results per page (default 20)', Number, 20)
  .parse(process.argv)

var q = program.args.join(' ')
var page = program.page
var pageSize = program.pagesize
browserifySearch({
  q: q,
  page: page,
  pageSize: pageSize
}, function(err, results){
  if (err) {
    console.error(err.message)
    process.exit(1)
    return
  }
  for (var i = 0; i < results.hits.length; i++){
    var hit = results.hits[i]
    console.log(hit.name.green + ' - ' + hit.description)
  }
  console.log(('Showing page ' + page + ' of ' +
    Math.ceil(results.total / pageSize) + '. ' + results.total + ' total results.').cyan)
})
