"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _createElement = require("../create-element.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("coerce numbers to strings in children array", function (assert) {
    var leftNode = (0, _h.h)("div", ["clicked ", 1336, " times"]);
    var rightNode = (0, _h.h)("div", ["clicked ", 1337, " times"]);
    var rootNode = (0, _createElement.createElement)(leftNode);
    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(leftNode, rightNode));
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>');
    assert.end();
});