#!/usr/bin/env bash

PATH=$PATH:$(pwd)/node_modules/.bin

. test/assert.sh

#
# basic tests
#

function test_browserify {
  # regular
  assert "browserify $1 | node ./bin.js" $2
  # standalone
  assert "browserify -s ModuleName $1 | node ./bin.js" $2
  # bundle-collapser
  assert "browserify -p bundle-collapser/plugin $1 | node ./bin.js" $2
  # full-paths
  assert "browserify --full-paths $1 | node ./bin.js" $2
  # minified
  assert "browserify $1 | uglifyjs -mc | node ./bin.js" $2
}

test_browserify './test/cases/1' 3
test_browserify './test/cases/2' 1
test_browserify './test/cases/3/*' 2
test_browserify './test/cases/4/*' 5
test_browserify './test/cases/5' 2
test_browserify './test/cases/6/*' 4

#
# factor-bundle tests
#

browserify ./test/cases/6/x.js ./test/cases/6/y.js -p [ factor-bundle -o bundle-x.js -o bundle-y.js ] \
  -o bundle-common.js

assert "node ./bin.js < bundle-x.js" 2
assert "node ./bin.js < bundle-y.js" 1
assert "node ./bin.js < bundle-common.js" 1

rimraf bundle-*.js

#
# errors
#

assert_raises "echo console.log('yolo') | node ./bin.js" 1
assert_raises "echo yolo | node ./bin.js" 1

assert_end suite