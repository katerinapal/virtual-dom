"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _vnode = require("../../vnode/vnode");

var _patch = require("../patch");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

(0, _tape2.default)("overrided patch function is correctly used and received correct options", function (assert) {

    function patchCustom(rootNode, patches, renderOptions) {
        return {
            rootNode: rootNode,
            patches: patches,
            renderOptions: renderOptions
        };
    }
    function createElementCustom(vnode) {}

    var rootNode = new _vnode.VirtualNode("div");
    var patches = {};
    var renderOptions = { patch: patchCustom, render: createElementCustom };

    var result = (0, _patch.patch)(rootNode, patches, renderOptions);
    assert.equal(result.rootNode, rootNode);
    assert.equal(result.patches, patches);
    assert.equal(result.renderOptions, renderOptions);
    assert.end();
});