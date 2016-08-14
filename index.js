'use strict'

var concat = require('concat-stream')
var acorn = require('acorn')
var walk = require('walk-ast')

process.stdin.pipe(concat(function (buf) {
  var str = buf.toString('utf8')

  var ast = acorn.parse(str)
  walk(ast, function (node) {
    if (node.type === 'ObjectExpression' &&
      node.parentNode.type === 'CallExpression' &&
      node.parentNode.callee && node.parentNode.callee.type === 'FunctionExpression') {
      console.log(node.properties.length)
      process.exit(0)
    }
  })

  console.error("Couldn't parse this file. Please pipe in a Browserify bundle.")
  process.exit(1)
})).on('error', function (err) {
  console.error(err)
  process.exit(1)
})