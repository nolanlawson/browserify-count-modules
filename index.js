'use strict'

var acorn = require('acorn')
var walk = require('walk-ast')

function browserifyCountModules (jsString, cb) {
  var ast = acorn.parse(jsString)
  walk(ast, function (node) {
    if (node.type === 'ObjectExpression' &&
      node.parentNode.type === 'CallExpression' &&
      node.parentNode.callee && node.parentNode.callee.type === 'FunctionExpression') {
      cb(null, node.properties.length)
    }
  })

  cb(new Error("Couldn't parse this file. Please pipe in a Browserify bundle."))
}

module.exports = browserifyCountModules
