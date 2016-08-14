'use strict'

var acorn = require('acorn')
var walk = require('walk-ast')
var uniq = require('lodash.uniq')

function getDepth (node) {
  var depth = 1
  while ((node = node.parentNode)) {
    depth++
  }
  return depth
}

function browserifyCountModules (jsString, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  var ast = acorn.parse(jsString)

  function parseForVerbose () {
    var modules = []
    // You really have to look at the browserify --full-paths output
    // to understand what's going on here... the ArrayExpressions are at the end
    // and enumerate the top-level paths. then there are also ObjectExpressions
    // inside which define the dependencies. I just grab them all and then uniq()
    // at the end.
    // The getDepth() checks are to ensure we ignore any browserify bundles-within-bundles,
    // e.g. in case somebody literally included a browserify bundle itself within a module.
    walk(ast, function (node) {
      if (node.type === 'ArrayExpression' &&
        node.parentNode.type === 'CallExpression' &&
        node.parentNode.callee.type === 'FunctionExpression' &&
        getDepth(node) === 4) {
        modules = modules.concat(node.elements.map(function (el) {
          return el.value
        }))
      } else if (node.type === 'ObjectExpression' &&
        node.parentNode.type === 'ArrayExpression' &&
        getDepth(node) === 6) {
        node.properties.forEach(function (prop) {
          modules.push(prop.value.value)
        })
      }
    })
    modules = modules.filter(function (mod) {
      return typeof mod === 'string' // excluded bundles-within-bundles and other extranea
    })
    if (modules.length) {
      return cb(null, uniq(modules).sort())
    }
    cb(new Error("Couldn't parse this input. " +
      'Verbose mode requires browserify --full-paths. Is this a full-paths file?'))
  }

  function parseForCountOnly () {
    // This seems to consistently match the Browserify modules definition and gives the uniq'd count.
    // Exiting early ensures that we ignore Browserify bundles-within-bundles.
    walk(ast, function (node) {
      if (node.type === 'ObjectExpression' &&
        node.parentNode.type === 'CallExpression' &&
        node.parentNode.callee.type === 'FunctionExpression') {
        cb(null, node.properties.length)
      }
    })
    cb(new Error("Couldn't parse this input. Are you sure it's a Browserify bundle?"))
  }

  if (opts.verbose) {
    parseForVerbose()
  } else {
    parseForCountOnly()
  }
}

module.exports = browserifyCountModules
