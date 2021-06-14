"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = undefined;

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _applyProperties = require("./apply-properties");

var _isVnode = require("../vnode/is-vnode.js");

var _isVtext = require("../vnode/is-vtext.js");

var _isWidget = require("../vnode/is-widget.js");

var _handleThunk = require("../vnode/handle-thunk.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mod_createElement = createElement;


function createElement(vnode, opts) {
    var doc = opts ? opts.document || _document2.default : _document2.default;
    var warn = opts ? opts.warn : null;

    vnode = (0, _handleThunk.handleThunk)(vnode).a;

    if ((0, _isWidget.isWidget)(vnode)) {
        return vnode.init();
    } else if ((0, _isVtext.isVirtualText)(vnode)) {
        return doc.createTextNode(vnode.text);
    } else if (!(0, _isVnode.isVirtualNode)(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode);
        }
        return null;
    }

    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);

    var props = vnode.properties;
    (0, _applyProperties.applyProperties)(node, props);

    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts);
        if (childNode) {
            node.appendChild(childNode);
        }
    }

    return node;
}
exports.createElement = mod_createElement;