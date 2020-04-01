"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _vnode = require("../../vnode/vnode");

var _vtext = require("../../vnode/vtext");

var _diff = require("../../vtree/diff");

var _createElement = require("../create-element");

var _patch = require("../patch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("indexing over thunk root", function (assert) {
    var leftThunk = {
        type: "Thunk",
        render: function render() {
            return new _vnode.VirtualNode("div", {
                className: "test"
            }, [new _vtext.VirtualText("Left")]);
        }
    };

    var rightThunk = {
        type: "Thunk",
        render: function render() {
            return new _vnode.VirtualNode("div", {
                className: "test"
            }, [new _vtext.VirtualText("Right")]);
        }
    };

    var root = (0, _createElement.createElement)(leftThunk);
    var patches = (0, _diff.diff)(leftThunk, rightThunk);
    var newRoot = (0, _patch.patch)(root, patches);

    assert.equal(newRoot.childNodes[0].data, "Right");
    assert.end();
});

(0, _tape2.default)("indexing over thunk child", function (assert) {
    var leftNode = new _vnode.VirtualNode("div", {
        className: "parent-node"
    }, [new _vnode.VirtualNode("div"), new _vtext.VirtualText("test"), {
        type: "Thunk",
        render: function render() {
            return new _vnode.VirtualNode("div", {
                className: "test"
            }, [new _vtext.VirtualText("Left")]);
        }
    }, new _vnode.VirtualNode("div"), new _vtext.VirtualText("test")]);

    var rightNode = new _vnode.VirtualNode("div", {
        className: "parent-node"
    }, [new _vnode.VirtualNode("div"), new _vtext.VirtualText("test"), {
        type: "Thunk",
        render: function render() {
            return new _vnode.VirtualNode("div", {
                className: "test"
            }, [new _vtext.VirtualText("Right")]);
        }
    }, new _vnode.VirtualNode("div"), new _vtext.VirtualText("test")]);

    var root = (0, _createElement.createElement)(leftNode);
    var patches = (0, _diff.diff)(leftNode, rightNode);
    (0, _patch.patch)(root, patches);
    assert.equal(root.childNodes[2].childNodes[0].data, "Right");
    assert.end();
});
