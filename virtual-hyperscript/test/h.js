"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _evStore = require("ev-store");

var _evStore2 = _interopRequireDefault(_evStore);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("h is a function", function (assert) {
    assert.equal(typeof _index.h === "undefined" ? "undefined" : _typeof(_index.h), "function");
    assert.end();
});

(0, _tape2.default)("h returns a vnode", function (assert) {
    assert.equal((0, _index.h)("div").tagName, "DIV");

    assert.end();
});

(0, _tape2.default)("h defaults tagName to uppercase", function (assert) {
    assert.equal((0, _index.h)("").tagName, "DIV");
    assert.equal((0, _index.h)("div").tagName, "DIV");
    assert.end();
});

(0, _tape2.default)("h preserves tagName case if namespace is given", function (assert) {
    assert.equal((0, _index.h)("test", { namespace: "http://www.w3.org/XML/1998/namespace" }).tagName, "test");
    assert.end();
});

(0, _tape2.default)("h has props", function (assert) {
    assert.equal((0, _index.h)("div", {
        foo: "bar"
    }).properties.foo, "bar");

    assert.end();
});

(0, _tape2.default)("h with text", function (assert) {
    var node = (0, _index.h)("div", "text");

    assert.equal(node.children[0].text, "text");

    assert.end();
});

(0, _tape2.default)("h with key", function (assert) {
    var node = (0, _index.h)("div", { key: "bar" });

    assert.equal(node.key, "bar");

    assert.end();
});

(0, _tape2.default)("h with ev-", function (assert) {
    var node = (0, _index.h)("div", { "ev-foo": "bar" });

    assert.ok(node.properties["ev-foo"]);

    var hook = node.properties["ev-foo"];
    var elem = {};
    hook.hook(elem, "ev-foo");
    assert.equal((0, _evStore2.default)(elem).foo, "bar");

    assert.end();
});

(0, _tape2.default)("input.value soft hook", function (assert) {
    var node = (0, _index.h)("input", { value: "text" });

    assert.equal(_typeof(node.properties.value), "object");
    var elem = {};
    node.properties.value.hook(elem, "value");

    assert.equal(elem.value, "text");

    assert.end();
});

(0, _tape2.default)("h with child", function (assert) {
    var node = (0, _index.h)("div", (0, _index.h)("span"));

    assert.equal(node.children[0].tagName, "SPAN");

    assert.end();
});

(0, _tape2.default)("h with children", function (assert) {
    var node = (0, _index.h)("div", [(0, _index.h)("span")]);

    assert.equal(node.children[0].tagName, "SPAN");

    assert.end();
});

(0, _tape2.default)("h with null", function (assert) {
    var node = (0, _index.h)("div", null);
    var node2 = (0, _index.h)("div", [null]);

    assert.equal(node.children.length, 0);
    assert.equal(node2.children.length, 0);

    assert.end();
});

(0, _tape2.default)("h with undefined", function (assert) {
    var node = (0, _index.h)("div", undefined);
    var node2 = (0, _index.h)("div", [undefined]);

    assert.equal(node.children.length, 0);
    assert.equal(node2.children.length, 0);

    assert.end();
});

(0, _tape2.default)("h with foreign object", function (assert) {
    var errorSingleChild;

    try {
        (0, _index.h)("div", null, { foreign: "object" });
    } catch (e) {
        errorSingleChild = e;
    }

    var errorChildren;

    try {
        (0, _index.h)("div", [{ foreign: "object" }]);
    } catch (e) {
        errorChildren = e;
    }

    assert.ok(errorSingleChild);
    assert.ok(/Unexpected virtual child/.test(errorSingleChild.message));

    assert.ok(errorChildren);
    assert.ok(/Unexpected virtual child/.test(errorChildren.message));

    assert.end();
});

(0, _tape2.default)("h with class", function (assert) {
    var node = (0, _index.h)(".foo");

    assert.equal(node.properties.className, "foo");

    assert.end();
});

(0, _tape2.default)("h with id", function (assert) {
    var node = (0, _index.h)("#foo");

    assert.equal(node.properties.id, "foo");

    assert.end();
});

(0, _tape2.default)("h with empty string", function (assert) {
    var node = (0, _index.h)("");

    assert.equal(node.tagName, "DIV");

    assert.end();
});

(0, _tape2.default)("h with two classes", function (assert) {
    var node = (0, _index.h)(".foo", { className: "bar" });

    assert.equal(node.properties.className, "foo bar");

    assert.end();
});

(0, _tape2.default)("h with two ids", function (assert) {
    var node = (0, _index.h)("#foo", { id: "bar" });

    assert.equal(node.properties.id, "bar");

    assert.end();
});
