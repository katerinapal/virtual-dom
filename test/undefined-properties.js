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
    var node = _h.h;
    var rootNode = _createElement.createElement;
    assert.ok(!("special" in rootNode));
    assert.end();
});

(0, _tape2.default)("undefined removes all previous styles", function (assert) {
    var leftNode = _h.h;

    var rightNode = _h.h;

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.style.display, style("display", ""));
    assert.equal(rootNode.style.border, style("border", ""));
    assert.end();
});

(0, _tape2.default)("undefined style removes individual styles", function (assert) {
    var leftNode = _h.h;
    var rightNode = _h.h;

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

    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;
    assert.equal(rootNode.value, "hello");

    var newRoot = _patch.patch;
    assert.equal(newRoot.value, "hello");

    assert.end();
});

(0, _tape2.default)("undefined nulls other complex types", function (assert) {
    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;
    assert.ok((0, _isObject2.default)(rootNode.special));

    var newRoot = _patch.patch;
    assert.equal(newRoot.special, null);

    assert.end();
});

(0, _tape2.default)("null not ignored for value", function (assert) {
    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = createAndPatch(leftNode, rightNode);

    assert.equal(rootNode.value, property("input", "value", null));
    assert.end();
});

(0, _tape2.default)("null not ignored for objects", function (assert) {
    var leftNode = _h.h;
    var rightNode = _h.h;

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

    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;
    assert.equal(rootNode.value, "hello");

    var newRoot = _patch.patch;
    assert.equal(newRoot.value, property("input", "value", null));

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

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = _createElement.createElement;
    node[prop] = value;
    return node[prop];
}
