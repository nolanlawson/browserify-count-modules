#!/usr/bin/env node

'use strict'

var concat = require('concat-stream')
// var args = require('yargs').argv
var browserifyCountModules = require('./')

process.stdin.pipe(concat(function (buf) {
  var str = buf.toString('utf8')
  browserifyCountModules(str, function (err, res) {
    if (err) {
      console.error(err)
      console.error(err.stack)
      process.exit(1)
      return
    }
    console.log(res)
    process.exit(0)
  })
})).on('error', function (err) {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})
