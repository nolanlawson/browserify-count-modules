browserify-count-modules
========

Count the total number of modules in a Browserify bundle.

Install
---

    npm install -g browserify-count-modules

CLI Usage
---

    browserify path/to/module/root | bcm

This will output the total number of modules as an integer.

This tool correctly handles `--standalone`, `factor-bundle`, and `bundle-collapser` as well. Just pass in any
Browserify bundle and it'll work.

#### Verbose mode

Using the `--verbose` flag, you can also get a full list of modules in the bundle:

    browserify --full-paths path/to/module/root | bcm --verbose

This prints out something like:

```
Total number of modules: 4

Modules:
 - /Users/nolan/workspace/browserify-count-modules/test/cases/6/w.js
 - /Users/nolan/workspace/browserify-count-modules/test/cases/6/x.js
 - /Users/nolan/workspace/browserify-count-modules/test/cases/6/y.js
 - /Users/nolan/workspace/browserify-count-modules/test/cases/6/z.js
```

Note that this only works if you use `--full-paths` with Browserify.

JavaScript API
----

Via the JavaScript API, you can get the total count of modules for a given JavaScript bundle
by passing it in as a string. The count you get back will be an integer.

```js
var browserifyCountModules = require('browserify-count-modules')

var jsFile = readFileSync('./my-bundle.js', 'utf8')

browserifyCountModules(jsFile, function (err, count) {
  if (err) {
    return 'oh no an error'
  }
  console.log('here is the count:', count)
})
```