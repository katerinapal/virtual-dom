"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patch = undefined;

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _xIsArray = require("x-is-array");

var _xIsArray2 = _interopRequireDefault(_xIsArray);

var _createElement = require("./create-element");

var _domIndex = require("./dom-index");

var _patchOp = require("./patch-op");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch || patchRecursive;
    renderOptions.render = renderOptions.render || _createElement.createElement;

    return renderOptions.patch(rootNode, patches, renderOptions);
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);

    if (indices.length === 0) {
        return rootNode;
    }

    var index = (0, _domIndex.domIndex)(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;

    if (!renderOptions.document && ownerDocument !== _document2.default) {
        renderOptions.document = ownerDocument;
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i];
        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
    }

    return rootNode;
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode;
    }

    var newNode;

    if ((0, _xIsArray2.default)(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = (0, _patchOp.applyPatch)(patchList[i], domNode, renderOptions);

            if (domNode === rootNode) {
                rootNode = newNode;
            }
        }
    } else {
        newNode = (0, _patchOp.applyPatch)(patchList, domNode, renderOptions);

        if (domNode === rootNode) {
            rootNode = newNode;
        }
    }

    return rootNode;
}

function patchIndices(patches) {
    var indices = [];

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key));
        }
    }

    return indices;
}
var exported_patch = patch;
exports.patch = exported_patch;
