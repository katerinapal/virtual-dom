"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _createElement = require("../create-element.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("attributes can be set", function (assert) {
    var leftTree = (0, _h.h)("div");

    var rightTree = (0, _h.h)("div", {
        attributes: {
            src: "test.jpg"
        }
    });

    var rootNode = (0, _createElement.createElement)(leftTree);
    var patches = (0, _diff.diff)(leftTree, rightTree);

    var newRootNode = (0, _patch.patch)(rootNode, patches);

    assert.equal(newRootNode.getAttribute("src"), "test.jpg");
    assert.end();
});

(0, _tape2.default)("individual attributes can be unset", function (assert) {
    var leftTree = (0, _h.h)("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    });

    var rightTree = (0, _h.h)("div", {
        attributes: {
            a: "1",
            c: "3"
        }
    });

    var rootNode = (0, _createElement.createElement)(leftTree);
    var patches = (0, _diff.diff)(leftTree, rightTree);

    var newRootNode = (0, _patch.patch)(rootNode, patches);

    assert.equal(newRootNode, rootNode);
    assert.equal(newRootNode.getAttribute("a"), "1");
    assert.ok(newRootNode.getAttribute("b") == null);
    assert.equal(newRootNode.getAttribute("c"), "3");
    assert.end();
});

(0, _tape2.default)("attributes can be completely unset", function (assert) {
    var leftTree = (0, _h.h)("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    });

    var rightTree = (0, _h.h)("div");

    var rootNode = (0, _createElement.createElement)(leftTree);
    var patches = (0, _diff.diff)(leftTree, rightTree);

    var newRootNode = (0, _patch.patch)(rootNode, patches);

    assert.equal(newRootNode, rootNode);
    assert.ok(newRootNode.getAttribute("a") == null);
    assert.ok(newRootNode.getAttribute("b") == null);
    assert.ok(newRootNode.getAttribute("c") == null);
    assert.end();
});
