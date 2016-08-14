#!/usr/bin/env node

'use strict'

var concat = require('concat-stream')
var browserifyCountModules = require('./')
var yargs = require('yargs')
var argv = yargs
  .usage('Usage: $0 [ --verbose ]')
  .example('browserify index.js | $0', 'count the number of modules')
  .example('browserify --full-paths index.js | $0 --verbose', 'show a full list of modules')
  .alias('v', 'verbose')
  .describe('v', 'Verbose mode')
  .help('h')
  .alias('h', 'help')
  .argv

process.stdin.pipe(concat(function (buf) {
  var str = buf.toString('utf8')
  browserifyCountModules(str, {verbose: argv.verbose}, function (err, res) {
    if (err) {
      console.error(err)
      process.exit(1)
      return
    }
    if (argv.verbose) {
      console.log('\nTotal number of modules: ' + res.length + '\n')
      console.log('Modules:')
      console.log(res.map(function (x) { return ' - ' + x }).join('\n') + '\n')
    } else {
      console.log(res)
    }
    process.exit(0)
  })
})).on('error', function (err) {
  console.error(err)
  process.exit(1)
})
