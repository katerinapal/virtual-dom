"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = undefined;

var _xIsArray = require("x-is-array");

var _xIsArray2 = _interopRequireDefault(_xIsArray);

var _vnode = require("../vnode/vnode.js");

var _vtext = require("../vnode/vtext.js");

var _isVnode = require("../vnode/is-vnode");

var _isVtext = require("../vnode/is-vtext");

var _isWidget = require("../vnode/is-widget");

var _isVhook = require("../vnode/is-vhook");

var _isThunk = require("../vnode/is-thunk");

var _parseTag = require("./parse-tag.js");

var _softSetHook = require("./hooks/soft-set-hook.js");

var _evHook = require("./hooks/ev-hook.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = (0, _parseTag.parseTag)(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' && !namespace && props.hasOwnProperty('value') && props.value !== undefined && !(0, _isVhook.isHook)(props.value)) {
        props.value = (0, _softSetHook.SoftSetHook)(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }

    return new _vnode.VirtualNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new _vtext.VirtualText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new _vtext.VirtualText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if ((0, _xIsArray2.default)(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if ((0, _isVhook.isHook)(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = (0, _evHook.EvHook)(value);
            }
        }
    }
}

function isChild(x) {
    return (0, _isVnode.isVirtualNode)(x) || (0, _isVtext.isVirtualText)(x) || (0, _isWidget.isWidget)(x) || (0, _isThunk.isThunk)(x);
}

function isChildren(x) {
    return typeof x === 'string' || (0, _xIsArray2.default)(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' + 'Expected a VNode / Vthunk / VWidget / string but:\n' + 'got:\n' + errorString(data.foreignObject) + '.\n' + 'The parent vnode is:\n' + errorString(data.parentVnode);
    '\n' + 'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}
var exported_h = h;
exports.h = exported_h;
