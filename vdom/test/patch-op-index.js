"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _vnode = require("../../vnode/vnode");

var _vtext = require("../../vnode/vtext");

var _diff = require("../../vtree/diff");

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _createElement = require("../create-element");

var _patch = require("../patch");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var createElementCustom = function createElementCustom(vnode) {
    var created = (0, _createElement.createElement)(vnode);
    created.customCreation = true;
    return created;
};

function assertPachedNodeIsMarked(leftNode, rightNode, assert) {
    var root = createElementCustom(leftNode);
    var patches = (0, _diff.diff)(leftNode, rightNode);
    var newRoot = (0, _patch.patch)(root, patches, { render: createElementCustom });
    assert.equal(newRoot.childNodes[0].customCreation, true);
    assert.end();
}

(0, _tape2.default)("overrided createElement is used on node insertion", function (assert) {
    var leftNode = new _vnode.VirtualNode("div");
    var rightNode = new _vnode.VirtualNode("div", {}, [new _vnode.VirtualNode("div")]);

    assertPachedNodeIsMarked(leftNode, rightNode, assert);
});

(0, _tape2.default)("overrided createElement is used for patching vnodes", function (assert) {
    var leftNode = new _vnode.VirtualNode("div", {}, [new _vnode.VirtualNode("div")]);
    var rightNode = new _vnode.VirtualNode("div", {}, [new _vnode.VirtualNode("span")]);

    assertPachedNodeIsMarked(leftNode, rightNode, assert);
});

(0, _tape2.default)("overrided createElement is used for patching text nodes", function (assert) {
    var leftNode = new _vnode.VirtualNode("div", {}, [new _vnode.VirtualNode("div")]);
    var rightNode = new _vnode.VirtualNode("div", {}, [new _vtext.VirtualText("hello")]);

    assertPachedNodeIsMarked(leftNode, rightNode, assert);
});

(0, _tape2.default)("overrided createElement is used for patching widget nodes", function (assert) {
    var Widget = function Widget() {};
    Widget.prototype.type = "Widget";
    Widget.prototype.init = function () {
        return _document2.default.createElement("div");
    };
    Widget.prototype.update = function (previous, domNode) {
        return null;
    };
    Widget.prototype.destroy = function (domNode) {};

    var leftNode = new _vnode.VirtualNode("div", {}, [new _vnode.VirtualNode("div")]);
    var rightNode = new _vnode.VirtualNode("div", {}, [new Widget()]);

    assertPachedNodeIsMarked(leftNode, rightNode, assert);
});