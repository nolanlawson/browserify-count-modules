
// side effects from a derequire'd bundle
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.yolo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
  module.exports = function (n) { return n * 50 }

},{}],2:[function(_dereq_,module,exports){
  var z = _dereq_('./z.js')
  var w = _dereq_('./w.js')
  console.log(z(5) * w(2))

},{"./w.js":1,"./z.js":4}],3:[function(_dereq_,module,exports){
  var z = _dereq_('./z.js')
  console.log(z(2) + 111)

},{"./z.js":4}],4:[function(_dereq_,module,exports){
  module.exports = function (n) { return n * 111 }

},{}]},{},[1,2,3,4])(4)
});

// more side effects
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.yolo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/nolan/workspace/browserify-count-modules/test/cases/6/w.js":[function(_dereq_,module,exports){
  module.exports = function (n) { return n * 50 }

},{}],"/Users/nolan/workspace/browserify-count-modules/test/cases/6/x.js":[function(_dereq_,module,exports){
  var z = _dereq_('./z.js')
  var w = _dereq_('./w.js')
  console.log(z(5) * w(2))

},{"./w.js":"/Users/nolan/workspace/browserify-count-modules/test/cases/6/w.js","./z.js":"/Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js"}],"/Users/nolan/workspace/browserify-count-modules/test/cases/6/y.js":[function(_dereq_,module,exports){
  var z = _dereq_('./z.js')
  console.log(z(2) + 111)

},{"./z.js":"/Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js"}],"/Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js":[function(_dereq_,module,exports){
  module.exports = function (n) { return n * 111 }

},{}]},{},["/Users/nolan/workspace/browserify-count-modules/test/cases/6/w.js","/Users/nolan/workspace/browserify-count-modules/test/cases/6/x.js","/Users/nolan/workspace/browserify-count-modules/test/cases/6/y.js","/Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js"])("/Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js")
});

module.exports = 'hello'

