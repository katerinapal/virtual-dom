"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _createElement = require("../create-element.js");

var _assertEqualDom = require("./lib/assert-equal-dom.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("dom node style", function (assert) {
    var a = _h.h;

    var b = _h.h;

    var rootNode = _createElement.createElement;
    assert.equal(rootNode.style.border, style("border", "none"));
    assert.equal(rootNode.style.className, style("className", "oops"));
    assert.equal(rootNode.style.display, style("display", "none"));
    var s1 = rootNode.style;
    var equalNode = _createElement.createElement;
    assert.equal(equalNode.style.border, style("border", "1px solid #000"));
    assert.equal(equalNode.style.className, style("className", "oops"));
    assert.equal(equalNode.style.display, style("display", ""));
    var newRoot = _patch.patch;
    var s2 = newRoot.style;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.style.border, style("border", "1px solid #000"));
    assert.equal(newRoot.style.className, style("className", "oops"));
    assert.equal(newRoot.style.display, style("display", ""));
    assert.equal(s1, s2);
    assert.end();
});

(0, _tape2.default)("dom node dataset", function (assert) {
    var a = _h.h;
    var b = _h.h;
    var rootNode = _createElement.createElement;
    var d1 = rootNode.dataset;
    assert.equal(rootNode.dataset.foo, "bar");
    assert.equal(rootNode.dataset.bar, "oops");
    var equalNode = _createElement.createElement;
    var newRoot = _patch.patch;
    var d2 = newRoot.dataset;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.dataset.foo, "baz");
    assert.equal(newRoot.dataset.bar, "oops");
    assert.equal(d1, d2);
    assert.end();
});

(0, _tape2.default)("dom node attributes", function (assert) {
    var a = _h.h;
    var b = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;

    var newRoot = _patch.patch;

    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.getAttribute("foo"), "baz");
    assert.equal(newRoot.getAttribute("bar"), "oops");
    assert.end();
});

(0, _tape2.default)("patch nested properties in right only", function (assert) {
    var prev = _h.h;
    var curr = _h.h;

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.style.display, style("display", "none"));

    assert.end();
});

(0, _tape2.default)("null properties", function (assert) {
    var prev = _h.h;
    var curr = _h.h;

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA, "");
    assert.equal(elem.propC, null);
    assert.equal(elem.propB, "apples");

    assert.end();
});

(0, _tape2.default)("replace object with value", function (assert) {
    var prev = _h.h;
    var curr = _h.h;

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA, null);
    assert.end();
});

(0, _tape2.default)("create object on node for nested properties", function (assert) {
    var prev = _h.h;
    var curr = _h.h;

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA.nested, true);
    assert.end();
});

function createAndPatch(prev, curr) {
    var elem = _createElement.createElement;
    var patches = _diff.diff;
    return _patch.patch;
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = _createElement.createElement;
    node.style[name] = value;
    return node.style[name];
}
