"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _createElement = require("../create-element.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("coerce numbers to strings in children array", function (assert) {
    var leftNode = _h.h;
    var rightNode = _h.h;
    var rootNode = _createElement.createElement;
    var newRoot = _patch.patch;
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>');
    assert.end();
});
