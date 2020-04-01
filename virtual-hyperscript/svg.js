"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.svg = undefined;

var _xIsArray = require("x-is-array");

var _xIsArray2 = _interopRequireDefault(_xIsArray);

var _index = require("./index.js");

var _svgAttributeNamespace = require("./svg-attribute-namespace");

var _attributeHook = require("./hooks/attribute-hook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

'use strict';

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function svg(tagName, properties, children) {
    if (!children && isChildren(properties)) {
        children = properties;
        properties = {};
    }

    properties = properties || {};

    // set namespace for svg
    properties.namespace = SVG_NAMESPACE;

    var attributes = properties.attributes || (properties.attributes = {});

    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue;
        }

        var namespace = (0, _svgAttributeNamespace.SVGAttributeNamespace)(key);

        if (namespace === undefined) {
            // not a svg attribute
            continue;
        }

        var value = properties[key];

        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
            continue;
        }

        if (namespace !== null) {
            // namespaced attribute
            properties[key] = (0, _attributeHook.AttributeHook)(namespace, value);
            continue;
        }

        attributes[key] = value;
        properties[key] = undefined;
    }

    return (0, _index.h)(tagName, properties, children);
}

function isChildren(x) {
    return typeof x === 'string' || (0, _xIsArray2.default)(x);
}
var exported_svg = svg;
exports.svg = exported_svg;
