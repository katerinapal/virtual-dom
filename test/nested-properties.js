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
    var a = (0, _h.h)("div", {
        style: {
            border: "none",
            className: "oops",
            display: "none"
        }
    });

    var b = (0, _h.h)("div", {
        style: {
            border: "1px solid #000",
            className: "oops",
            display: ""
        }
    });

    var rootNode = (0, _createElement.createElement)(a);
    assert.equal(rootNode.style.border, style("border", "none"));
    assert.equal(rootNode.style.className, style("className", "oops"));
    assert.equal(rootNode.style.display, style("display", "none"));
    var s1 = rootNode.style;
    var equalNode = (0, _createElement.createElement)(b);
    assert.equal(equalNode.style.border, style("border", "1px solid #000"));
    assert.equal(equalNode.style.className, style("className", "oops"));
    assert.equal(equalNode.style.display, style("display", ""));
    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(a, b));
    var s2 = newRoot.style;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.style.border, style("border", "1px solid #000"));
    assert.equal(newRoot.style.className, style("className", "oops"));
    assert.equal(newRoot.style.display, style("display", ""));
    assert.equal(s1, s2);
    assert.end();
});

(0, _tape2.default)("dom node dataset", function (assert) {
    var a = (0, _h.h)("div", { dataset: { foo: "bar", bar: "oops" } });
    var b = (0, _h.h)("div", { dataset: { foo: "baz", bar: "oops" } });
    var rootNode = (0, _createElement.createElement)(a);
    var d1 = rootNode.dataset;
    assert.equal(rootNode.dataset.foo, "bar");
    assert.equal(rootNode.dataset.bar, "oops");
    var equalNode = (0, _createElement.createElement)(b);
    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(a, b));
    var d2 = newRoot.dataset;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.dataset.foo, "baz");
    assert.equal(newRoot.dataset.bar, "oops");
    assert.equal(d1, d2);
    assert.end();
});

(0, _tape2.default)("dom node attributes", function (assert) {
    var a = (0, _h.h)("div", { attributes: { foo: "bar", bar: "oops" } });
    var b = (0, _h.h)("div", { attributes: { foo: "baz", bar: "oops" } });
    var rootNode = (0, _createElement.createElement)(a);
    var equalNode = (0, _createElement.createElement)(b);

    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(a, b));

    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.equal(newRoot.getAttribute("foo"), "baz");
    assert.equal(newRoot.getAttribute("bar"), "oops");
    assert.end();
});

(0, _tape2.default)("patch nested properties in right only", function (assert) {
    var prev = (0, _h.h)("div");
    var curr = (0, _h.h)("div", { style: { display: "none" } });

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.style.display, style("display", "none"));

    assert.end();
});

(0, _tape2.default)("null properties", function (assert) {
    var prev = (0, _h.h)("div", { propA: "bar", propC: {} });
    var curr = (0, _h.h)("div", { propB: "apples" });

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA, "");
    assert.equal(elem.propC, null);
    assert.equal(elem.propB, "apples");

    assert.end();
});

(0, _tape2.default)("replace object with value", function (assert) {
    var prev = (0, _h.h)("div", { propA: { foo: "bar" } });
    var curr = (0, _h.h)("div", { propA: null });

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA, null);
    assert.end();
});

(0, _tape2.default)("create object on node for nested properties", function (assert) {
    var prev = (0, _h.h)("div", { propA: null });
    var curr = (0, _h.h)("div", { propA: { nested: true } });

    var elem = createAndPatch(prev, curr);

    assert.equal(elem.propA.nested, true);
    assert.end();
});

function createAndPatch(prev, curr) {
    var elem = (0, _createElement.createElement)(prev);
    var patches = (0, _diff.diff)(prev, curr);
    return (0, _patch.patch)(elem, patches);
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = (0, _createElement.createElement)((0, _h.h)());
    node.style[name] = value;
    return node.style[name];
}