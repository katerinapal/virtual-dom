"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _svg = require("../svg");

var _attributeHook = require("../hooks/attribute-hook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("svg returns a vnode", function (assert) {
    assert.equal((0, _svg.svg)("circle").tagName, "circle");
    assert.equal((0, _svg.svg)("circle").namespace, "http://www.w3.org/2000/svg");

    assert.end();
});

(0, _tape2.default)("svg with text", function (assert) {
    var node = (0, _svg.svg)("circle", "dat text");

    assert.equal(node.children[0].text, "dat text");

    assert.end();
});

(0, _tape2.default)("svg with properties", function (assert) {
    var node = (0, _svg.svg)("circle", { width: "40px" });

    assert.strictEqual(node.properties.attributes.width, "40px");

    assert.end();
});

(0, _tape2.default)("svg properties are set", function (assert) {
    var node = (0, _svg.svg)("circle.test", {
        style: {
            border: "1px solid #000"
        },
        width: "40px"
    });

    assert.strictEqual(node.properties.attributes.width, "40px");
    assert.strictEqual(node.properties.width, undefined);
    assert.strictEqual(node.properties.style.border, safeStyle("boder", "1px solid #000"));

    assert.end();
});

(0, _tape2.default)("namespaced attributes are set with correct namespace", function (assert) {
    var node = (0, _svg.svg)("image", {
        "xlink:href": "http://example.com/image.png",
        "xml:space": "preserve"
    });

    assert.strictEqual(node.properties.attributes["xlink:href"], undefined);
    assert.strictEqual(node.hooks["xlink:href"].constructor, _attributeHook.AttributeHook);
    assert.strictEqual(node.hooks["xlink:href"].value, "http://example.com/image.png");
    assert.strictEqual(node.hooks["xlink:href"].namespace, "http://www.w3.org/1999/xlink");

    assert.strictEqual(node.properties.attributes["xml:space"], undefined);
    assert.strictEqual(node.hooks["xml:space"].constructor, _attributeHook.AttributeHook);
    assert.strictEqual(node.hooks["xml:space"].value, "preserve");
    assert.strictEqual(node.hooks["xml:space"].namespace, "http://www.w3.org/XML/1998/namespace");

    assert.end();
});

function safeStyle(property, value) {
    var div = _document2.default.createElement("div");
    div.style[property] = value;
    return div.style[property];
}
