"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _isObject = require("is-object");

var _isObject2 = _interopRequireDefault(_isObject);

var _h = require("../h.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _createElement = require("../create-element.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("undefined props are not set in create-element", function (assert) {
    var node = (0, _h.h)("div", { special: undefined });
    var rootNode = (0, _createElement.createElement)(node);
    assert.ok(!("special" in rootNode));
    assert.end();
});

(0, _tape2.default)("undefined removes all previous styles", function (assert) {
    var leftNode = (0, _h.h)("div", {
        style: {
            display: "none",
            border: "1px solid #000"
        }
    });

    var rightNode = (0, _h.h)("div", {
        style: undefined
    });

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.style.display, style("display", ""));
    assert.equal(rootNode.style.border, style("border", ""));
    assert.end();
});

(0, _tape2.default)("undefined style removes individual styles", function (assert) {
    var leftNode = (0, _h.h)("div", { "style": { "display": "none" } });
    var rightNode = (0, _h.h)("div", { "style": undefined });

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.style.display, style("display", ""));
    assert.end();
});

(0, _tape2.default)("undefined ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value;
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value;
        if (value !== rootNode[propName]) {
            rootNode[propName] = value;
        }
    };

    var leftNode = (0, _h.h)("input", { value: new CheckNodeBeforeSet("hello") });
    var rightNode = (0, _h.h)("input", { value: undefined });

    var rootNode = (0, _createElement.createElement)(leftNode);
    assert.equal(rootNode.value, "hello");

    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(leftNode, rightNode));
    assert.equal(newRoot.value, "hello");

    assert.end();
});

(0, _tape2.default)("undefined nulls other complex types", function (assert) {
    var leftNode = (0, _h.h)("input", { special: {} });
    var rightNode = (0, _h.h)("input", { special: null });

    var rootNode = (0, _createElement.createElement)(leftNode);
    assert.ok((0, _isObject2.default)(rootNode.special));

    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(leftNode, rightNode));
    assert.equal(newRoot.special, null);

    assert.end();
});

(0, _tape2.default)("null not ignored for value", function (assert) {
    var leftNode = (0, _h.h)("input", { value: "hello" });
    var rightNode = (0, _h.h)("input", { value: null });

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.value, property("input", "value", null));
    assert.end();
});

(0, _tape2.default)("null not ignored for objects", function (assert) {
    var leftNode = (0, _h.h)("div", { "test": { "complex": "object" } });
    var rightNode = (0, _h.h)("div", { "test": null });

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.test, null);
    assert.end();
});

(0, _tape2.default)("null not ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value;
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value;
        if (value !== rootNode[propName]) {
            rootNode.value = value;
        }
    };

    var leftNode = (0, _h.h)("input", { value: new CheckNodeBeforeSet("hello") });
    var rightNode = (0, _h.h)("input", { value: null });

    var rootNode = (0, _createElement.createElement)(leftNode);
    assert.equal(rootNode.value, "hello");

    var newRoot = (0, _patch.patch)(rootNode, (0, _diff.diff)(leftNode, rightNode));
    assert.equal(newRoot.value, property("input", "value", null));

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

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = (0, _createElement.createElement)((0, _h.h)(tag));
    node[prop] = value;
    return node[prop];
}
