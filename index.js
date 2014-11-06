var request = require('superagent')
var assert = require('assert')

module.exports = function(options, callback){
  assert(options != null)
  assert('string' === typeof options ||
         'object' === typeof options)
  
  if (typeof options === 'string'){
    options = {q: options}
  }
  request('http://browserifysearch.org/api/search')
    .query(options)
    .end(function(err, reply){
      err = err || reply.error
      if (err) return callback(err)
      callback(null, reply.body)
    })
}