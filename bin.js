#!/usr/bin/env node

'use strict'

var concat = require('concat-stream')
var args = require('yargs').argv
var browserifyCountModules = require('./')

process.stdin.pipe(concat(function (buf) {
  var str = buf.toString('utf8')
  browserifyCountModules(str, {verbose: args.verbose}, function (err, res) {
    if (err) {
      console.error(err)
      process.exit(1)
      return
    }
    if (args.verbose) {
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
