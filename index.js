'use strict'

var acorn = require('acorn')
var walk = require('walk-ast')
var Map = require('es6-map')

function browserifyCountModules (jsString, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var ast = acorn.parse(jsString)

  function parseForVerbose () {
    var modules = []
    walk(ast, function (node) {
      if (node.type === 'ArrayExpression' &&
        node.parentNode.type === 'CallExpression' &&
        node.parentNode.callee.type === 'FunctionExpression') {
        modules = modules.concat(node.elements.map(function (el) {
          return el.value
        }))
      }
    })
    if (modules.length && typeof modules[0] === 'string') {
      return cb(null, modules.sort())
    }
    cb(new Error('Could not parse. ' +
      'Verbose mode requires browserify --full-paths. Is this a full-paths file?'))
  }

  function parseForCountOnly () {
    walk(ast, function (node) {
      if (node.type === 'ObjectExpression' &&
        node.parentNode.type === 'CallExpression' &&
        node.parentNode.callee.type === 'FunctionExpression') {
        if (opts.verbose) {
          var mappings = new Map()
          node.properties.forEach(function (prop) {
            prop.value.elements[ 1 ].properties.forEach(function (prop) {
              console.log('prop.value.raw', prop.value.raw, 'prop.key.raw', prop.key.raw)
              mappings.set(prop.value.raw, prop.key.raw)
            })
          })
          var values = []
          mappings.forEach(function (value, key) {
            values.push(value)
          })
          values = values.sort()
          cb(null, values)
        } else {
          cb(null, node.properties.length)
        }
      }
    })
    cb(new Error("Couldn't parse this file. Please pipe in a Browserify bundle."))
  }

  if (opts.verbose) {
    parseForVerbose()
  } else {
    parseForCountOnly()
  }
}

module.exports = browserifyCountModules
