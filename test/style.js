"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _h = require("../h");

var _diff = require("../diff");

var _patch = require("../patch");

var _createElement = require("../create-element");

var _patchCount = require("./lib/patch-count");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("style patches correctly", function (assert) {
    var leftNode = _h.h;

    var rightNode = _h.h;

    var patches = _diff.diff;
    assert.equal((0, _patchCount.patchCount)(patches), 1);

    var rootNode = _createElement.createElement;
    assert.equal(rootNode.style.border, style("border", "1px solid #000"));

    var newRoot = _patch.patch;
    assert.equal(rootNode, newRoot);

    assert.equal(newRoot.style.padding, style("padding", "5px"));
    assert.equal(newRoot.style.border, style("border", ""));

    assert.end();
});

function style(name, setValue) {
    var div = _document2.default.createElement("div");
    div.style[name] = setValue;
    return div.style[name];
}
