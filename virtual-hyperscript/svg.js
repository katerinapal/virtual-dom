var svg_svg = svg;
import ext_xisarray_isArray from "x-is-array";
import { h as index_hjs } from "./index.js";
import { SVGAttributeNamespace as svgattributenamespace_SVGAttributeNamespacejs } from "./svg-attribute-namespace";
import { AttributeHook as hooksattributehook_AttributeHookjs } from "./hooks/attribute-hook";
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

        var namespace = svgattributenamespace_SVGAttributeNamespacejs(key);

        if (namespace === undefined) { // not a svg attribute
            continue;
        }

        var value = properties[key];

        if (typeof value !== 'string' &&
            typeof value !== 'number' &&
            typeof value !== 'boolean'
        ) {
            continue;
        }

        if (namespace !== null) { // namespaced attribute
            properties[key] = hooksattributehook_AttributeHookjs(namespace, value);
            continue;
        }

        attributes[key] = value
        properties[key] = undefined
    }

    return index_hjs(tagName, properties, children);
}

function isChildren(x) {
    return typeof x === 'string' || ext_xisarray_isArray(x);
}
export { svg_svg as svg };
