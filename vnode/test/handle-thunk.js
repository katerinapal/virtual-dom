"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _handleThunk = require("../handle-thunk");

var _vnode = require("../vnode");

var _vtext = require("../vtext");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

(0, _tape2.default)("render a new thunk to vnode", function (assert) {
    var aNode = {
        render: function render(previous) {
            assert.error("Render should not be called for cached thunk");
        },
        type: "Thunk"
    };

    aNode.vnode = new _vnode.VirtualNode("div");

    var renderedBNode = new _vnode.VirtualNode("div");

    var bNode = {
        render: function render(previous) {
            assert.equal(previous, aNode);
            return renderedBNode;
        },
        type: "Thunk"
    };

    var result = (0, _handleThunk.handleThunk)(aNode, bNode);

    assert.equal(result.a, aNode.vnode);
    assert.equal(result.b, renderedBNode);
    assert.equal(bNode.vnode, renderedBNode);
    assert.end();
});

(0, _tape2.default)("render a new thunk to vtext", function (assert) {
    var aNode = {
        render: function render(previous) {
            assert.error("Render should not be called for cached thunk");
        },
        type: "Thunk"
    };

    aNode.vnode = new _vnode.VirtualNode("div");

    var renderedBNode = new _vtext.VirtualText("text");

    var bNode = {
        render: function render(previous) {
            assert.equal(previous, aNode);
            return renderedBNode;
        },
        type: "Thunk"
    };

    var result = (0, _handleThunk.handleThunk)(aNode, bNode);

    assert.equal(result.a, aNode.vnode);
    assert.equal(result.b, renderedBNode);
    assert.equal(bNode.vnode, renderedBNode);
    assert.end();
});

(0, _tape2.default)("render a new thunk to a widget", function (assert) {
    var aNode = {
        render: function render(previous) {
            assert.error("Render should not be called for cached thunk");
        },
        type: "Thunk"
    };

    aNode.vnode = new _vnode.VirtualNode("div");

    var renderedBNode = { type: "Widget" };

    var bNode = {
        render: function render(previous) {
            assert.equal(previous, aNode);
            return renderedBNode;
        },
        type: "Thunk"
    };

    var result = (0, _handleThunk.handleThunk)(aNode, bNode);

    assert.equal(result.a, aNode.vnode);
    assert.equal(result.b, renderedBNode);
    assert.equal(bNode.vnode, renderedBNode);
    assert.end();
});

(0, _tape2.default)("render current thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function render(previous) {
            assert.error("Render should not be called for cached thunk");
        },
        type: "Thunk"
    };

    aNode.vnode = new _vnode.VirtualNode("div");

    var bNode = {
        render: function render(previous) {
            assert.equal(previous, aNode);
            return { type: "Thunk" };
        },
        type: "Thunk"
    };

    var result;

    try {
        (0, _handleThunk.handleThunk)(aNode, bNode);
    } catch (e) {
        result = e;
    }

    assert.equal(result.message, "thunk did not return a valid node");
    assert.end();
});

(0, _tape2.default)("render previous thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function render(previous) {
            assert.equal(previous, null);
            return { type: "Thunk" };
        },
        type: "Thunk"
    };

    var renderedBNode = new _vnode.VirtualNode("div");

    var bNode = {
        render: function render(previous) {
            assert.equal(previous, aNode);
            return renderedBNode;
        },
        type: "Thunk"
    };

    var result;

    try {
        (0, _handleThunk.handleThunk)(aNode, bNode);
    } catch (e) {
        result = e;
    }

    assert.equal(result.message, "thunk did not return a valid node");
    assert.end();
});

(0, _tape2.default)("normal nodes are returned", function (assert) {
    var aNode = new _vnode.VirtualNode('div');
    var bNode = new _vnode.VirtualNode('div');

    var result = (0, _handleThunk.handleThunk)(aNode, bNode);

    assert.equal(result.a, aNode);
    assert.equal(result.b, bNode);
    assert.end();
});